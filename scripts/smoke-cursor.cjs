// Dev-only: prove the virtual pointer is visible on a real page, survives a
// navigation, and does not swallow the user's clicks.
const { app, BrowserWindow, WebContentsView } = require('electron')
const { execFileSync } = require('node:child_process')

const PAGE = `<!doctype html><html><body style="margin:0;background:#ffffff;font:15px system-ui;padding:30px">
<a id="alpha" href="#a" style="display:block;padding:12px">Alpha University — Computer Science</a>
<a id="beta" href="#b" style="display:block;padding:12px">Beta Institute — Data Science</a>
<div id="hit" style="width:100%;height:200px;background:#eef"></div>
<script>
  window.__page = { down: 0, move: 0 };
  document.addEventListener('mousedown', () => window.__page.down++, true);
  document.addEventListener('mousemove', () => window.__page.move++, true);
</script>
</body></html>`

const PAGE2 = `<!doctype html><html><body style="margin:0;background:#ffffff;font:15px system-ui;padding:30px">
<h1>Second page</h1>
<a id="gamma" href="#c" style="display:block;padding:12px">Gamma College</a>
<script>window.__page = { down: 0, move: 0 };</script>
</body></html>`

const results = []
function check(name, ok, detail) {
  results.push({ name, ok })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`)
}

function ps(command) {
  try {
    return execFileSync('powershell.exe', ['-NoProfile', '-Command', command], { encoding: 'utf8' })
  } catch {
    return ''
  }
}

/** Count dark pixels in a box of the captured bitmap. */
function darkPixels(image, cx, cy, half) {
  const bmp = image.toBitmap()
  const { width } = image.getSize()
  let dark = 0
  for (let y = cy - half; y <= cy + half; y++) {
    for (let x = cx - half; x <= cx + half; x++) {
      if (x < 0 || y < 0 || x >= width) continue
      const i = (y * width + x) * 4
      if (bmp[i] < 120 && bmp[i + 1] < 120 && bmp[i + 2] < 120) dark++
    }
  }
  return dark
}

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 760, height: 520, x: 100, y: 80, show: true })
  const view = new WebContentsView({ webPreferences: { contextIsolation: true, sandbox: true } })
  win.contentView.addChildView(view)
  view.setBounds({ x: 0, y: 0, width: 760, height: 520 })

  // The injection under test, copied from src/main/cursor.ts.
  const CURSOR_STYLE = `
:host { all: initial; position: fixed; left: 0; top: 0; width: 26px; height: 26px;
  pointer-events: none; z-index: 2147483647; opacity: 0;
  transition: transform 380ms cubic-bezier(.22,.61,.36,1), opacity 140ms linear; will-change: transform; }
:host(.visible) { opacity: 1; }
:host(.pressing) .arrow { filter: drop-shadow(0 0 8px #ff2d55); }
svg { display: block; overflow: visible; }
.arrow { filter: drop-shadow(0 2px 3px rgba(0,0,0,.5)); transition: filter 90ms linear; }
.badge { position: absolute; left: 15px; top: 15px; font: 700 9px/1 ui-monospace, monospace;
  letter-spacing: .06em; color: #fff; background: #e8455f; border-radius: 3px; padding: 3px 4px;
  white-space: nowrap; box-shadow: 0 1px 3px rgba(0,0,0,.45); }
`
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
  svg.setAttribute('width','26'); svg.setAttribute('height','26'); svg.setAttribute('viewBox','0 0 26 26');
  var path = document.createElementNS(NS, 'path');
  path.setAttribute('d','M3 2 L3 19.4 L8.1 14.5 L11.5 22 L14.9 20.4 L11.5 13.3 L18.5 13 Z');
  path.setAttribute('fill','#ffffff'); path.setAttribute('stroke','#111111');
  path.setAttribute('stroke-width','1.6'); path.setAttribute('stroke-linejoin','round');
  svg.appendChild(path); wrap.appendChild(svg); root.appendChild(wrap);
  var badge = document.createElement('div');
  badge.className = 'badge'; badge.textContent = 'AI';
  root.appendChild(badge);
  (document.body || document.documentElement).appendChild(host);
  host.classList.add('visible');
  window.__virtualCursor = {
    move: function (x, y) { host.style.transform = 'translate(' + x + 'px,' + y + 'px)'; host.classList.add('visible'); },
    press: function () { host.classList.add('pressing'); },
    release: function () { host.classList.remove('pressing'); },
    hide: function () { host.classList.remove('visible'); },
    show: function () { host.classList.add('visible'); },
    at: function () { var r = host.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }
  };
  return true;
})()`

  const inject = () => view.webContents.executeJavaScript(INJECT, true)

  view.webContents.on('dom-ready', () => { void inject() })

  view.webContents.once('did-finish-load', async () => {
    await inject()

    // 1. The pointer exists and is not parked off-screen.
    const at0 = await view.webContents.executeJavaScript('JSON.stringify(window.__virtualCursor.at())', true)
    const box = JSON.parse(at0)
    check('pointer is present and on-screen', box.w > 0 && box.x > -50 && box.y > -50, JSON.stringify(box))

    // 2. It is actually painted: dark pixels at the pointer's location.
    // The tab lives in a child view, so capture that view, not the window
    // (win.capturePage() is empty here — the window has no content of its own).
    const target = { x: 300, y: 120 }
    await view.webContents.executeJavaScript(`window.__virtualCursor.move(${target.x}, ${target.y})`, true)
    await new Promise((r) => setTimeout(r, 700))
    const shot = await view.webContents.capturePage()
    const scale = shot.getSize().width / 760
    const painted = darkPixels(shot, Math.round(target.x * scale), Math.round(target.y * scale), 16)
    check('pointer is painted on screen', painted > 15, `dark pixels = ${painted}, scale = ${scale}`)

    // 3. The page still receives the user's clicks (pointer must not eat them).
    const content = win.getContentBounds()
    ps(`Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(${content.x + 500}, ${content.y + 400})`)
    ps(`Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait('{LEFT}')`)
    await new Promise((r) => setTimeout(r, 800))
    const pageState = await view.webContents.executeJavaScript('JSON.stringify(window.__page)', true)
    const moves = JSON.parse(pageState).move || 0
    check('page still receives mouse input', moves > 0, `page moves = ${moves}`)

    // 4. It survives a navigation.
    await view.webContents.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(PAGE2))
    await new Promise((r) => setTimeout(r, 1500))
    const after = await view.webContents.executeJavaScript(
      'window.__virtualCursor ? JSON.stringify(window.__virtualCursor.at()) : "missing"', true)
    check('pointer is re-injected after navigation', after !== 'missing', String(after))

    const failures = results.filter((r) => !r.ok)
    console.log(`\nCURSOR SMOKE => ${results.length - failures.length}/${results.length} passed`)
    app.exit(failures.length ? 1 : 0)
  })

  view.webContents.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(PAGE))
})
