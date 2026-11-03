import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
import type { LanguageModel } from 'ai'
import { getConfig } from '../config'

/**
 * The single provider seam.
 *
 * Strawberry builds its provider with Vercel's `createGateway` and points it at
 * its own API host, so model credentials never live on the client. We do the
 * inverse: `createOpenAICompatible` pointed straight at OpenRouter, with the key
 * held locally. Swapping providers means changing this function and nothing else.
 */
export function createOpenRouter() {
  const cfg = getConfig()
  if (!cfg.openRouterApiKey) {
    throw new Error(
      'OPENROUTER_API_KEY is not set. Copy .env.example to .env and add your key.'
    )
  }

  return createOpenAICompatible({
    name: 'openrouter',
    baseURL: cfg.openRouterBaseUrl,
    apiKey: cfg.openRouterApiKey,
    headers: {
      'HTTP-Referer': cfg.appReferer,
      'X-Title': cfg.appTitle
    }
  })
}

export function languageModelFor(modelId: string): LanguageModel {
  return createOpenRouter().chatModel(modelId)
}
