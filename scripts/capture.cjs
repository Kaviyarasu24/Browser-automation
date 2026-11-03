// Dev-only: launch the built app, screenshot the window, exit. Not shipped.
const { app, BrowserWindow } = require('electron')
const { writeFileSync } = require('node:fs')
const { join } = require('node:path')

require('../out/main/index.js')

app.whenReady().then(() => {
  setTimeout(async () => {
    const win = BrowserWindow.getAllWindows()[0]
    if (!win) {
      console.error('no window')
      app.exit(1)
      return
    }
    const image = await win.capturePage()
    writeFileSync(join(process.cwd(), 'ui-capture.png'), image.toPNG())
    console.log('captured ui-capture.png')
    app.exit(0)
  }, 6000)
})
