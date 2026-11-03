import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { parse as parseYaml } from 'yaml'
import { SkillSchema, type Skill, type SkillSummary } from './types'

/**
 * Loads skills from a directory of `<skill-name>/SKILL.md` files.
 *
 * Format is the Claude-Skills convention: a YAML frontmatter block delimited by
 * `---`, followed by a Markdown body that becomes the instructions. Strawberry
 * ships the same shape (its frontmatter carries `allowed-tools`, `category`,
 * `version`, `author`).
 */
export function loadSkillFile(filePath: string): Skill {
  const raw = readFileSync(filePath, 'utf8')
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) {
    throw new Error(`${filePath}: missing YAML frontmatter block`)
  }
  const [, frontmatter, body] = match
  const meta = parseYaml(frontmatter ?? '')
  return SkillSchema.parse({
    ...(meta as Record<string, unknown>),
    body: (body ?? '').trim()
  })
}

export function loadSkills(dir: string): Skill[] {
  const root = resolve(dir)
  if (!existsSync(root)) return []

  const skills: Skill[] = []
  for (const entry of readdirSync(root)) {
    const entryPath = join(root, entry)
    if (!statSync(entryPath).isDirectory()) continue
    const skillFile = join(entryPath, 'SKILL.md')
    if (!existsSync(skillFile)) continue
    try {
      skills.push(loadSkillFile(skillFile))
    } catch (error) {
      console.error(`[skills] failed to load ${skillFile}:`, (error as Error).message)
    }
  }
  return skills.sort((a, b) => a.name.localeCompare(b.name))
}

export function summarize(skills: Skill[]): SkillSummary[] {
  return skills.map(({ name, description, category }) => ({ name, description, category }))
}
