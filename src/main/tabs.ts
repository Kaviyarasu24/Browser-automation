import { WebContentsView, type BaseWindow } from 'electron'
import type { TabState } from '../shared/ipc'

const SIDEBAR_WIDTH = 380
const BROWSER_TOOLBAR_HEIGHT = 44

type Tab = {
  id: number
  view: WebContentsView
  url: string
  title: string
}

/**
 * Owns the browsing tabs as WebContentsViews composited above the window's own
 * web contents. The window's web contents render the chat UI on the left; tab
 * views occupy the region to its right.
 */
export class TabManager {
  private readonly tabs = new Map<number, Tab>()
  private activeId: number | null = null
  private nextId = 1

  constructor(private readonly win: BaseWindow) {
    win.on('resize', () => this.layout())
  }

  private layout(): void {
    const active = this.activeId === null ? null : this.tabs.get(this.activeId)
    if (!active) return
    const { width, height } = this.win.getContentBounds()
    active.view.setBounds({
      x: SIDEBAR_WIDTH,
      y: BROWSER_TOOLBAR_HEIGHT,
      width: Math.max(0, width - SIDEBAR_WIDTH),
      height: Math.max(0, height - BROWSER_TOOLBAR_HEIGHT)
    })
  }

  create(url = 'about:blank'): TabState {
    const id = this.nextId++
    const view = new WebContentsView({
      webPreferences: {
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
        webSecurity: true
      }
    })

    const tab: Tab = { id, view, url, title: '' }
    this.tabs.set(id, tab)

    view.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
    view.webContents.on('page-title-updated', (_e, title) => {
      tab.title = title
    })
    view.webContents.on('did-navigate', (_e, navigatedUrl) => {
      tab.url = navigatedUrl
    })
    view.webContents.on('did-navigate-in-page', (_e, navigatedUrl) => {
      tab.url = navigatedUrl
    })

    void view.webContents.loadURL(url)
    this.activate(id)
    return this.toState(tab)
  }

  activate(id: number): void {
    if (!this.tabs.has(id)) return
    if (this.activeId !== null && this.activeId !== id) {
      const previous = this.tabs.get(this.activeId)
      if (previous) this.win.contentView.removeChildView(previous.view)
    }
    this.activeId = id
    const tab = this.tabs.get(id)
    if (!tab) return
    this.win.contentView.addChildView(tab.view)
    this.layout()
  }

  async navigate(id: number, url: string): Promise<void> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    const normalized = /^[a-z]+:\/\//i.test(url) ? url : `https://${url}`
    tab.url = normalized
    await tab.view.webContents.loadURL(normalized)
  }

  close(id: number): void {
    const tab = this.tabs.get(id)
    if (!tab) return
    this.win.contentView.removeChildView(tab.view)
    tab.view.webContents.close()
    this.tabs.delete(id)
    if (this.activeId === id) {
      this.activeId = null
      const next = this.tabs.keys().next()
      if (!next.done) this.activate(next.value)
    }
  }

  async readText(id: number): Promise<string> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    const text = await tab.view.webContents.executeJavaScript(
      'document.body ? document.body.innerText : ""',
      true
    )
    return typeof text === 'string' ? text : ''
  }

  async listLinks(id: number): Promise<{ text: string; url: string }[]> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    const links = await tab.view.webContents.executeJavaScript(
      `Array.from(document.querySelectorAll('a[href]')).map((a) => ({
        text: (a.textContent || '').trim().replace(/\\s+/g, ' '),
        url: a.href
      })).filter((link) => link.text && link.url)`,
      true
    )
    if (!Array.isArray(links)) return []
    return links.filter(
      (link): link is { text: string; url: string } =>
        typeof link?.text === 'string' && typeof link?.url === 'string'
    )
  }

  list(): { id: number; url: string; title: string }[] {
    return [...this.tabs.values()].map(({ id, url, title }) => ({ id, url, title }))
  }

  state(): TabState[] {
    return [...this.tabs.values()].map((t) => this.toState(t))
  }

  private toState(tab: Tab): TabState {
    return { id: tab.id, url: tab.url, title: tab.title, active: this.activeId === tab.id }
  }
}
