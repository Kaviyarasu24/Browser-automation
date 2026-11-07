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
  sink: ChatSink,
  boundary: UntrustedBoundary
): ChatHandle {
  const controller = new AbortController()
  const entry = pickModel(req.modelId ?? getConfig().openRouterModel)
  const boundaryForChat = boundary

  void (async () => {
    try {
      const result = streamText({
        model: languageModelFor(entry.id),
        system: [
          boundary.systemPreamble(),
          'You are an agentic browser assistant. Complete only the user’s current request. ' +
            'You must navigate by clicking the page, the way a person would. ' +
            'Start with list_tabs once; if it returns no tabs, call create_tab first and use the returned id. ' +
            'To move anywhere — follow a link, open a result, reach a detail page, submit a search — ' +
            'call list_clickable on the active tab, then click_link with the exact visible label of the ' +
            'target. Use click_page with coordinates from list_clickable only when a target has no label. ' +
            'A visible pointer glides onto the element before each click, so click one target at a time. ' +
            'Never invent, guess, or hand-edit a URL path; click the element that leads there instead. ' +
            'Use navigate_tab only for the very first load of a search engine when the page has no usable ' +
            'links yet, or when the user explicitly gives a URL. ' +
            'After a click, call read_page once to confirm where you landed, then answer the user immediately. ' +
            'Do not call list_tabs repeatedly, and do not chain further clicks once the request is satisfied. ' +
            'If a page is blocked, unavailable, redirected, or does not match the requested subject, report ' +
            'that fact and stop; never guess a replacement URL. Only continue when the user explicitly asks ' +
            'for that specific next step.',
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
