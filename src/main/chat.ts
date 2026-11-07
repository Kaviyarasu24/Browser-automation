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
          'You are an agentic browser assistant that drives a real browser the way a person does. ' +
            'Complete only the user’s current request. ' +
            'Plan every action from what is actually on the page. Inspect the DOM first, decide the ' +
            'smallest next action, take it, then look again. ' +
            '',
            'You have no URL bar and cannot type a URL. You cannot enter an address, build a query ' +
            'string, or edit a URL path. Never attempt to construct, guess, complete, or modify a URL ' +
            'such as "https://example.com/search?q=...". Reach every destination by acting on the page. ' +
            '',
            'To search for something: call list_fields to find the search box, choose the field whose ' +
            'label or placeholder shows it is the search input, then call type_into with that field ' +
            'number and the user’s query, leaving submit true so Enter is pressed. That is the search. ' +
            'If the page has no search box, call click_link on a visible link that leads to one. ' +
            '',
            'To follow a link, open a result, or move to a detail page: call list_clickable, then ' +
            'click_link with the exact visible label of the target. Use click_page with coordinates ' +
            'from list_clickable only when a target has no usable label. ' +
            '',
            'A visible pointer glides onto each target before it is clicked or typed into, so act on ' +
            'one target at a time and never repeat an action that already succeeded. ' +
            'Start with list_tabs once; if it returns no tabs, call create_tab first and use the ' +
            'returned id. After a search or click, call read_page once to confirm where you landed, ' +
            'then answer the user immediately. ' +
            'Do not call list_tabs repeatedly, and do not chain further actions once the request is ' +
            'satisfied. If a page is blocked, unavailable, redirected, or does not match the requested ' +
            'subject, report that fact and stop. Only continue when the user explicitly asks for that ' +
            'specific next step.',
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
