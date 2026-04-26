# BloxDot SEO — Prioritized Action Plan

Ordered by **impact / effort ratio**. Each task is independently deployable.

---

## 🔴 CRITICAL — fix this week

### 1. Launch on a custom domain
**Effort:** 30 min · **Impact:** +10 score points

The `*.vercel.app` subdomain is treated by Google as a preview/staging URL. No amount of on-page SEO overcomes this.

**Steps:**
1. Register `bloxdot.com` (or confirm ownership if already held)
2. In Vercel dashboard → Project → Settings → Domains → add `bloxdot.com` + `www.bloxdot.com`
3. Vercel will give you DNS records to set at your registrar (A record for apex, CNAME for www)
4. Set the 301 redirect in Vercel so `*.vercel.app` → `bloxdot.com` (don't leave both URLs live — Google sees duplicate content)
5. After DNS propagates (usually < 1 hour), run a fresh deploy

**Needed from you:** the domain name you want to use + access to its DNS / registrar.

---

### 2. Add meta description, Open Graph, and Twitter Card tags
**Effort:** 10 min · **Impact:** +6 score points

Every link you share in WhatsApp, Slack, LinkedIn, Twitter will currently show no preview card. Every SERP appearance will have an auto-generated snippet.

**Deliverable:** I add 12 lines to `<head>`. Say the word and I'll wire:
- `<meta name="description">`
- `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`

For `og:image`, I'll use `assets/img/Hero slideshow/H1.webp` — the strongest hero shot.

---

### 3. Ship robots.txt + sitemap.xml + favicon bundle
**Effort:** 10 min · **Impact:** +5 score points

Three missing files; all quick:

**`/robots.txt`:**
```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://bloxdot.com/sitemap.xml
```

**`/sitemap.xml`:** one entry for the homepage, plus entries for the 3 project pages if you split them out (see Task 7).

**Favicon bundle:**
- `favicon.ico` (16×16, 32×32)
- `apple-touch-icon.png` (180×180)
- `icon-192.png`, `icon-512.png` for Android/PWA
- `site.webmanifest`

Easiest path: take your logo, upload to https://realfavicongenerator.net, download the generated zip, drop files in root. I can generate these from `bloxdot-logo-dark.svg` directly if you prefer.

---

### 4. Add JSON-LD structured data
**Effort:** 20 min · **Impact:** +8 score points

Three `<script type="application/ld+json">` blocks:

1. **LocalBusiness** (Lahore HQ)
2. **Organization** (with `sameAs` links to social profiles — give me the Instagram/LinkedIn URLs)
3. **ItemList of 3 Projects** (TopSpot Media, Global Bloom, HybridDot Creative)

Once these ship:
- Validate at https://validator.schema.org
- Validate at https://search.google.com/test/rich-results
- Submit site to Google Search Console

**Needed from you:**
- Social profile URLs (Instagram, LinkedIn, etc.)
- Confirmation that you want Lahore as the primary `LocalBusiness` address (vs. creating separate `LocalBusiness` entries for each city)

---

## 🟠 HIGH — fix this month

### 5. Convert project images to `<img>` tags with alt text
**Effort:** 90 min · **Impact:** +7 score points

Interior-design searches are image-driven. Currently none of your project photography is indexable by Google Image Search.

**Scope:** 15 photos across 3 projects (3 heroes + 4 grid tiles × 3). Requires:
- HTML: replace `<div class="g" style="background-image: url(...)">` with `<img>`
- CSS: tweak `.proj-grid` rules so `<img>` fills the grid cell correctly
- Alt text: write descriptive, keyword-natural alt for each

I'll draft the alt text and the CSS reshape together.

### 6. Add FAQ section + FAQPage schema
**Effort:** 45 min · **Impact:** +4 score points

Best position: between Process and Final CTA. 6–10 questions, visually styled as an accordion. FAQPage schema unlocks "People also ask" and AI Overview citations.

**Needed from you:** I'll draft 10 candidate Q&As based on the existing copy; you approve/edit.

### 7. Split 3 projects into standalone case-study pages
**Effort:** 4–6 hours · **Impact:** +6 score points + unlocks /work/* rankings

Biggest structural SEO move on the table. Each project becomes `/work/topspot-media`, `/work/global-bloom`, `/work/hybriddot-creative` with:
- Long-form narrative (what the brief was, what we did, what we learned)
- Full photo gallery (not just 4 tiles)
- `CreativeWork` + `Project` schema
- Client testimonial quote
- Next-project / back-to-work links

Each page is a separately rankable surface. Three new pages = 4× the indexable content.

Requires a small routing bump (not true SPA routing — just separate HTML files, linked from the landing page).

---

## 🟡 MEDIUM — fix this quarter

### 8. Set up GA4 + Google Search Console
**Effort:** 20 min · **Impact:** measurement infrastructure

Without this you're flying blind on organic search performance.

- GA4: create property, add measurement ID to `<head>`
- Search Console: verify domain via DNS TXT, submit sitemap

### 9. Add llms.txt for AI crawlers
**Effort:** 15 min · **Impact:** AI citation readiness

Plain-text file at `/llms.txt` describing BloxDot to LLM crawlers. Emerging standard (supported by Anthropic, others coming). Cheap to ship, compounding upside.

### 10. Self-host fonts / trim Fraunces variation axes
**Effort:** 30 min · **Impact:** LCP -100–300ms

Current `@import` in tokens.css pulls full Fraunces variable range. You use maybe 20% of those axes. Subsetting via Google Fonts URL params saves ~80 KB.

### 11. Add `srcset` on project images (post Task 5)
**Effort:** 20 min · **Impact:** mobile performance

Generate 1200w and 2400w variants, wire via `srcset`/`sizes`.

### 12. Preload hero LCP image
**Effort:** 2 min · **Impact:** LCP -200–500ms

```html
<link rel="preload" as="image"
      href="assets/img/Hero%20slideshow/H1.webp"
      fetchpriority="high">
```

Add to `<head>`. Single-line win.

---

## 🟢 LOW — backlog

### 13. Security headers (`vercel.json`)
Nice-to-have: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.

### 14. Rename asset filenames to kebab-case
`TS-grid-A (tall).webp` → `ts-grid-a-tall.webp`. Cosmetic / developer-experience.

### 15. Add AggregateRating schema (once you have reviews)
Requires Google Business reviews or Trustpilot. Triggers star snippets in SERP.

### 16. Add BreadcrumbList schema (after Task 7)
Once `/work/*` pages exist.

### 17. Translate to Urdu
If you're targeting Pakistan local search aggressively, an Urdu variant with `hreflang` tags would capture a massive underserved query space.

---

## Measurement

After each sprint, re-run:
- [pagespeed.web.dev](https://pagespeed.web.dev/) — Core Web Vitals
- [search.google.com/test/rich-results](https://search.google.com/test/rich-results) — schema
- [validator.schema.org](https://validator.schema.org) — schema validation
- [cards-dev.twitter.com/validator](https://cards-dev.twitter.com/validator) — Twitter preview
- Share link in Slack/WhatsApp → check preview

**Targets for 3-month window:**
- SEO Health Score: 39 → 80+
- Google Search Console impressions: 0 → 500/mo organic
- Leads from organic search: 0 → 3–5/mo
- Indexed pages: 1 → 5+ (homepage + 3 case studies + potential /services subpages)

---

## What I can ship right now, right here

Say "go" on any of Tasks 1–4 and I'll implement + deploy. Tasks 1, 2, 3, 4 combined = ~70 minutes of work, moves your score from 39 → ~65.

The thing that requires **you** first:
- **Task 1 (custom domain):** I need the domain name and DNS access
- **Task 4 (schema):** I need your social profile URLs

For Tasks 2, 3, and parts of 4 I can start immediately without any input.
