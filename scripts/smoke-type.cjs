// Dev-only: verify the DOM search path — finding a field and typing into it.
// The page mimics a framework-controlled input that ignores plain value
// assignment, so the prototype-setter approach is actually exercised.
const { app, BrowserWindow, WebContentsView } = require('electron')

const PAGE = `<!doctype html><html><body style="margin:0;font:15px system-ui;padding:24px">
<form id="f" action="#results">
  <label for="q">Search the web</label>
  <input id="q" name="q" type="search" placeholder="Search or type a URL"
         style="display:block;width:420px;padding:8px;margin:8px 0">
  <button type="submit">Search</button>
</form>
<div id="out"></div>
<script>
  // Model a framework-controlled input. Frameworks listen for the 'input'
  // event and read el.value, so record every input event and its value.
  var input = document.getElementById('q');
  var seen = [];
  window.__t = {
    seen: function () { return seen; },
    keydowns: 0,
    enters: 0,
    focused: false,
    submitted: false
  };
  input.addEventListener('input', function () {
    seen.push(input.value);
    document.getElementById('out').textContent = 'typed=' + input.value;
  });
  input.addEventListener('keydown', function (e) {
    window.__t.keydowns++;
    if (e.key === 'Enter') window.__t.enters++;
  });
  input.addEventListener('focus', function () { window.__t.focused = true; });
  document.getElementById('f').addEventListener('submit', function (e) {
    window.__t.submitted = true;
  });
</script>
</body></html>`

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

function typeIntoScript(field, text, submit) {
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
}

const results = []
function check(name, ok, detail) {
  results.push({ name, ok })
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`)
}

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 500, show: true })
  const view = new WebContentsView({ webPreferences: { contextIsolation: true, sandbox: true } })
  win.contentView.addChildView(view)
  view.setBounds({ x: 0, y: 0, width: 800, height: 500 })

  view.webContents.once('did-finish-load', async () => {
    const run = (src) => view.webContents.executeJavaScript(src, true)

    const fields = await run(FIELDS)
    check('list_fields finds the search box', Array.isArray(fields) && fields.length === 1,
      JSON.stringify(fields))
    const f = fields[0]
    check('field carries a usable label', f && f.label === 'Search the web', `label="${f && f.label}"`)
    check('field reports its placeholder', f && f.placeholder.startsWith('Search'), f && f.placeholder)
    check('field reports the form submit control', f && f.submit === 'Search', `submit="${f && f.submit}"`)

    // Type a query. The page only sees value writes that go through the
    // native setter, so this also proves the prototype approach is necessary.
    const typed = await run(typeIntoScript(0, 'Dhoni', true))
    check('type_into reports success', typed && typed.ok === true, JSON.stringify(typed))
    check('typed value is correct', typed && typed.typed === 'Dhoni', `typed="${typed && typed.typed}"`)

    const state = await run('JSON.stringify({ keydowns: window.__t.keydowns, enters: window.__t.enters, focused: window.__t.focused, submitted: window.__t.submitted, value: document.getElementById("q").value })')
    const s = JSON.parse(state)
    check('field carries the final value', s.value === 'Dhoni', `value="${s.value}"`)
    check('field received focus', s.focused === true)
    check('key events were dispatched', s.keydowns >= 6, `keydowns=${s.keydowns}`)
    check('Enter was pressed', s.enters >= 1, `enters=${s.enters}`)
    // Synthetic KeyboardEvents are untrusted, so Enter has no default submit
    // action. This is exactly why typeInto falls back to the form's control.
    check('synthetic Enter alone does NOT submit (fallback is required)', s.submitted === false,
      `submitted=${s.submitted}`)

    // Per-character input events, not one bulk assignment.
    const seenArr = JSON.parse(await run('JSON.stringify(window.__t.seen())'))
    check('value was built character by character',
      seenArr.includes('D') && seenArr.includes('Dh') && seenArr.includes('Dhoni'),
      `${seenArr.length} input events, last="${seenArr[seenArr.length - 1]}"`)
    check('framework saw the final value', seenArr[seenArr.length - 1] === 'Dhoni',
      `last="${seenArr[seenArr.length - 1]}"`)

    // The fallback typeInto uses when Enter does not navigate.
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

    const fallback = await run(SUBMIT_FORM)
    check('submit fallback locates the form control', fallback && fallback.ok === true,
      JSON.stringify(fallback))
    const afterFallback = await run('window.__t.submitted')
    check('submit fallback actually submits the form', afterFallback === true,
      `submitted=${afterFallback}`)

    // A stale field number must fail cleanly rather than type into nothing.
    const stale = await run(typeIntoScript(99, 'x', true))
    check('stale field number fails cleanly', stale && stale.ok === false, JSON.stringify(stale))

    const failures = results.filter((r) => !r.ok)
    console.log(`\nTYPE SMOKE => ${results.length - failures.length}/${results.length} passed`)
    app.exit(failures.length ? 1 : 0)
  })

  view.webContents.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(PAGE))
})
