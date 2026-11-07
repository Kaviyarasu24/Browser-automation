/**
 * The virtual pointer for the browser pane.
 *
 * It is injected into the page rather than drawn as a separate view, and that
 * is deliberate: an overlay `WebContentsView` composited above the tab
 * swallows every mouse event aimed at the page beneath it (verified — the
 * overlay received the moves and the page received none), which would make
 * the site unusable. Living in the page keeps the pointer click-through for
 * free.
 *
 * The cost of that choice is that the pointer dies with the document, so it
 * is re-injected on every navigation, and it can be styled away by hostile
 * page CSS. A shadow root closes the second hole: page styles cannot reach
 * inside it.
 */

const CURSOR_STYLE = `
:host {
  all: initial;
  position: fixed;
  left: 0;
  top: 0;
  width: 26px;
  height: 26px;
  pointer-events: none;
  z-index: 2147483647;
  opacity: 0;
  transition: transform 380ms cubic-bezier(.22, .61, .36, 1), opacity 140ms linear;
  will-change: transform;
}
:host(.visible) { opacity: 1; }
:host(.pressing) .arrow { filter: drop-shadow(0 0 8px #ff2d55); }
svg { display: block; overflow: visible; }
.arrow {
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, .5));
  transition: filter 90ms linear;
}
.badge {
  position: absolute;
  left: 15px;
  top: 15px;
  font: 700 9px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
  letter-spacing: .06em;
  color: #fff;
  background: #e8455f;
  border-radius: 3px;
  padding: 3px 4px;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .45);
}
`

/**
 * Idempotent: safe to run on every navigation and after every page load
 * event, since only one pointer may exist per document.
 */
const INJECT = `
(function () {
  if (window.__virtualCursor) return true;
  var host = document.createElement('div');
  host.setAttribute('data-virtual-cursor', '');
  var root = host.attachShadow({ mode: 'closed' });
  var style = document.createElement('style');
  style.textContent = ${JSON.stringify(CURSOR_STYLE)};
  root.appendChild(style);

  var wrap = document.createElement('div');
  wrap.className = 'arrow';
  var NS = 'http://www.w3.org/2000/svg';
  var svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('width', '26');
  svg.setAttribute('height', '26');
  svg.setAttribute('viewBox', '0 0 26 26');
  var path = document.createElementNS(NS, 'path');
  path.setAttribute('d', 'M3 2 L3 19.4 L8.1 14.5 L11.5 22 L14.9 20.4 L11.5 13.3 L18.5 13 Z');
  path.setAttribute('fill', '#ffffff');
  path.setAttribute('stroke', '#111111');
  path.setAttribute('stroke-width', '1.6');
  path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path);
  wrap.appendChild(svg);
  root.appendChild(wrap);

  var badge = document.createElement('div');
  badge.className = 'badge';
  badge.textContent = 'AI';
  root.appendChild(badge);

  (document.body || document.documentElement).appendChild(host);
  host.classList.add('visible');

  window.__virtualCursor = {
    move: function (x, y) {
      host.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      host.classList.add('visible');
    },
    press: function () { host.classList.add('pressing'); },
    release: function () { host.classList.remove('pressing'); },
    hide: function () { host.classList.remove('visible'); },
    show: function () { host.classList.add('visible'); },
    at: function () {
      var r = host.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    }
  };
  return true;
})()`

export class PageCursor {
  private readonly onDomReady: () => void

  constructor(private readonly wc: Electron.WebContents) {
    // A navigation replaces the document, so the pointer has to be reinstalled.
    this.onDomReady = () => {
      this.inject()
    }
    this.wc.on('dom-ready', this.onDomReady)
  }

  /** Detach from the web contents; called when its tab closes. */
  dispose(): void {
    this.wc.off('dom-ready', this.onDomReady)
  }

  inject(): void {
    void this.wc.executeJavaScript(INJECT, true).catch(() => {})
  }

  private async run(script: string): Promise<void> {
    // The context is gone right after a navigation; re-inject and retry once.
    try {
      await this.wc.executeJavaScript(script, true)
    } catch {
      this.inject()
      try {
        await this.wc.executeJavaScript(script, true)
      } catch {
        // The page is mid-navigation. The next call will land.
      }
    }
  }

  async moveTo(x: number, y: number): Promise<void> {
    await this.run(`window.__virtualCursor && window.__virtualCursor.move(${x}, ${y})`)
  }

  async press(): Promise<void> {
    await this.run('window.__virtualCursor && window.__virtualCursor.press()')
  }

  async release(): Promise<void> {
    await this.run('window.__virtualCursor && window.__virtualCursor.release()')
  }

  async show(): Promise<void> {
    await this.run('window.__virtualCursor && window.__virtualCursor.show()')
  }

  async hide(): Promise<void> {
    await this.run('window.__virtualCursor && window.__virtualCursor.hide()')
  }

  /** Where the pointer actually is, for verification. */
  async position(): Promise<{ x: number; y: number; w: number; h: number } | null> {
    try {
      const raw = await this.wc.executeJavaScript(
        'window.__virtualCursor ? JSON.stringify(window.__virtualCursor.at()) : null',
        true
      )
      return typeof raw === 'string' ? (JSON.parse(raw) as { x: number; y: number; w: number; h: number }) : null
    } catch {
      return null
    }
  }
}
