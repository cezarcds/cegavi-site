# Cegavi — Site

Static HTML site with bilingual support (EN/PT) optimized for SEO.

## Structure

```
/                       → language redirect (JS + noscript)
/en/                    → English home
/en/blog/               → English blog index
/en/blog/_TEMPLATE.html → Template for new EN articles
/en/pricing.html        → Pricing (redirects to home#pricing)
/pt/                    → Portuguese home
/pt/blog/               → Portuguese blog index
/pt/blog/_TEMPLATE.html → Template for new PT articles
/assets/css/main.css    → Shared design system
/assets/js/main.js      → Shared JS (nav, form)
/assets/img/            → Images (add here)
```

## Adding a new article

### English
1. Copy `/en/blog/_TEMPLATE.html` → `/en/blog/your-slug.html`
2. Edit the 7 `EDIT:` fields at the top
3. Replace content between `<article>` tags
4. Add card to `/en/blog/index.html`

### Portuguese
1. Copy `/pt/blog/_TEMPLATE.html` → `/pt/blog/seu-slug.html`
2. Same process as above
3. Add card to `/pt/blog/index.html`

## Deploy to Vercel

```bash
# First deploy
npm i -g vercel
vercel --prod

# Subsequent deploys (auto via GitHub)
git add . && git commit -m "add article" && git push
```

## Deploy to GitHub Pages

1. Push to GitHub
2. Settings → Pages → Source: Deploy from branch → main → / (root)
3. Add custom domain cegavi.com

## SEO checklist for each new article

- [ ] Unique `<title>` (60 chars max)
- [ ] Unique `<meta description>` (155 chars max)
- [ ] Correct `<link rel="canonical">`
- [ ] Both `hreflang` links (EN ↔ PT)
- [ ] OG tags for social sharing
- [ ] `datePublished` in JSON-LD
- [ ] Cover image with `alt` text
- [ ] Internal link to `/en/#demo` or `/pt/#demo`

## Changing form endpoint

In `/assets/js/main.js`, update:
- `CEGAVI.API` → your backend URL
- `CEGAVI.FORMSPREE` → your Formspree form ID

## Content guide

All translatable content uses the shared CSS from `/assets/css/main.css`.
Available components: `.badge`, `.btn`, `.card`, `.section-label`, `.callout`, `.blockquote`, `.article-cta`, `.blog-card`
