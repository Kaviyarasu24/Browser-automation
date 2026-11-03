// Dev-only: boot the app and assert the renderer DOM actually populated.
const { app, BrowserWindow } = require('electron')

require('../out/main/index.js')

const PROBE = `(() => {
  const status = document.getElementById('status')
  const sidebar = document.getElementById('sidebar')
  const composer = document.getElementById('composer')
  return JSON.stringify({
    hasApi: typeof window.api === 'object' && window.api !== null,
    apiKeys: window.api ? Object.keys(window.api) : [],
    status: status ? status.textContent : null,
    sidebarPresent: !!sidebar,
    composerPresent: !!composer,
    bodyLen: document.body ? document.body.innerText.length : 0
  })
})()`

app.whenReady().then(() => {
  setTimeout(async () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (!win) {
      console.error('SMOKE FAIL: no window')
      app.exit(1)
      return
    }
    try {
      const raw = await win.webContents.executeJavaScript(PROBE, true)
      const result = JSON.parse(raw)
      console.log('SMOKE RESULT', JSON.stringify(result, null, 2))

      const problems = []
      if (!result.hasApi) problems.push('window.api missing (preload did not run)')
      if (!result.sidebarPresent) problems.push('sidebar missing')
      if (!result.composerPresent) problems.push('composer missing')
      if (!result.status || result.status === 'idle') {
        problems.push('status never updated (boot() did not complete)')
      }
      // models.list + skills.list + exec.policy must have resolved for status to change
      if (problems.length) {
        console.error('SMOKE FAIL:', problems.join('; '))
        app.exit(1)
      } else {
        console.log('SMOKE PASS')
        app.exit(0)
      }
    } catch (error) {
      console.error('SMOKE ERROR', error.message)
      app.exit(1)
    }
  }, 5000)
})
