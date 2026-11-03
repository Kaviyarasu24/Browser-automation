import { tool } from 'ai'
import { z } from 'zod'
import { decideExecution } from '../sandbox/policy'
import { runCommand } from '../sandbox/runner'
import type { UntrustedBoundary } from './untrusted'

/**
 * The agent's built-in tool set. Deliberately small: each tool is a capability
 * the model can exercise without further prompting, so additions should be
 * justified individually.
 */
export function createTools(opts: {
  boundary: UntrustedBoundary
  createTab: (url?: string) => Promise<{ id: number; url: string; title: string }>
  readPageText: (tabId: number) => Promise<string>
  listPageLinks: (tabId: number) => Promise<{ text: string; url: string }[]>
  listTabs: () => Promise<{ id: number; url: string; title: string }[]>
  navigateTab: (tabId: number, url: string) => Promise<void>
}) {
  return {
    create_tab: tool({
      description:
        'Create a new browser tab, optionally at a URL. Use this when list_tabs returns no tabs before navigating or reading a page.',
      inputSchema: z.object({
        url: z.string().url().optional().describe('Complete URL to open in the new tab')
      }),
      execute: async ({ url }) => opts.createTab(url)
    }),

    list_tabs: tool({
      description:
        'List the open browser tabs with their ids, titles and URLs. If the result is empty, create a tab before navigating.',
      inputSchema: z.object({}),
      execute: async () => opts.listTabs()
    }),

    navigate_tab: tool({
      description:
        'Navigate an existing browser tab to a URL. Use this to open a search URL or follow a user-requested link.',
      inputSchema: z.object({
        tabId: z.number().int().describe('Tab id from list_tabs'),
        url: z.string().url().describe('Complete URL to open in the tab')
      }),
      execute: async ({ tabId, url }) => {
        await opts.navigateTab(tabId, url)
        return { navigated: true, tabId, url }
      }
    }),

    list_page_links: tool({
      description:
        'Extract the actual visible links from a browser page. Use this before navigating to a department, result, or detail page; choose a returned URL instead of guessing a URL path.',
      inputSchema: z.object({
        tabId: z.number().int().describe('Tab id from list_tabs')
      }),
      execute: async ({ tabId }) => opts.listPageLinks(tabId)
    }),

    read_page: tool({
      description:
        'Read the visible text of a browser tab as markdown. Returns untrusted page content.',
      inputSchema: z.object({
        tabId: z.number().int().describe('Tab id from list_tabs')
      }),
      execute: async ({ tabId }) => {
        const text = await opts.readPageText(tabId)
        return opts.boundary.wrap('page_text', text)
      }
    }),

    run_command: tool({
      description:
        'Run a shell command on the user machine and return its output. Respects the configured sandbox policy.',
      inputSchema: z.object({
        command: z.string().min(1),
        cwd: z.string().optional()
      }),
      execute: async ({ command, cwd }) => runCommand(command, cwd, decideExecution())
    })
  }
}
