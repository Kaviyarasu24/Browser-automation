// Dev-only: the acceptance test that matters — with the real app and the real
// TabManager, does the pointer show up on its own once a tab exists, with no
// click involved?
const { app, BrowserWindow } = require('electron')

require('../out/main/index.js')

const PAGE = `<!doctype html><html><body style="margin:0;background:#ffffff;font:16px system-ui;padding:40px">
<h1>Search results</h1>
<p><a href="#a" style="display:block;padding:14px">Alpha University — Computer Science</a></p>
<p><a href="#b" style="display:block;padding:14px">Beta Institute — Data Science</a></p>
</body></html>`

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

const results = []
function check(name, ok, detail) {
  results.push({ name, ok })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`)
}

app.whenReady().then(() => {
  setTimeout(async () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (!win) {
      console.error('no window')
      app.exit(1)
      return
    }

    // Create a tab through the real IPC path the renderer uses.
    const dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(PAGE)
    const created = await win.webContents.executeJavaScript(
      `window.api.tabs.create(${JSON.stringify(dataUrl)})`,
      true
    )
    console.log('tab created =>', JSON.stringify(created))

    // Find the tab view among the window's child views. The renderer's own
    // content is not a child view, so the tab is the one child present.
    const views = win.contentView.children.filter((v) => v && v.webContents)
    console.log(`child views => ${views.length}`)
    const tabView = views[views.length - 1]
    if (!tabView) {
      check('tab view exists', false, 'no child views')
      app.exit(1)
      return
    }
    check('tab view exists', true)

    await new Promise((r) => setTimeout(r, 2500))

    // No click has happened yet. Is the pointer present?
    const probe = await tabView.webContents.executeJavaScript(
      `(function () {
         var el = document.querySelector('[data-virtual-cursor]');
         if (!el) return JSON.stringify({ present: false });
         var r = el.getBoundingClientRect();
         return JSON.stringify({
           present: true,
           hasShadow: !!el.shadowRoot,
           opacity: getComputedStyle(el).opacity,
           zIndex: getComputedStyle(el).zIndex,
           rect: { x: r.left, y: r.top, w: r.width, h: r.height }
         });
       })()`,
      true
    )
    const info = JSON.parse(probe)
    check('pointer exists before any click', info.present === true, probe)

    if (info.present) {
      check('pointer is opaque (not hidden)', info.opacity === '1', `opacity=${info.opacity}`)
      check('pointer is above page content', info.zIndex === '2147483647', `z=${info.zIndex}`)

      // A live compositor surface is not always available (the window may be
      // occluded), so the pixel check is reported as skipped rather than
      // failed when capture cannot run. smoke-cursor.cjs does the pixel proof
      // with a window that is certainly on screen.
      try {
        const shot = await tabView.webContents.capturePage()
        const size = shot.getSize()
        const scale = size.width / Math.max(1, tabView.getBounds().width)
        const px = Math.round((info.rect.x + 9) * scale)
        const py = Math.round((info.rect.y + 9) * scale)
        const painted = darkPixels(shot, px, py, 18)
        check('pointer is painted on screen', painted > 15, `dark=${painted} at ${px},${py} scale=${scale}`)
      } catch (error) {
        console.log(`SKIP  pointer pixel check (${error.message})`)
      }
    }

    const failures = results.filter((r) => !r.ok)
    console.log(`\nVISIBLE CURSOR SMOKE => ${results.length - failures.length}/${results.length} passed`)
    app.exit(failures.length ? 1 : 0)
  }, 4000)
})
