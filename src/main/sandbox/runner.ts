import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type { ExecPolicy } from '../../shared/ipc'
import type { ExecDecision } from './policy'

const execFileAsync = promisify(execFile)
const MAX_OUTPUT_BYTES = 256 * 1024
const COMMAND_TIMEOUT_MS = 30_000

export type CommandResult = {
  refused: false
  stdout: string
  stderr: string
  exitCode: number
  timedOut: boolean
  backend: ExecPolicy
}

function shellForPlatform(): { file: string; args: (command: string) => string[] } {
  if (process.platform === 'win32') {
    return {
      file: process.env.ComSpec ?? 'cmd.exe',
      args: (command) => ['/d', '/s', '/c', command]
    }
  }
  return {
    file: process.env.SHELL ?? '/bin/sh',
    args: (command) => ['-c', command]
  }
}

export async function runCommand(
  command: string,
  cwd: string | undefined,
  decision: ExecDecision
): Promise<CommandResult | { refused: true; reason: string }> {
  if (!decision.allowed) return { refused: true, reason: decision.reason }

  const shell = shellForPlatform()
  try {
    const result = await execFileAsync(shell.file, shell.args(command), {
      cwd,
      timeout: COMMAND_TIMEOUT_MS,
      maxBuffer: MAX_OUTPUT_BYTES,
      windowsHide: true
    })
    return {
      refused: false,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: 0,
      timedOut: false,
      backend: decision.backend
    }
  } catch (error) {
    const failure = error as NodeJS.ErrnoException & {
      code?: number | string
      killed?: boolean
      stdout?: string
      stderr?: string
    }
    const exitCode = typeof failure.code === 'number' ? failure.code : 1
    return {
      refused: false,
      stdout: failure.stdout ?? '',
      stderr: failure.stderr ?? failure.message,
      exitCode,
      timedOut: failure.killed === true,
      backend: decision.backend
    }
  }
}
