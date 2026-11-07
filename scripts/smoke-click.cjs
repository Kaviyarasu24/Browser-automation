// Dev-only: verify the injected pointer + click mechanics inside Electron's
// Chromium. Mirrors the scripts in src/main/tabs.ts against a synthetic page,
// because those constants are bundled and not importable from here.
const { app, BrowserWindow } = require('electron')

const PAGE = `<!doctype html><html><body>
  <a id="first" href="#target">Open the target page</a>
  <button id="counter">Press me</button>
  <div style="height:1200px"></div>
  <a id="far" href="#bottom">Deeply placed link</a>
  <div id="log"></div>
  <script>
    window.presses = 0;
    document.getElementById('counter').addEventListener('click', () => {
      window.presses++;
      document.getElementById('log').textContent = 'presses=' + window.presses;
    });
  </script>
</body></html>`

const AGENT_CURSOR = `
(function () {
  if (window.__agentPointer) return true;
  var host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = [
    'position:fixed', 'left:0', 'top:0', 'width:22px', 'height:22px',
    'pointer-events:none', 'z-index:2147483647',
    'transition:transform 380ms cubic-bezier(.22,.61,.36,1)',
    'transform:translate(-60px,-60px)'
  ].join(';');
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '22'); svg.setAttribute('height', '22');
  svg.setAttribute('viewBox', '0 0 22 22');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M2 1.6 L2 17.2 L6.6 12.9 L9.7 19.6 L12.8 18.1 L9.7 11.7 L15.9 11.4 Z');
  path.setAttribute('fill', '#ffffff'); path.setAttribute('stroke', '#111111');
  path.setAttribute('stroke-width', '1.5'); path.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(path); host.appendChild(svg);
  var mount = document.body || document.documentElement;
  if (!mount) return false;
  mount.appendChild(host);
  window.__agentPointer = {
    move: function (x, y) { host.style.transform = 'translate(' + x + 'px,' + y + 'px)'; },
    press: function () { host.style.filter = 'drop-shadow(0 0 6px #e8455f)'; },
    release: function () { host.style.filter = 'none'; }
  };
  return true;
})()`

function locateByTextScript(text) {
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

function clickAtScript(x, y) {
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
      text: label.slice(0, 80), tag: el.tagName, href: el.href || null,
      x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2)
    });
    if (out.length >= 60) break;
  }
  return out;
})()`

const results = []
function check(name, ok, detail) {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`)
}

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  })
  const wc = win.webContents

  wc.on('dom-ready', () => {
    void wc.executeJavaScript(AGENT_CURSOR, true).catch(() => {})
  })

  wc.once('did-finish-load', async () => {
    const run = (src) => wc.executeJavaScript(src, true)

    const cursor = await run('typeof window.__agentPointer')
    check('cursor injected', cursor === 'object', `typeof = ${cursor}`)

    const list = await run(CLICKABLES)
    check('listClickables finds both affordances', Array.isArray(list) && list.length === 2,
      `count = ${list && list.length}`)

    const located = await run(locateByTextScript('open the target'))
    check('locate by partial text', !!located && located.tag === 'A',
      located ? `${located.tag} @ ${located.x},${located.y} exact=${located.exact}` : 'null')

    const locatedExact = await run(locateByTextScript('Press me'))
    check('locate by exact text', !!locatedExact && locatedExact.exact === true,
      locatedExact ? `exact=${locatedExact.exact}` : 'null')

    const missing = await run(locateByTextScript('no such label anywhere'))
    check('missing label returns null', missing === null)

    // Cursor lands where told. Chromium normalises the inline style, so parse
    // the numbers back out instead of comparing the raw string.
    await run(`window.__agentPointer.move(${locatedExact.x}, ${locatedExact.y})`)
    const transform = await run('document.querySelector("[aria-hidden=true]").style.transform')
    const nums = (transform.match(/-?\d+/g) || []).map(Number)
    check('cursor moved to target', nums[0] === locatedExact.x && nums[1] === locatedExact.y, transform)

    // A real click through the same dispatch order the tool uses.
    const clicked = await run(clickAtScript(locatedExact.x, locatedExact.y))
    const presses = await run('window.presses')
    check('click dispatches mousedown/mouseup/click', clicked && clicked.ok === true,
      JSON.stringify(clicked))
    check('click handler actually ran', presses === 1, `presses = ${presses}`)

    // Scrolled-out element: locate should scroll it into view, then click.
    await run('window.scrollTo(0,0)')
    const far = await run(locateByTextScript('Deeply placed link'))
    check('locate scrolls element into view', !!far && far.y > 0 && far.y < 700,
      far ? `y = ${far.y}` : 'null')

    // Stale coordinates are the reason click_link re-locates right before
    // clicking: after a scroll, a point captured earlier lands on something
    // else. Assert the tool's own path survives the scroll.
    const relocated = await run(locateByTextScript('Press me'))
    const afterScroll = await run(clickAtScript(relocated.x, relocated.y))
    check('re-locating after scroll still hits the button',
      afterScroll && afterScroll.tag === 'BUTTON', JSON.stringify(afterScroll))

    // Clicking an element with no label still reports what it hit, rather than
    // pretending the click was meaningful.
    await run('window.scrollTo(0,0)')
    const unlabelled = await run(clickAtScript(5, 500))
    check('label-less element reports its tag honestly',
      unlabelled && unlabelled.ok === true && unlabelled.interactive === false && unlabelled.text === '',
      JSON.stringify(unlabelled))

    const bad = await run(clickAtScript(100000, 100000))
    check('click outside viewport returns ok:false', bad && bad.ok === false, JSON.stringify(bad))

    const failures = results.filter((r) => !r.ok)
    console.log(`\nCLICK SMOKE => ${results.length - failures.length}/${results.length} passed`)
    app.exit(failures.length ? 1 : 0)
  })

  win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(PAGE))
})
