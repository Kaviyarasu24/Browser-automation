import type { ChatPart, ExecPolicy, TabState } from '../shared/ipc'
import type { ModelEntry } from '../shared/models'

type SkillSummary = { name: string; description: string; category?: string }

type Api = {
  models: { list: () => Promise<ModelEntry[]> }
  skills: { list: () => Promise<SkillSummary[]> }
  exec: { policy: () => Promise<{ allowed: boolean; backend: ExecPolicy; reason: string }> }
  chat: {
    send: (payload: { modelId?: string; messages: unknown[] }) => Promise<{ accepted: boolean }>
    cancel: () => Promise<unknown>
    onPart: (fn: (part: ChatPart) => void) => () => void
    onDone: (fn: () => void) => () => void
    onError: (fn: (message: string) => void) => () => void
  }
  tabs: {
    create: (url?: string) => Promise<TabState>
    navigate: (id: number, url: string) => Promise<TabState[]>
    close: (id: number) => Promise<TabState[]>
    activate: (id: number) => Promise<TabState[]>
    state: () => Promise<TabState[]>
  }
}

declare global {
  interface Window {
    api: Api
  }
}

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id)
  if (!el) throw new Error(`Missing element #${id}`)
  return el as T
}

const messagesEl = $<HTMLDivElement>('messages')
const inputEl = $<HTMLTextAreaElement>('input')
const urlEl = $<HTMLInputElement>('url')
const tabsEl = $<HTMLDivElement>('tabs')
const statusEl = $<HTMLDivElement>('status')

type Message = { role: 'user' | 'assistant'; content: string }
const history: Message[] = []
let activeTab: number | null = null
let selectedModel: string | null = null
let streaming = false

function bubble(kind: string, text: string): HTMLElement {
  const el = document.createElement('div')
  el.className = `msg ${kind}`
  el.textContent = text
  messagesEl.appendChild(el)
  messagesEl.scrollTop = messagesEl.scrollHeight
  return el
}

function setStatus(text: string): void {
  statusEl.textContent = text
}

function renderTabs(state: TabState[]): void {
  tabsEl.replaceChildren()
  for (const tab of state) {
    const el = document.createElement('div')
    el.className = tab.active ? 'tab active' : 'tab'
    el.textContent = tab.title || tab.url || 'New tab'
    el.title = tab.url
    el.onclick = async () => {
      renderTabs(await window.api.tabs.activate(tab.id))
      const next = (await window.api.tabs.state()).find((t) => t.active)
      if (next) {
        activeTab = next.id
        urlEl.value = next.url
      }
    }
    tabsEl.appendChild(el)
    if (tab.active) activeTab = tab.id
  }
}

async function send(): Promise<void> {
  const text = inputEl.value.trim()
  if (!text || streaming) return
  inputEl.value = ''
  bubble('user', text)
  history.push({ role: 'user', content: text })
  streaming = true
  setStatus('streaming…')

  let assistant = ''
  const assistantEl = bubble('assistant', '')

  let removePart = () => {}
  let removeDone = () => {}
  let removeError = () => {}
  const cleanup = () => {
    removePart()
    removeDone()
    removeError()
  }

  removePart = window.api.chat.onPart((part) => {
    if (part.type === 'text') {
      assistant += part.text
      assistantEl.textContent = assistant
    } else if (part.type === 'reasoning') {
      bubble('reasoning', part.text)
    } else if (part.type === 'tool-call') {
      bubble('tool', `→ ${part.toolName} ${JSON.stringify(part.input)}`)
    } else if (part.type === 'tool-result') {
      bubble('tool', `← ${part.toolName} ${JSON.stringify(part.output)?.slice(0, 400)}`)
    } else if (part.type === 'error') {
      bubble('error', part.message)
    }
    messagesEl.scrollTop = messagesEl.scrollHeight
  })

  removeDone = window.api.chat.onDone(() => {
    streaming = false
    setStatus('idle')
    if (assistant) history.push({ role: 'assistant', content: assistant })
    cleanup()
  })

  removeError = window.api.chat.onError((message) => {
    streaming = false
    setStatus('error')
    bubble('error', message)
    cleanup()
  })

  try {
    await window.api.chat.send({ modelId: selectedModel ?? undefined, messages: history })
  } catch (error) {
    cleanup()
    streaming = false
    setStatus('error')
    bubble('error', error instanceof Error ? error.message : String(error))
  }
}

$<HTMLButtonElement>('send').onclick = () => void send()
$<HTMLButtonElement>('go').onclick = () => void goToUrl()

async function goToUrl(): Promise<void> {
  const url = urlEl.value.trim()
  if (!url) return
  if (activeTab === null) {
    const tab = await window.api.tabs.create(url)
    activeTab = tab.id
    renderTabs(await window.api.tabs.state())
  } else {
    renderTabs(await window.api.tabs.navigate(activeTab, url))
  }
}

urlEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') void goToUrl()
})

inputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    void send()
  }
})

async function boot(): Promise<void> {
  const models = await window.api.models.list()
  const preferred = models.find((m) => m.isDefault) ?? models[0]
  selectedModel = preferred?.id ?? null

  const skills = await window.api.skills.list()
  const policy = await window.api.exec.policy()

  setStatus(
    `${preferred?.displayName ?? 'no model'} · ${skills.length} skill(s) · exec: ${policy.backend}`
  )
  if (policy.backend === 'direct-host') {
    bubble('error', `Execution policy is UNSANDBOXED. ${policy.reason}`)
  }

  renderTabs(await window.api.tabs.state())
  window.setInterval(async () => {
    if (document.activeElement === urlEl) return
    renderTabs(await window.api.tabs.state())
  }, 500)
}

void boot()
