import { z } from 'zod'

export const SkillSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  version: z.string().default('1.0.0'),
  category: z.string().optional(),
  author: z.string().optional(),
  /** Tool names this skill is scoped to. Advisory: enforced by the chat loop's tool filter. */
  'allowed-tools': z.array(z.string()).default([]),
  body: z.string()
})

export type Skill = z.infer<typeof SkillSchema>

export type SkillSummary = Pick<Skill, 'name' | 'description' | 'category'>
