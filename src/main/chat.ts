import { stepCountIs, streamText, type ModelMessage } from 'ai'
import { languageModelFor } from './llm/openrouter'
import { pickModel } from './llm/registry'
import { getConfig } from './config'
import { UntrustedBoundary } from './security/untrusted'
import { createTools } from './security/tools'
import type { ChatPart } from '../shared/ipc'

export type ChatRequest = {
  modelId?: string | null
  messages: ModelMessage[]
}

export type ChatSink = {
  part: (part: ChatPart) => void
  done: () => void
  error: (message: string) => void
}

export type ChatHandle = { cancel: () => void }

/**
 * Runs one streaming turn against the configured model.
 *
 * Everything below the `streamText` call is provider-agnostic: swapping
 * OpenRouter for another provider means changing `languageModelFor` only.
 */
export function runChat(
  req: ChatRequest,
  skillPreamble: string,
  tools: ReturnType<typeof createTools>,
  sink: ChatSink
): ChatHandle {
  const controller = new AbortController()
  const entry = pickModel(req.modelId ?? getConfig().openRouterModel)
  const boundary = new UntrustedBoundary()

  void (async () => {
    try {
      const result = streamText({
        model: languageModelFor(entry.id),
        system: [
          boundary.systemPreamble(),
          'You are an agentic browser assistant. Complete only the user’s current request. ' +
            'For a web search or page-summary request, use this workflow exactly once: call list_tabs once. ' +
              'If it returns no tabs, call create_tab first and use the returned id. Then call navigate_tab ' +
              'on the active tab with a complete URL-encoded URL when navigation is needed, ' +
              'For a requested link, department, result, or detail page, call list_page_links first and ' +
              'navigate only to the exact URL returned by that tool. Never invent or modify a URL path. ' +
              'If no matching link is returned, search Google for the requested page instead. ' +
              'then call read_page once and answer the user immediately. For a page-opening request, ' +
              'you may use list_page_links and navigate_tab before the final read_page. Do not call list_tabs repeatedly. ' +
            'After a successful read_page, do not navigate to another page, investigate links, or start a new task. ' +
            'If a page is blocked, unavailable, redirected, or does not match the requested subject, report that ' +
            'fact and stop; never guess a replacement URL. Only perform a follow-up navigation when the user ' +
            'explicitly asks for that specific page or action. For a request to open a URL, call navigate_tab ' +
            'directly when the active tab is known, then report that it was opened.',
          skillPreamble
        ]
          .filter(Boolean)
          .join('\n\n'),
        messages: req.messages,
        tools,
        abortSignal: controller.signal,
        maxOutputTokens: entry.maxOutputTokens,
        stopWhen: stepCountIs(8)
      })

      for await (const part of result.fullStream) {
        switch (part.type) {
          case 'text-delta':
            sink.part({ type: 'text', text: part.text })
            break
          case 'reasoning-delta':
            sink.part({ type: 'reasoning', text: part.text })
            break
          case 'tool-call':
            sink.part({ type: 'tool-call', toolName: part.toolName, input: part.input })
            break
          case 'tool-result':
            sink.part({ type: 'tool-result', toolName: part.toolName, output: part.output })
            break
          case 'error':
            sink.part({ type: 'error', message: String(part.error) })
            break
          default:
            break
        }
      }
      sink.done()
    } catch (error) {
      if (controller.signal.aborted) {
        sink.done()
        return
      }
      sink.error((error as Error).message)
    }
  })()

  return { cancel: () => controller.abort() }
}
