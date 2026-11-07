// Dev-only: a full search against a real HTTP server, replicating the exact
// decision logic in TabManager.typeInto — type, check whether the URL moved,
// and fall back to the form's submit control when synthetic Enter does nothing.
const { app, BrowserWindow, WebContentsView } = require('electron')
const { createServer } = require('node:http')

const HOME = `<!doctype html><html><body style="font:15px system-ui;padding:24px">
<form id="f" method="get" action="/search">
  <h1>Search engine</h1>
  <input name="q" id="q" type="search" placeholder="Search" aria-label="Search"
         style="width:400px;padding:8px">
  <button type="submit">Go</button>
</form>
</body></html>`

const RESULTS = `<!doctype html><html><body style="font:15px system-ui;padding:24px">
<h1 id="r">Results for Dhoni</h1>
</body></html>`

// The scripts under test, copied verbatim from src/main/tabs.ts.
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
      field: n, tag: el.tagName,
      type: (el.getAttribute('type') || (el.isContentEditable ? 'contenteditable' : 'text')).slice(0, 20),
      name: (el.getAttribute('name') || '').slice(0, 40),
      id: (id || '').slice(0, 40),
      placeholder: (el.getAttribute('placeholder') || '').slice(0, 80),
      ariaLabel: (el.getAttribute('aria-label') || '').slice(0, 80),
      label: label.replace(/\\s+/g, ' ').slice(0, 80),
      value: ((el.value || el.textContent || '') + '').trim().slice(0, 60),
      inForm: !!form, submit: submit,
      x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2)
    });
    n++;
    if (out.length >= 25) break;
  }
  return out;
})()`

const TYPE_INTO = (field, text, submit) => `
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
  if (!${submit}) return { ok: true, field: ${field}, typed: value, submitted: false };
  el.dispatchEvent(keyEvent('keydown', 'Enter'));
  el.dispatchEvent(keyEvent('keypress', 'Enter'));
  el.dispatchEvent(keyEvent('keyup', 'Enter'));
  var form = el.closest ? el.closest('form') : null;
  return { ok: true, field: ${field}, typed: value, submitted: true, inForm: !!form };
})()`

const SUBMIT_FORM = `
(function () {
  var el = document.activeElement;
  if (!el || !el.closest) return { ok: false, reason: 'no focused field' };
  var form = el.closest('form');
  if (!form) return { ok: false, reason: 'field is not inside a form' };
  var btn = form.querySelector('button[type="submit"], input[type="submit"], button:not([type])');
  if (btn) { btn.click(); return { ok: true, how: 'clicked submit button' }; }
  if (typeof form.requestSubmit === 'function') {
    form.requestSubmit();
    return { ok: true, how: 'form.requestSubmit()' };
  }
  return { ok: false, reason: 'form has no submit control' };
})()`

const results = []
function check(name, ok, detail) {
  results.push({ name, ok })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`)
}

let base = ''

app.whenReady().then(async () => {
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost')
    if (url.pathname === '/search') {
      res.writeHead(200, { 'content-type': 'text/html' })
      res.end(RESULTS)
      return
    }
    res.writeHead(200, { 'content-type': 'text/html' })
    res.end(HOME)
  })
  await new Promise((r) => server.listen(0, '127.0.0.1', r))
  base = `http://127.0.0.1:${server.address().port}`

  const win = new BrowserWindow({ width: 800, height: 500, show: true })
  const view = new WebContentsView({ webPreferences: { contextIsolation: true, sandbox: true } })
  win.contentView.addChildView(view)
  view.setBounds({ x: 0, y: 0, width: 800, height: 500 })

  const run = (src) => view.webContents.executeJavaScript(src, true)

  const settle = () =>
    new Promise((resolve) => {
      if (!view.webContents.isLoading()) {
        resolve()
        return
      }
      view.webContents.once('did-stop-loading', resolve)
      setTimeout(resolve, 8000)
    })

  view.webContents.once('did-finish-load', async () => {
    const fields = await run(FIELDS)
    check('found the search box on a real page', Array.isArray(fields) && fields.length === 1,
      `count=${fields && fields.length}`)
    if (!fields || !fields.length) {
      app.exit(1)
      return
    }

    // --- the real typeInto sequence ---
    const before = view.webContents.getURL()

    const typed = await run(TYPE_INTO(fields[0].field, 'Dhoni', true))
    check('typing reported success', typed && typed.ok === true, JSON.stringify(typed))

    // Synthetic Enter has no default action, so no navigation should have
    // started; this is the condition the fallback exists for.
    await new Promise((r) => setTimeout(r, 300))
    const afterEnter = view.webContents.getURL()
    check('synthetic Enter did not navigate on its own', afterEnter === before,
      `${afterEnter.replace(base, '')}`)

    const fallback = await run(SUBMIT_FORM)
    check('fallback found the submit control', fallback && fallback.ok === true,
      JSON.stringify(fallback))

    // The click starts a navigation, which may already be committed by the
    // time we look, so wait for the load to finish rather than for isLoading
    // to be false at an arbitrary moment.
    await new Promise((resolve) => {
      if (view.webContents.getURL().includes('/search')) {
        view.webContents.once('did-stop-loading', resolve)
        setTimeout(resolve, 4000)
        return
      }
      view.webContents.once('did-navigate', () => {
        view.webContents.once('did-stop-loading', resolve)
        setTimeout(resolve, 4000)
      })
      setTimeout(resolve, 6000)
    })

    const finalUrl = view.webContents.getURL()
    check('fallback navigated to the results page',
      finalUrl.includes('/search') && finalUrl.includes('q=Dhoni'),
      finalUrl.replace(base, ''))

    const heading = await run('document.getElementById("r") ? document.getElementById("r").textContent : ""')
    check('results page rendered', /Results for Dhoni/.test(heading), `h1="${heading}"`)

    server.close()
    const failures = results.filter((r) => !r.ok)
    console.log(`\nSEARCH SMOKE => ${results.length - failures.length}/${results.length} passed`)
    app.exit(failures.length ? 1 : 0)
  })

  view.webContents.loadURL(base + '/')
})
