import { WebContentsView, type BaseWindow } from 'electron'
import type { TabState } from '../shared/ipc'
import { PageCursor } from './cursor'

const SIDEBAR_WIDTH = 380
const BROWSER_TOOLBAR_HEIGHT = 44

/** How long the cursor glides before the click lands, in ms. */
const CURSOR_GLIDE_MS = 420

/** Centre point of the first element whose visible text matches, or null. */
function locateByTextScript(text: string): string {
  return `
(function () {
  var want = ${JSON.stringify(text)}.toLowerCase().trim();
  var nodes = document.querySelectorAll('a[href], button, [role="button"], input[type="submit"], input[type="button"]');
  var exact = null, partial = null;
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    var label = (el.innerText || el.value || el.textContent || '').trim();
    if (!label) continue;
    var lower = label.toLowerCase();
    if (lower === want) { exact = el; break; }
    if (!partial && lower.indexOf(want) !== -1) partial = el;
  }
  var target = exact || partial;
  if (!target) return null;
  target.scrollIntoView({ block: 'center', inline: 'center' });
  var r = target.getBoundingClientRect();
  if (!r.width || !r.height) return null;
  return {
    x: Math.round(r.left + r.width / 2),
    y: Math.round(r.top + r.height / 2),
    tag: target.tagName,
    text: (target.innerText || target.value || '').trim().replace(/\\s+/g, ' ').slice(0, 80),
    href: target.href || null,
    exact: target === exact
  };
})()`
}

function clickAtScript(x: number, y: number): string {
  return `
(function () {
  var el = document.elementFromPoint(${x}, ${y});
  if (!el) return { ok: false, reason: 'nothing at that point' };
  var base = { bubbles: true, cancelable: true, view: window, clientX: ${x}, clientY: ${y}, button: 0 };
  el.dispatchEvent(new MouseEvent('mousemove', base));
  el.dispatchEvent(new MouseEvent('mousedown', Object.assign({}, base, { buttons: 1 })));
  el.dispatchEvent(new MouseEvent('mouseup', Object.assign({}, base, { buttons: 0 })));
  if (typeof el.click === 'function') el.click();
  else el.dispatchEvent(new MouseEvent('click', base));
  var anchor = el.closest ? el.closest('a[href]') : null;
  // Only an interactive element owns a label. Without this guard a click on
  // blank space matches <html>, whose innerText is the whole document.
  var interactive = !!(el.matches && el.matches('a[href], button, [role="button"], input[type="submit"], input[type="button"]'));
  return {
    ok: true,
    tag: el.tagName,
    interactive: interactive,
    text: interactive ? (el.innerText || el.value || '').trim().replace(/\\s+/g, ' ').slice(0, 80) : '',
    href: anchor ? anchor.href : null
  };
})()`
}

/** Every clickable affordance on the page, with viewport coordinates. */
const CLICKABLES = `
(function () {
  var nodes = document.querySelectorAll('a[href], button, [role="button"], input[type="submit"], input[type="button"]');
  var out = [];
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    var r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (r.bottom < 0 || r.top > innerHeight) continue;
    var label = (el.innerText || el.value || el.textContent || '').trim().replace(/\\s+/g, ' ');
    if (!label) continue;
    out.push({
      text: label.slice(0, 80),
      tag: el.tagName,
      href: el.href || null,
      x: Math.round(r.left + r.width / 2),
      y: Math.round(r.top + r.height / 2)
    });
    if (out.length >= 60) break;
  }
  return out;
})()`

/**
 * Text inputs, textareas and contenteditable regions, described well enough
 * for the model to pick the right one without guessing.
 *
 * Each field is tagged with a `data-vc-field` index so it can be addressed
 * again by `typeIntoScript` without the model having to invent a CSS selector
 * or rely on coordinates that go stale as the page scrolls.
 */
const FIELDS = `
(function () {
  var sel = 'input:not([type=hidden]):not([type=submit]):not([type=button])' +
            ':not([type=checkbox]):not([type=radio]):not([type=file]):not([type=image])' +
            ':not([type=reset]), textarea, [contenteditable=""], [contenteditable="true"]';
  var nodes = document.querySelectorAll(sel);
  var out = [];
  var n = 0;
  for (var i = 0; i < nodes.length; i++) {
    var el = nodes[i];
    var r = el.getBoundingClientRect();
    if (r.width < 8 || r.height < 8) continue;
    var st = getComputedStyle(el);
    if (st.visibility === 'hidden' || st.display === 'none' || st.opacity === '0') continue;
    if (el.disabled || el.readOnly) continue;

    el.setAttribute('data-vc-field', String(n));

    var label = '';
    var id = el.getAttribute('id');
    if (id && window.CSS && CSS.escape) {
      var forLabel = document.querySelector('label[for="' + CSS.escape(id) + '"]');
      if (forLabel) label = (forLabel.innerText || '').trim();
    }
    if (!label && el.closest) {
      var wrap = el.closest('label');
      if (wrap) label = (wrap.innerText || '').trim();
    }

    var form = el.closest ? el.closest('form') : null;
    var submit = '';
    if (form) {
      var sb = form.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
      if (sb) submit = ((sb.innerText || sb.value || '') + '').trim().replace(/\\s+/g, ' ').slice(0, 40);
    }

    out.push({
      field: n,
      tag: el.tagName,
      type: (el.getAttribute('type') || (el.isContentEditable ? 'contenteditable' : 'text')).slice(0, 20),
      name: (el.getAttribute('name') || '').slice(0, 40),
      id: (id || '').slice(0, 40),
      placeholder: (el.getAttribute('placeholder') || '').slice(0, 80),
      ariaLabel: (el.getAttribute('aria-label') || '').slice(0, 80),
      label: label.replace(/\\s+/g, ' ').slice(0, 80),
      value: ((el.value || el.textContent || '') + '').trim().slice(0, 60),
      inForm: !!form,
      submit: submit,
      x: Math.round(r.left + r.width / 2),
      y: Math.round(r.top + r.height / 2)
    });
    n++;
    if (out.length >= 25) break;
  }
  return out;
})()`

/**
 * Types into a tagged field the way a keyboard would: per-character key
 * events plus value assignment through the prototype's setter, so frameworks
 * that track their own state (React, Vue, Svelte) see the change. Assigning
 * `el.value` alone is invisible to all of them.
 *
 * A KeyboardEvent built from an init dictionary ignores `keyCode`, which some
 * older sites still read, so it is redefined onto the event explicitly.
 */
function typeIntoScript(field: number, text: string, submit: boolean): string {
  return `
(function () {
  var el = document.querySelector('[data-vc-field="${field}"]');
  if (!el) return { ok: false, reason: 'field ${field} is gone; call list_fields again' };

  var keyCodes = { 'Enter': 13, ' ': 32, 'Escape': 27 };
  function keyEvent(type, key) {
    var e = new KeyboardEvent(type, { key: key, code: key, bubbles: true, cancelable: true });
    var kc = keyCodes[key] || (key.length === 1 ? key.toUpperCase().charCodeAt(0) : 0);
    try { Object.defineProperty(e, 'keyCode', { get: function () { return kc; } }); } catch (x) {}
    try { Object.defineProperty(e, 'which', { get: function () { return kc; } }); } catch (x) {}
    return e;
  }

  el.focus();
  var isCE = el.isContentEditable;
  var proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  var desc = Object.getOwnPropertyDescriptor(proto, 'value');
  function setValue(v) {
    if (isCE) { el.textContent = v; return; }
    if (desc && desc.set) desc.set.call(el, v);
    else el.value = v;
  }

  // Select-all then type, which is what a person does in a search box.
  setValue('');
  el.dispatchEvent(new Event('input', { bubbles: true }));

  var chars = ${JSON.stringify(text)}.split('');
  var acc = '';
  for (var i = 0; i < chars.length; i++) {
    acc += chars[i];
    el.dispatchEvent(keyEvent('keydown', chars[i]));
    el.dispatchEvent(keyEvent('keypress', chars[i]));
    setValue(acc);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(keyEvent('keyup', chars[i]));
  }
  el.dispatchEvent(new Event('change', { bubbles: true }));

  var value = isCE ? (el.textContent || '') : (el.value || '');
  if (!${submit}) {
    return { ok: true, field: ${field}, typed: value, submitted: false };
  }

  el.dispatchEvent(keyEvent('keydown', 'Enter'));
  el.dispatchEvent(keyEvent('keypress', 'Enter'));
  el.dispatchEvent(keyEvent('keyup', 'Enter'));

  var form = el.closest ? el.closest('form') : null;
  return { ok: true, field: ${field}, typed: value, submitted: true, inForm: !!form };
})()`
}

/** Press a form's submit control, for engines that ignore Enter on the field. */
const SUBMIT_FORM = `
(function () {
  var el = document.activeElement;
  if (!el || !el.closest) return { ok: false, reason: 'no focused field' };
  var form = el.closest('form');
  if (!form) return { ok: false, reason: 'field is not inside a form' };
  var btn = form.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
  if (btn) {
    btn.click();
    return { ok: true, how: 'clicked submit button' };
  }
  if (typeof form.requestSubmit === 'function') {
    form.requestSubmit();
    return { ok: true, how: 'form.requestSubmit()' };
  }
  return { ok: false, reason: 'form has no submit control' };
})()`

export type Clickable = {
  text: string
  tag: string
  href: string | null
  x: number
  y: number
}

export type Field = {
  field: number
  tag: string
  type: string
  name: string
  id: string
  placeholder: string
  ariaLabel: string
  label: string
  value: string
  inForm: boolean
  submit: string
  x: number
  y: number
}

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
  /** The virtual pointer, drawn inside whichever tab is active. */
  private readonly cursors = new Map<number, PageCursor>()

  constructor(private readonly win: BaseWindow) {
    win.on('resize', () => this.layout())
  }

  private cursorFor(id: number): PageCursor | null {
    const tab = this.tabs.get(id)
    if (!tab) return null
    let cursor = this.cursors.get(id)
    if (!cursor) {
      cursor = new PageCursor(tab.view.webContents)
      this.cursors.set(id, cursor)
    }
    return cursor
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
    // Create the cursor eagerly so the pointer is present as soon as the page
    // renders, rather than appearing for the first time on a click. The
    // PageCursor re-injects itself on every dom-ready.
    this.cursorFor(id)
    void view.webContents.loadURL(url)
    this.activate(id)
    return this.toState(tab)
  }

  private async settle(id: number): Promise<void> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    if (!tab.view.webContents.isLoading()) return
    await new Promise<void>((resolve) => {
      const done = () => {
        tab.view.webContents.off('did-stop-loading', done)
        resolve()
      }
      tab.view.webContents.once('did-stop-loading', done)
      setTimeout(done, 10_000)
    })
  }

  /**
   * Glides the visible cursor to a point, settles, then dispatches a real
   * click. The pause between landing and pressing is what makes the motion
   * legible to a person watching the pane.
   */
  private async glideAndClick(id: number, x: number, y: number): Promise<unknown> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    const { webContents } = tab.view
    const cursor = this.cursorFor(id)
    if (!cursor) throw new Error(`No such tab: ${id}`)

    await cursor.show()
    await cursor.moveTo(x, y)
    await new Promise((r) => setTimeout(r, CURSOR_GLIDE_MS))
    await cursor.press()
    await new Promise((r) => setTimeout(r, 90))

    const result = await webContents.executeJavaScript(clickAtScript(x, y), true)

    await cursor.release()
    return result
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
    this.cursors.get(id)?.dispose()
    this.cursors.delete(id)
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

  async listClickables(id: number): Promise<Clickable[]> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    const items = await tab.view.webContents.executeJavaScript(CLICKABLES, true)
    if (!Array.isArray(items)) return []
    return items.filter(
      (item): item is Clickable =>
        typeof item?.text === 'string' &&
        typeof item?.tag === 'string' &&
        typeof item?.x === 'number' &&
        typeof item?.y === 'number'
    )
  }

  /** Click a point in the viewport, with the cursor visibly travelling there. */
  async clickAt(id: number, x: number, y: number): Promise<unknown> {
    await this.settle(id)
    return this.glideAndClick(id, x, y)
  }

  /**
   * Find the element whose label matches, then click it the same way. This is
   * the tool the agent should prefer: it never has to invent a URL.
   */
  async clickByText(
    id: number,
    text: string
  ): Promise<{ ok: true; text: string; href: string | null; exact: boolean } | { ok: false; reason: string }> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    await this.settle(id)
    const found = await tab.view.webContents.executeJavaScript(locateByTextScript(text), true)
    if (!found || typeof found.x !== 'number' || typeof found.y !== 'number') {
      return { ok: false, reason: `No clickable element matching "${text}"` }
    }
    await this.glideAndClick(id, found.x, found.y)
    return {
      ok: true,
      text: typeof found.text === 'string' ? found.text : text,
      href: typeof found.href === 'string' ? found.href : null,
      exact: found.exact === true
    }
  }

  async listFields(id: number): Promise<Field[]> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    await this.settle(id)
    const items = await tab.view.webContents.executeJavaScript(FIELDS, true)
    if (!Array.isArray(items)) return []
    return items.filter((item): item is Field => typeof item?.field === 'number')
  }

  /**
   * Type into a field the way a keyboard would, optionally submitting.
   *
   * The pointer is glided onto the field first so the typing is prefaced by
   * the same visible motion as a click, and the field is focused by a real
   * click rather than `focus()` alone — some sites only wire up their
   * handlers on pointerdown.
   */
  async typeInto(
    id: number,
    field: number,
    text: string,
    submit: boolean
  ): Promise<unknown> {
    const tab = this.tabs.get(id)
    if (!tab) throw new Error(`No such tab: ${id}`)
    await this.settle(id)

    const fields = await this.listFields(id)
    const target = fields.find((f) => f.field === field)
    if (!target) {
      return { ok: false, reason: `No field ${field} on this page; call list_fields again` }
    }

    await this.glideAndClick(id, target.x, target.y)
    const before = tab.url

    const result = await tab.view.webContents.executeJavaScript(
      typeIntoScript(field, text, submit),
      true
    )

    if (submit) {
      // Enter does nothing on some engines' home pages; fall back to the
      // form's own submit control before reporting failure.
      await new Promise((r) => setTimeout(r, 250))
      if (tab.url === before) {
        const fallback = await tab.view.webContents.executeJavaScript(SUBMIT_FORM, true)
        if (fallback && fallback.ok) {
          await this.settle(id)
          return { ...(result as object), submittedBy: fallback.how }
        }
      }
      await this.settle(id)
    }

    return result
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
