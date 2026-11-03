import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import type { ExecPolicy } from '../shared/ipc'

/**
 * Minimal .env reader. No dependency, and unlike Vite's env handling it makes
 * real `process.env` values available to the main process at runtime.
 */
function loadDotEnv(file: string): void {
  if (!existsSync(file)) return
  const text = readFileSync(file, 'utf8')
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq === -1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}

export type AppConfig = {
  apiBaseUrl: string
  openRouterApiKey: string
  openRouterBaseUrl: string
  openRouterModel: string
  appTitle: string
  appReferer: string
  execPolicy: ExecPolicy
}

let cached: AppConfig | null = null

export function getConfig(): AppConfig {
  if (cached) return cached
  loadDotEnv(resolve(process.cwd(), '.env'))

  const execPolicyRaw = process.env.EXEC_POLICY ?? 'deny'
  if (!['sandbox', 'deny', 'direct-host'].includes(execPolicyRaw)) {
    throw new Error(`EXEC_POLICY must be sandbox | deny | direct-host, got "${execPolicyRaw}"`)
  }

  cached = {
    apiBaseUrl: process.env.APP_API_BASE_URL ?? 'http://localhost:8787',
    openRouterApiKey: process.env.OPENROUTER_API_KEY ?? '',
    openRouterBaseUrl: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
    openRouterModel:
      process.env.OPENROUTER_MODEL ?? 'nvidia/nemotron-3-ultra-550b-a55b:free',
    appTitle: process.env.APP_TITLE ?? 'StrawberryLike',
    appReferer: process.env.APP_REFERER ?? 'http://localhost',
    execPolicy: execPolicyRaw as ExecPolicy
  }
  return cached
}
