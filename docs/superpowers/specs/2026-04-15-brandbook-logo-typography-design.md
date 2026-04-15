# Cegavi — Brandbook Alignment: Logo + Typography
**Date:** 2026-04-15
**Scope:** Abordagem 1-B — Logo ícone, wordmark split, Syne nos headings

---

## Objetivo

Alinhar o site Cegavi com o brandbook oficial (v1.0) nos seguintes pontos:
1. Substituir o ícone SVG genérico (olho/elipse) pelo ícone oficial da orelha com ondas sonoras
2. Corrigir o split tricolor do wordmark: `Ce` / `ga` / `vi` (atualmente `Ce` / `gav` / `i`)
3. Aplicar a fonte Syne (ExtraBold/Bold) nos headings, conforme o brandbook

---

## Arquivos afetados

### `assets/css/main.css`
- Adicionar `@import` do Google Fonts para Syne (`wght@600;700;800`) no topo
- Adicionar `--font-display: 'Syne', sans-serif` em `:root`
- Aplicar `font-family: var(--font-display)` em `h1, h2, h3, h4, h5, h6`
- Renomear classe `.logo-gav` → `.logo-ga` (cobre só "ga", cor `var(--blue)`)
- Adicionar classe `.logo-vi` (cobre "vi", cor `var(--teal)`)
- Remover `.logo-i` e seu `::before` pseudo-elemento (dot especial)

### 10 arquivos HTML (nav + footer em cada um)
Arquivos: `en/index.html`, `pt/index.html`, `en/blog/index.html`, `en/blog/what-is-experience-intelligence.html`, `en/blog/_TEMPLATE.html`, `pt/blog/index.html`, `pt/blog/_TEMPLATE.html`, `pt/precos.html`  
(Excluídos: `index.html` raiz e `en/pricing.html` — são apenas redirects sem conteúdo)

**Em cada arquivo:**

1. **Ícone SVG** — trocar o SVG antigo (36×36 com ellipse/circle olho):
```html
<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
  <rect width="36" height="36" rx="9" fill="#1A6BFF"/>
  <ellipse cx="15" cy="18" rx="5.5" ry="5.5" fill="rgba(0,0,0,.7)"/>
  ...
</svg>
```
Pelo ícone oficial do brandbook (36×36, viewBox 0 0 100 100, orelha + ondas):
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
*(O footer usa width/height="28", mantendo viewBox 0 0 100 100)*

2. **Wordmark HTML** — trocar:
```html
<span class="logo-ce">Ce</span><span class="logo-gav">gav</span><span class="logo-i">i</span>
```
Por:
```html
<span class="logo-ce">Ce</span><span class="logo-ga">ga</span><span class="logo-vi">vi</span>
```

---

## Resultado visual esperado

- Headings (`h1`, `h2`, `h3`) renderizados em Syne Bold/ExtraBold — mais personalidade e peso visual, conforme o brandbook
- Ícone da orelha com ondas sonoras no nav e footer de todas as páginas
- Wordmark tricolor correto: **Ce** (preto) **ga** (azul) **vi** (teal)

---

## Fora de escopo

- Cores (teal `#00A98B` permanece — não é escopo B)
- Fundo Paper `#F8F7F4` — não é escopo B
- Qualquer outra mudança de layout ou conteúdo
