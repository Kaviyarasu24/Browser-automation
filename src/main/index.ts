import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import type { ModelMessage } from 'ai'
import { IPC } from '../shared/ipc'
import { getConfig } from './config'
import { listModels } from './llm/registry'
import { loadSkills, summarize } from './skills/loader'
import { skillPreamble } from './skills/preamble'
import { runChat } from './chat'
import { createTools } from './security/tools'
import { UntrustedBoundary } from './security/untrusted'
import { decideExecution } from './sandbox/policy'
import { TabManager } from './tabs'

/**
 * Skills live outside the bundle in dev and in `extraResources` once packaged.
 * `app.getAppPath()` alone is unreliable (it resolves to the entry script's
 * directory, not the project root), so probe the known locations in order.
 */
function resolveSkillsDir(): string {
  const candidates = [
    join(process.resourcesPath ?? '', 'skills'),
    join(app.getAppPath(), 'skills'),
    resolve(process.cwd(), 'skills')
  ]
  const found = candidates.find((dir) => dir && existsSync(dir))
  if (!found) {
    console.warn('[skills] no skills directory found; probed:', candidates.join(', '))
    return candidates[candidates.length - 1] as string
  }
  return found
}

let mainWindow: BrowserWindow | null = null
let tabs: TabManager | null = null
let activeChat: { cancel: () => void } | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    backgroundColor: '#111111',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  mainWindow.on('ready-to-show', () => mainWindow?.show())

  mainWindow.webContents.on('preload-error', (_e, path, error) => {
    console.error('[renderer] preload error:', path, error)
  })
  mainWindow.webContents.on('did-fail-load', (_e, code, desc, url) => {
    console.error('[renderer] did-fail-load:', code, desc, url)
  })
  mainWindow.webContents.on('render-process-gone', (_e, details) => {
    console.error('[renderer] process gone:', details.reason, details.exitCode)
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    void shell.openExternal(url)
    return { action: 'deny' }
  })

  tabs = new TabManager(mainWindow)

  if (process.env.ELECTRON_RENDERER_URL) {
    void mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    void mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function registerIpc(): void {
  // ---- chat ----------------------------------------------------------------
  ipcMain.handle(IPC.chatSend, (event, payload: { modelId?: string; messages: ModelMessage[] }) => {
    activeChat?.cancel()
    const skills = loadSkills(resolveSkillsDir())
    const boundary = new UntrustedBoundary()
    const manager = tabs
    let boundaryForChat = boundary
    if (!manager) throw new Error('Tab manager not ready')

    const tools = createTools({
      boundary,
      createTab: async (url) => {
        const tab = manager.create(url)
        return { id: tab.id, url: tab.url, title: tab.title }
      },
      readPageText: (tabId) => manager.readText(tabId),
      listPageLinks: (tabId) => manager.listLinks(tabId),
      listTabs: async () => manager.list(),
      navigateTab: async (tabId, url) => manager.navigate(tabId, url)
    })

    activeChat = runChat(payload, skillPreamble(skills), tools, {
      part: (part) => event.sender.send(IPC.chatPart, part),
      done: () => event.sender.send(IPC.chatDone),
      error: (message) => event.sender.send(IPC.chatError, message)
    }, boundary)
    return { accepted: true }
  })

  ipcMain.handle(IPC.chatCancel, () => {
    activeChat?.cancel()
    activeChat = null
    return { cancelled: true }
  })

  // ---- models, skills, policy ---------------------------------------------
  ipcMain.handle(IPC.modelsList, () => listModels())
  ipcMain.handle(IPC.skillsList, () => summarize(loadSkills(resolveSkillsDir())))
  ipcMain.handle(IPC.execPolicy, () => decideExecution())

  // ---- tabs ----------------------------------------------------------------
  ipcMain.handle(IPC.tabsCreate, (_event, url?: string) => requireTabs().create(url))
  ipcMain.handle(IPC.tabsNavigate, (_event, payload: { id: number; url: string }) => {
    requireTabs().navigate(payload.id, payload.url)
    return requireTabs().state()
  })
  ipcMain.handle(IPC.tabsClose, (_event, id: number) => {
    requireTabs().close(id)
    return requireTabs().state()
  })
  ipcMain.handle(IPC.tabsActivate, (_event, id: number) => {
    requireTabs().activate(id)
    return requireTabs().state()
  })
  ipcMain.handle(IPC.tabsState, () => requireTabs().state())
}

function requireTabs(): TabManager {
  if (!tabs) throw new Error('Tab manager not ready')
  return tabs
}

void app.whenReady().then(() => {
  getConfig()
  registerIpc()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
