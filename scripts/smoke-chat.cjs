// Dev-only: exercise the chat IPC path and assert failures surface cleanly.
// Capture happens renderer-side, because main->renderer sends do not surface as
// webContents 'ipc-message' events.
const { app, BrowserWindow } = require('electron')

require('../out/main/index.js')

const SETUP = `(() => {
  window.__smoke = { parts: [], done: false, error: null };
  window.api.chat.onPart((p) => window.__smoke.parts.push(p));
  window.api.chat.onDone(() => { window.__smoke.done = true; });
  window.api.chat.onError((m) => { window.__smoke.error = m; });
  return true;
})()`

app.whenReady().then(() => {
  setTimeout(async () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (!win) {
      console.error('CHAT SMOKE FAIL: no window')
      app.exit(1)
      return
    }

    await win.webContents.executeJavaScript(SETUP, true)
    await win.webContents.executeJavaScript(
      `window.api.chat.send({ messages: [{ role: 'user', content: 'ping' }] })`,
      true
    )

    const read = async () =>
      JSON.parse(await win.webContents.executeJavaScript(`JSON.stringify(window.__smoke)`, true))

    let state = await read()
    let waited = 0
    while (!state.done && !state.error && waited < 20000) {
      await new Promise((r) => setTimeout(r, 250))
      waited += 250
      state = await read()
    }

    console.log('CHAT SMOKE =>', JSON.stringify(state))

    if (state.error) {
      console.log('CHAT SMOKE PASS (error surfaced to renderer):', state.error)
      app.exit(0)
    } else if (state.done || state.parts.length > 0) {
      console.log('CHAT SMOKE PASS (stream produced output)')
      app.exit(0)
    } else {
      console.error('CHAT SMOKE FAIL: no terminal state after', waited, 'ms')
      app.exit(1)
    }
  }, 4000)
})
