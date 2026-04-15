# Brandbook Alignment — Logo + Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Alinhar o site Cegavi com o brandbook v1.0: ícone SVG oficial da orelha, wordmark tricolor correto (`Ce`/`ga`/`vi`), e fonte Syne nos headings.

**Architecture:** Uma mudança centralizada em `main.css` (fonte + classes do wordmark) propagada para todos os arquivos HTML (ícone SVG + HTML do wordmark). Nenhuma lógica JS envolvida — apenas CSS e markup estático.

**Tech Stack:** HTML estático, CSS puro, Google Fonts (Syne + DM Sans)

---

## File Map

| Arquivo | O que muda |
|---|---|
| `assets/css/main.css` | @import Syne, variável `--font-display`, h1-h6 font-family, classes `.logo-ga` / `.logo-vi`, remover `.logo-i` |
| `en/index.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |
| `pt/index.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |
| `en/blog/index.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |
| `en/blog/what-is-experience-intelligence.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |
| `en/blog/_TEMPLATE.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |
| `pt/blog/index.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |
| `pt/blog/_TEMPLATE.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |
| `pt/precos.html` | SVG ícone (nav 36px + footer 28px) + wordmark HTML |

*(Excluídos: `index.html` raiz, `en/pricing.html` e `pt/precos.html` — são redirects sem HTML visível)*

---

## SVG de referência

### Ícone nav (36×36)
```html
<svg width="36" height="36" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="24" fill="#1A6BFF"/>
  <path d="M38 28 C28 28 22 36 22 50 C22 64 28 72 38 72 L38 62 C34 62 32 57 32 50 C32 43 34 38 38 38 Z" fill="#F8F7F4" opacity="0.95"/>
  <path d="M38 38 C42 38 45 43 45 50 C45 55 43 59 40 61 L40 72 C50 70 55 61 55 50 C55 39 50 28 38 28 Z" fill="#00C9A7"/>
  <path d="M62 34 Q72 42 72 50 Q72 58 62 66" stroke="#F8F7F4" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.9"/>
  <path d="M67 39 Q75 44 75 50 Q75 56 67 61" stroke="#F8F7F4" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.5"/>
  <circle cx="38" cy="50" r="4" fill="#0A0A0F"/>
</svg>
```

### Ícone footer (28×28)
```html
<svg width="28" height="28" viewBox="0 0 100 100" fill="none">
  <rect width="100" height="100" rx="24" fill="#1A6BFF"/>
  <path d="M38 28 C28 28 22 36 22 50 C22 64 28 72 38 72 L38 62 C34 62 32 57 32 50 C32 43 34 38 38 38 Z" fill="#F8F7F4" opacity="0.95"/>
  <path d="M38 38 C42 38 45 43 45 50 C45 55 43 59 40 61 L40 72 C50 70 55 61 55 50 C55 39 50 28 38 28 Z" fill="#00C9A7"/>
  <path d="M62 34 Q72 42 72 50 Q72 58 62 66" stroke="#F8F7F4" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.9"/>
  <path d="M67 39 Q75 44 75 50 Q75 56 67 61" stroke="#F8F7F4" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.5"/>
  <circle cx="38" cy="50" r="4" fill="#0A0A0F"/>
</svg>
```

### Wordmark HTML
```html
<span class="logo-ce">Ce</span><span class="logo-ga">ga</span><span class="logo-vi">vi</span>
```

---

## Task 1: Atualizar `main.css` — fonte Syne + classes do wordmark

**Files:**
- Modify: `assets/css/main.css`

- [ ] **Step 1: Adicionar @import do Syne no topo de `main.css`**

Inserir como primeira linha do arquivo (antes de qualquer comentário ou regra):
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&display=swap');
```

- [ ] **Step 2: Adicionar variável `--font-display` em `:root`**

No bloco `:root`, após a linha `--fm: 'DM Mono', ...`, adicionar:
```css
  --font-display: 'Syne', sans-serif;
```

- [ ] **Step 3: Aplicar Syne nos headings**

Localizar o bloco:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--f);
```
Alterar para:
```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
```

- [ ] **Step 4: Corrigir classes do wordmark**

Localizar e substituir o bloco completo das classes `.logo-ce`, `.logo-gav`, `.logo-i`:
```css
.logo-ce  { color: var(--ink); }
.logo-gav { color: var(--blue); }
.logo-i   { color: var(--teal); position: relative; display: inline-block; }
.logo-i::before {
  content: '';
  position: absolute;
  top: -3px; left: 0; right: 0;
  height: 2.5px;
  background: var(--teal);
  border-radius: 2px;
}
```
Por:
```css
.logo-ce { color: var(--ink); }
.logo-ga { color: var(--blue); }
.logo-vi { color: var(--teal); }
```

- [ ] **Step 5: Verificar visualmente**

Abrir qualquer página do site no browser e confirmar:
- Headings renderizando em Syne (fonte mais geométrica/pesada que DM Sans)
- Wordmark ainda aparece tricolor (mesmo que o HTML ainda use classes antigas — o CSS novo não quebra nada até o HTML ser atualizado)

- [ ] **Step 6: Commit**

```bash
git add assets/css/main.css
git commit -m "style: apply Syne to headings and fix wordmark CSS classes per brandbook"
```

---

## Task 2: Atualizar logos em `en/index.html`

**Files:**
- Modify: `en/index.html`

- [ ] **Step 1: Substituir SVG do ícone no nav (36×36)**

Localizar o SVG antigo no nav (começa com `<svg width="36" height="36" viewBox="0 0 36 36"`):
```html
<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
  <rect width="36" height="36" rx="9" fill="#1A6BFF"/>
  <ellipse cx="15" cy="18" rx="5.5" ry="5.5" fill="rgba(0,0,0,.7)"/>
  <circle cx="15" cy="18" r="2.5" fill="#00C9A7"/>
  <circle cx="15" cy="18" r="1" fill="#0A0A0F"/>
  <path d="M22 13.5C24.5 15 26 16.4 26 18s-1.5 3-4 4.5" stroke="white" stroke-width="2" stroke-linecap="round" fill="none" opacity=".9"/>
  <path d="M24 10.5C28 12.8 30.5 15.2 30.5 18s-2.5 5.2-6.5 7.5" stroke="white" stroke-width="1.5" stroke-linecap="round" fill="none" opacity=".5"/>
</svg>
```
Substituir pelo SVG da orelha 36×36 (ver seção SVG de referência acima).

- [ ] **Step 2: Corrigir wordmark HTML no nav**

Localizar: `<span class="logo-ce">Ce</span><span class="logo-gav">gav</span><span class="logo-i">i</span>`  
Substituir por: `<span class="logo-ce">Ce</span><span class="logo-ga">ga</span><span class="logo-vi">vi</span>`  
*(há 1 ocorrência no nav)*

- [ ] **Step 3: Substituir SVG do ícone no footer (28×28)**

Localizar o SVG antigo no footer (começa com `<svg width="28" height="28" viewBox="0 0 36 36"`):
```html
<svg width="28" height="28" viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="9" fill="#1A6BFF"/>...
```
Substituir pelo SVG da orelha 28×28 (ver seção SVG de referência acima).

- [ ] **Step 4: Corrigir wordmark HTML no footer**

Localizar a segunda ocorrência de `logo-gav` / `logo-i` no footer e aplicar o mesmo fix do Step 2.

- [ ] **Step 5: Commit**

```bash
git add en/index.html
git commit -m "style: update logo icon and wordmark in en/index.html per brandbook"
```

---

## Task 3: Atualizar logos em `pt/index.html`

**Files:**
- Modify: `pt/index.html`

- [ ] **Step 1: Substituir SVG nav 36×36** (mesmo processo do Task 2, Step 1)
- [ ] **Step 2: Corrigir wordmark nav** (`logo-gav`/`logo-i` → `logo-ga`/`logo-vi`)
- [ ] **Step 3: Substituir SVG footer 28×28** (mesmo processo do Task 2, Step 3)
- [ ] **Step 4: Corrigir wordmark footer**
- [ ] **Step 5: Commit**

```bash
git add pt/index.html
git commit -m "style: update logo icon and wordmark in pt/index.html per brandbook"
```

---

## Task 4: Atualizar logos em `en/blog/index.html`

**Files:**
- Modify: `en/blog/index.html`

- [ ] **Step 1: Substituir SVG nav 36×36**
- [ ] **Step 2: Corrigir wordmark nav**
- [ ] **Step 3: Substituir SVG footer 28×28**
- [ ] **Step 4: Corrigir wordmark footer**
- [ ] **Step 5: Commit**

```bash
git add en/blog/index.html
git commit -m "style: update logo icon and wordmark in en/blog/index.html per brandbook"
```

---

## Task 5: Atualizar logos em `en/blog/what-is-experience-intelligence.html`

**Files:**
- Modify: `en/blog/what-is-experience-intelligence.html`

- [ ] **Step 1: Substituir SVG nav 36×36**
- [ ] **Step 2: Corrigir wordmark nav**
- [ ] **Step 3: Substituir SVG footer 28×28**
- [ ] **Step 4: Corrigir wordmark footer**
- [ ] **Step 5: Commit**

```bash
git add en/blog/what-is-experience-intelligence.html
git commit -m "style: update logo icon and wordmark in blog article per brandbook"
```

---

## Task 6: Atualizar logos em `en/blog/_TEMPLATE.html`

**Files:**
- Modify: `en/blog/_TEMPLATE.html`

- [ ] **Step 1: Substituir SVG nav 36×36**
- [ ] **Step 2: Corrigir wordmark nav**
- [ ] **Step 3: Substituir SVG footer 28×28**
- [ ] **Step 4: Corrigir wordmark footer**
- [ ] **Step 5: Commit**

```bash
git add en/blog/_TEMPLATE.html
git commit -m "style: update logo icon and wordmark in en blog template per brandbook"
```

---

## Task 7: Atualizar logos em `pt/blog/index.html`

**Files:**
- Modify: `pt/blog/index.html`

- [ ] **Step 1: Substituir SVG nav 36×36**
- [ ] **Step 2: Corrigir wordmark nav**
- [ ] **Step 3: Substituir SVG footer 28×28**
- [ ] **Step 4: Corrigir wordmark footer**
- [ ] **Step 5: Commit**

```bash
git add pt/blog/index.html
git commit -m "style: update logo icon and wordmark in pt/blog/index.html per brandbook"
```

---

## Task 8: Atualizar logos em `pt/blog/_TEMPLATE.html`

**Files:**
- Modify: `pt/blog/_TEMPLATE.html`

- [ ] **Step 1: Substituir SVG nav 36×36**
- [ ] **Step 2: Corrigir wordmark nav**
- [ ] **Step 3: Substituir SVG footer 28×28**
- [ ] **Step 4: Corrigir wordmark footer**
- [ ] **Step 5: Commit**

```bash
git add pt/blog/_TEMPLATE.html
git commit -m "style: update logo icon and wordmark in pt blog template per brandbook"
```

---

## Task 9: Verificação final

- [ ] **Step 1: Confirmar zero ocorrências do SVG antigo**

```bash
grep -r "ellipse cx=\"15\"" . --include="*.html"
```
Resultado esperado: nenhuma linha.

- [ ] **Step 2: Confirmar zero ocorrências do wordmark antigo**

```bash
grep -r "logo-gav\|logo-i\"" . --include="*.html"
```
Resultado esperado: nenhuma linha.

- [ ] **Step 3: Confirmar classes novas presentes em todos os arquivos**

```bash
grep -r "logo-ga\b" . --include="*.html" | wc -l
```
Resultado esperado: ≥ 8 linhas.

- [ ] **Step 4: Verificar visualmente no browser**

Abrir `en/index.html` localmente e confirmar:
- Ícone da orelha azul com ondas no nav e footer
- Wordmark: **Ce** (preto) **ga** (azul) **vi** (teal)
- Headings em Syne (mais geométrico e pesado que antes)

- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "style: brandbook alignment complete — logo icon, wordmark, Syne headings"
```
