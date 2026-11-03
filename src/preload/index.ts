import { contextBridge, ipcRenderer } from 'electron'
import { IPC, type ChatPart, type TabState } from '../shared/ipc'

/**
 * The only bridge between the renderer and the main process. Every entry is an
 * explicit, narrow operation — no `ipcRenderer` passthrough, so the renderer
 * cannot reach arbitrary channels.
 */
const api = {
  models: {
    list: (): Promise<unknown> => ipcRenderer.invoke(IPC.modelsList)
  },
  skills: {
    list: (): Promise<unknown> => ipcRenderer.invoke(IPC.skillsList)
  },
  exec: {
    policy: (): Promise<unknown> => ipcRenderer.invoke(IPC.execPolicy)
  },
  chat: {
    send: (payload: { modelId?: string; messages: unknown[] }): Promise<unknown> =>
      ipcRenderer.invoke(IPC.chatSend, payload),
    cancel: (): Promise<unknown> => ipcRenderer.invoke(IPC.chatCancel),
    onPart: (fn: (part: ChatPart) => void) => {
      const listener = (_e: unknown, part: ChatPart) => fn(part)
      ipcRenderer.on(IPC.chatPart, listener)
      return () => ipcRenderer.removeListener(IPC.chatPart, listener)
    },
    onDone: (fn: () => void) => {
      const listener = () => fn()
      ipcRenderer.on(IPC.chatDone, listener)
      return () => ipcRenderer.removeListener(IPC.chatDone, listener)
    },
    onError: (fn: (message: string) => void) => {
      const listener = (_e: unknown, message: string) => fn(message)
      ipcRenderer.on(IPC.chatError, listener)
      return () => ipcRenderer.removeListener(IPC.chatError, listener)
    }
  },
  tabs: {
    create: (url?: string): Promise<TabState> => ipcRenderer.invoke(IPC.tabsCreate, url),
    navigate: (id: number, url: string): Promise<TabState[]> =>
      ipcRenderer.invoke(IPC.tabsNavigate, { id, url }),
    close: (id: number): Promise<TabState[]> => ipcRenderer.invoke(IPC.tabsClose, id),
    activate: (id: number): Promise<TabState[]> => ipcRenderer.invoke(IPC.tabsActivate, id),
    state: (): Promise<TabState[]> => ipcRenderer.invoke(IPC.tabsState)
  }
}

contextBridge.exposeInMainWorld('api', api)

export type Api = typeof api
