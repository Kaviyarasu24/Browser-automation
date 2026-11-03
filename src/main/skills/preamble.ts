import type { Skill } from './types'

/**
 * Renders loaded skills into a system-prompt preamble. Only the name and
 * description are inlined; the body is fetched on demand so a large skill
 * library does not consume the context window.
 */
export function skillPreamble(skills: Skill[]): string {
  if (skills.length === 0) return ''
  const lines = skills.map((s) => `- ${s.name}: ${s.description}`)
  return [
    'You have the following skills available. When one applies, say which you are using.',
    ...lines
  ].join('\n')
}
