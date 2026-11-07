import { tool } from 'ai'
import { z } from 'zod'
import { decideExecution } from '../sandbox/policy'
import { runCommand } from '../sandbox/runner'
import type { Clickable } from '../tabs'
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
  listClickables: (tabId: number) => Promise<Clickable[]>
  clickAt: (tabId: number, x: number, y: number) => Promise<unknown>
  clickByText: (tabId: number, text: string) => Promise<unknown>
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

    list_clickable: tool({
      description:
        'List the clickable elements on a page with their labels and viewport coordinates. Prefer this over list_page_links when the next step is to click something the way a person would.',
      inputSchema: z.object({
        tabId: z.number().int().describe('Tab id from list_tabs')
      }),
      execute: async ({ tabId }) => opts.listClickables(tabId)
    }),

    click_page: tool({
      description:
        'Move the visible pointer to a point in the page and click it. Use the coordinates from list_clickable. Prefer click_link when the target has a text label.',
      inputSchema: z.object({
        tabId: z.number().int().describe('Tab id from list_tabs'),
        x: z.number().int().describe('X coordinate from list_clickable'),
        y: z.number().int().describe('Y coordinate from list_clickable')
      }),
      execute: async ({ tabId, x, y }) => {
        await opts.clickAt(tabId, x, y)
        return { clicked: true, x, y }
      }
    }),

    click_link: tool({
      description:
        'Click the element whose visible label matches the given text, by moving the pointer onto it and clicking. This is the preferred navigation method: it never requires inventing a URL.',
      inputSchema: z.object({
        tabId: z.number().int().describe('Tab id from list_tabs'),
        text: z.string().min(1).describe('Visible label of the link or button to click')
      }),
      execute: async ({ tabId, text }) => {
        const result = await opts.clickByText(tabId, text)
        return result
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
