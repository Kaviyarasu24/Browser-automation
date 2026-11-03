export const IPC = {
  // renderer -> main (invoke)
  chatSend: 'chat:send',
  chatCancel: 'chat:cancel',
  modelsList: 'models:list',
  skillsList: 'skills:list',
  tabsCreate: 'tabs:create',
  tabsNavigate: 'tabs:navigate',
  tabsClose: 'tabs:close',
  tabsActivate: 'tabs:activate',
  tabsState: 'tabs:state',
  execPolicy: 'exec:policy',

  // main -> renderer (send)
  chatPart: 'chat:part',
  chatDone: 'chat:done',
  chatError: 'chat:error'
} as const

export type TabState = {
  id: number
  url: string
  title: string
  active: boolean
}

export type ExecPolicy = 'sandbox' | 'deny' | 'direct-host'

export type ChatPart =
  | { type: 'text'; text: string }
  | { type: 'reasoning'; text: string }
  | { type: 'tool-call'; toolName: string; input: unknown }
  | { type: 'tool-result'; toolName: string; output: unknown }
  | { type: 'error'; message: string }
