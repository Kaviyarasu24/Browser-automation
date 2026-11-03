import type { ExecPolicy } from '../../shared/ipc'
import { getConfig } from '../config'

export type ExecDecision = {
  allowed: boolean
  /** How the command would run, for surfacing in the UI. */
  backend: ExecPolicy
  reason: string
}

/**
 * Execution gate. This is intentionally the only place that decides whether the
 * agent may run a command, so the policy cannot be bypassed by a tool call.
 *
 * Strawberry's equivalent runs agent commands through Windows sandbox users +
 * WFP firewall rules, but falls back to `direct-host` — the user's own account,
 * unsandboxed — after *any* sandbox failure. This scaffold refuses that
 * downgrade: `direct-host` must be chosen deliberately in .env, and "sandbox"
 * fails closed rather than silently escalating when an isolation backend is
 * unavailable.
 */
export function decideExecution(): ExecDecision {
  const { execPolicy } = getConfig()

  switch (execPolicy) {
    case 'deny':
      return {
        allowed: false,
        backend: 'deny',
        reason: 'Execution is disabled (EXEC_POLICY=deny). No agent command will run.'
      }
    case 'sandbox': {
      const backend = detectSandboxBackend()
      if (!backend) {
        return {
          allowed: false,
          backend: 'sandbox',
          reason:
            'EXEC_POLICY=sandbox but no isolation backend is available. Failing closed rather than escalating to unsandboxed execution.'
        }
      }
      return { allowed: true, backend: 'sandbox', reason: `Commands run via ${backend}.` }
    }
    case 'direct-host':
      return {
        allowed: true,
        backend: 'direct-host',
        reason:
          'WARNING: agent commands run as your own user with full filesystem access. This was opted into explicitly via EXEC_POLICY=direct-host.'
      }
  }
}

/**
 * Placeholder for a real isolation backend (container, restricted user, Windows
 * AppContainer). Returning null keeps the gate closed until one is wired up.
 */
function detectSandboxBackend(): string | null {
  return null
}
