/* ============================================================
   CEGAVI — Shared JavaScript
   ============================================================ */

// ── NAV SCROLL ───────────────────────────────────────────────
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── LEAD FORM ────────────────────────────────────────────────
const CEGAVI = {
  API:       'https://api.cegavi.com',
  FORMSPREE: 'https://formspree.io/f/SEU_ID',   // ← replace
  EMAIL:     'contato@cegavi.com',
};

async function submitLead(opts = {}) {
  const {
    formId    = 'lead-form',
    btnId     = 'lead-btn',
    successId = 'lead-success',
    lang      = document.documentElement.lang || 'en',
  } = opts;

  const form    = document.getElementById(formId);
  const btn     = document.getElementById(btnId);
  const success = document.getElementById(successId);
  if (!form || !btn) return;

  const get = id => (document.getElementById(id)?.value || '').trim();
  const name     = get('lf-name');
  const email    = get('lf-email');
  const company  = get('lf-company');
  const platform = get('lf-platform');
  const message  = get('lf-message');

  // Validation messages
  const ERR = {
    name:    { en: 'Please enter your name',     pt: 'Informe seu nome' },
    email:   { en: 'Invalid email',              pt: 'E-mail inválido' },
    company: { en: 'Please enter your company',  pt: 'Informe sua empresa' },
    send:    { en: 'Error sending. Write to ' + CEGAVI.EMAIL, pt: 'Erro ao enviar. Escreva para ' + CEGAVI.EMAIL },
  };
  const l = lang.startsWith('pt') ? 'pt' : 'en';

  clearMsg(formId);
  if (!name)                        { showMsg(formId, 'err', ERR.name[l]);    return; }
  if (!email || !email.includes('@')) { showMsg(formId, 'err', ERR.email[l]);   return; }
  if (!company)                     { showMsg(formId, 'err', ERR.company[l]); return; }

  const origTxt = btn.textContent;
  btn.disabled  = true;
  btn.innerHTML = '<span class="btn-spinner">⟳</span> ' + (l === 'en' ? 'Sending…' : 'Enviando…');

  const payload = { name, email, company, platform, message, lang, source: 'site' };
  let ok = false;

  try {
    const r = await fetch(CEGAVI.API + '/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    ok = (await r.json()).ok;
  } catch (_) {
    try {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
      const r = await fetch(CEGAVI.FORMSPREE, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
      ok = r.ok;
    } catch (_) {
      // Fallback: mailto
      window.location.href = `mailto:${CEGAVI.EMAIL}?subject=Demo%20%E2%80%94%20${encodeURIComponent(company)}&body=Name%3A%20${encodeURIComponent(name)}%0AEmail%3A%20${encodeURIComponent(email)}`;
      ok = true;
    }
  }

  btn.disabled  = false;
  btn.textContent = origTxt;

  if (ok) {
    form.style.display    = 'none';
    if (success) {
      success.style.display = 'block';
      const emailEl = document.getElementById('lf-success-email');
      if (emailEl) emailEl.textContent = email;
    }
  } else {
    showMsg(formId, 'err', ERR.send[l]);
  }
}

function showMsg(formId, type, txt) {
  const el = document.getElementById(formId + '-msg');
  if (!el) return;
  el.className = 'form-message ' + type;
  el.textContent = (type === 'err' ? '⚠ ' : '✓ ') + txt;
  el.style.display = 'block';
}
function clearMsg(formId) {
  const el = document.getElementById(formId + '-msg');
  if (el) el.style.display = 'none';
}

// Expose for inline onsubmit
window.submitLead = submitLead;
