import registryJson from '../../shared/models.json'
import {
  defaultModel,
  parseModelRegistry,
  resolveModel,
  type ModelEntry,
  type ModelRegistry
} from '../../shared/models'

let registry: ModelRegistry | null = null

function getRegistry(): ModelRegistry {
  if (!registry) registry = parseModelRegistry(registryJson)
  return registry
}

export function listModels(): ModelEntry[] {
  return getRegistry().models
}

export function pickModel(id: string | null | undefined): ModelEntry {
  return resolveModel(getRegistry(), id)
}

export function pickDefaultModel(): ModelEntry {
  return defaultModel(getRegistry())
}
