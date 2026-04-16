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

// ── MOBILE NAV TOGGLE ────────────────────────────────────────
(function () {
  const btn     = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!btn || !mobileNav) return;

  btn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click or outside click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !mobileNav.contains(e.target)) {
      mobileNav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
})();

// ── LEAD FORM ────────────────────────────────────────────────
const CEGAVI = {
  HS_ENDPOINT: 'https://api.hsforms.com/submissions/v3/integration/submit/51351337/b5d81c5d-344e-4312-94b3-1f4d0dc5ddc7',
  EMAIL:       'contato@cegavi.com',
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
  const name      = get('lf-name');
  const email     = get('lf-email');
  const company   = get('lf-company');
  const message   = get('lf-message');
  const platforms = [...document.querySelectorAll('input[name="lf-platform"]:checked')]
    .map(el => el.value).join(';');

  // Validation messages
  const ERR = {
    name:    { en: 'Please enter your name',    pt: 'Informe seu nome' },
    email:   { en: 'Invalid email',             pt: 'E-mail inválido' },
    company: { en: 'Please enter your company', pt: 'Informe sua empresa' },
    send:    { en: 'Error sending. Write to ' + CEGAVI.EMAIL, pt: 'Erro ao enviar. Escreva para ' + CEGAVI.EMAIL },
  };
  const l = lang.startsWith('pt') ? 'pt' : 'en';

  clearMsg(formId);
  if (!name)                         { showMsg(formId, 'err', ERR.name[l]);    return; }
  if (!email || !email.includes('@')) { showMsg(formId, 'err', ERR.email[l]);   return; }
  if (!company)                      { showMsg(formId, 'err', ERR.company[l]); return; }

  const origTxt = btn.textContent;
  btn.disabled  = true;
  btn.innerHTML = '<span class="btn-spinner">⟳</span> ' + (l === 'en' ? 'Sending…' : 'Enviando…');

  // Build fields — skip empty values so HubSpot doesn't reject them
  const allFields = [
    { name: 'firstname',         value: name },
    { name: 'email',             value: email },
    { name: 'empresa',           value: company },
    { name: 'plataformas',       value: platforms },
    { name: 'principal_desafio', value: message },
  ].filter(f => f.value !== '');

  const hsPayload = {
    fields:  allFields,
    context: { pageUri: window.location.href, pageName: document.title },
  };

  try {
    const r    = await fetch(CEGAVI.HS_ENDPOINT, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(hsPayload),
      signal:  AbortSignal.timeout(8000),
    });
    const body = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('[Cegavi] HubSpot error', r.status, body);
      showMsg(formId, 'err', ERR.send[l] + (body.message ? ' — ' + body.message : ''));
      btn.disabled = false; btn.textContent = origTxt;
      return;
    }
  } catch (err) {
    console.error('[Cegavi] fetch error', err);
    showMsg(formId, 'err', ERR.send[l]);
    btn.disabled = false; btn.textContent = origTxt;
    return;
  }

  btn.disabled    = false;
  btn.textContent = origTxt;
  form.style.display = 'none';
  if (success) {
    success.style.display = 'block';
    const emailEl = document.getElementById('lf-success-email');
    if (emailEl) emailEl.textContent = email;
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
