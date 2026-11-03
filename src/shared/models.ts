import { z } from 'zod'

/**
 * Model registry entry.
 *
 * `id` is the string handed to the provider verbatim. With OpenRouter that means
 * the "author/model" slug (e.g. "openai/gpt-4o-mini"), so the ids are portable
 * across providers as long as the slug resolves.
 */
export const ModelEntrySchema = z.object({
  id: z.string().min(1),
  displayName: z.string().min(1),
  provider: z.string().min(1),
  contextWindow: z.number().int().positive().optional(),
  maxOutputTokens: z.number().int().positive().optional(),
  supportsTools: z.boolean().default(true),
  supportsVision: z.boolean().default(false),
  reasoning: z.boolean().default(false),
  isDefault: z.boolean().default(false)
})

export type ModelEntry = z.infer<typeof ModelEntrySchema>

export const ModelRegistrySchema = z.object({
  models: z.array(ModelEntrySchema).min(1)
})

export type ModelRegistry = z.infer<typeof ModelRegistrySchema>

export function parseModelRegistry(input: unknown): ModelRegistry {
  return ModelRegistrySchema.parse(input)
}

export function defaultModel(registry: ModelRegistry): ModelEntry {
  const flagged = registry.models.find((m) => m.isDefault)
  const first = registry.models[0]
  if (!flagged && !first) throw new Error('Model registry is empty')
  return flagged ?? (first as ModelEntry)
}

export function resolveModel(registry: ModelRegistry, id: string | null | undefined): ModelEntry {
  if (!id) return defaultModel(registry)
  const found = registry.models.find((m) => m.id === id)
  if (!found) throw new Error(`Unknown model id: ${id}`)
  return found
}
