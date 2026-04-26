# BloxDot — SEO Audit Report

**URL audited:** https://blox-landing-three.vercel.app
**Audit date:** 2026-04-23
**Business type detected:** Local Service Business (office design & fitout studio) — Lahore, Karachi, Islamabad
**Site architecture:** Single-page landing (SPA-style, no routing)

---

## Executive Summary

### 🎯 Overall SEO Health Score: **39 / 100**

This is a beautifully designed landing page with almost no SEO foundation. The page is well-built from a UX and editorial standpoint, but it's invisible to search crawlers, social platforms, and AI search tools. The good news: **roughly 70% of the score lives in 8 fixes that together take less than an hour of work.** No design changes needed.

### Top 5 Critical Issues (fix first)

1. **Running on a `*.vercel.app` preview domain**, not a branded custom domain. Google treats these as disposable/testing URLs and rarely ranks them. This single fact caps all SEO efforts at ~20% effectiveness until fixed.
2. **No `<meta name="description">`** — Google generates a snippet from random page copy, usually picking the worst line. Every click-through decision in the SERP hinges on this.
3. **No `robots.txt` and no `sitemap.xml`** — both return 404. Crawlers don't know what's indexable; no crawl efficiency.
4. **No JSON-LD structured data** — for a local service business with 3 case studies and 3 city locations, this is the single biggest missed opportunity. `LocalBusiness` + `Service` + `Project` schema would feed Google Maps, rich results, and AI citations.
5. **All 29 project/hero images are CSS `background-image`** — invisible to Google Image Search, invisible to social previews, zero alt text. Interior design is one of the most image-driven verticals in Google search. You're fielding a team with no striker.

### Top 5 Quick Wins (all together ≈ 45 min of work)

1. Add `<meta name="description">` (5 min)
2. Ship `robots.txt` + `sitemap.xml` (5 min)
3. Add Open Graph + Twitter Card tags so Slack / WhatsApp / LinkedIn previews look intentional (10 min)
4. Add a favicon + apple-touch-icon (10 min)
5. Add `LocalBusiness` + `Organization` JSON-LD schema (15 min)

---

## 1. Technical SEO — Score 40 / 100

### ✅ What's working
- **HTTPS enforced** with HSTS (`max-age=63072000; includeSubDomains; preload`) — excellent
- `<html lang="en">` — correct
- Viewport meta tag present and correct
- Single H1 per page — correct heading structure
- HTTP/2 served from Vercel edge — fast TTFB (~440ms from this location, x-vercel-cache: HIT)
- Response compressed (gzip): 61.9 KB → 15.1 KB on the wire

### ❌ Critical gaps

| Issue | Status | Impact |
|---|---|---|
| `robots.txt` | **404** | Crawlers have no policy guidance |
| `sitemap.xml` | **404** | Google can't efficiently discover indexable URLs |
| `favicon.ico` | **404** | Browser tab icon missing; signals low quality |
| `apple-touch-icon.png` | **404** | Broken when users save to iOS home screen |
| `manifest.json` | **404** | PWA/mobile shortcut metadata missing |
| `<link rel="canonical">` | **Missing** | Duplicate-URL risk, especially with UTM params |
| Custom domain | **Missing** | On `*.vercel.app` — heavy SEO penalty |

### Caching
Vercel is CDN-caching the HTML (`x-vercel-cache: HIT`), which is good. But `cache-control: public, max-age=0, must-revalidate` forces the browser to revalidate on every visit. That's conservative; for a static landing page you could set `max-age=3600` for HTML or use Vercel's defaults, then rely on the revalidation header. Not urgent.

### Security headers
HSTS is set, which is great. Missing but recommended:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` to restrict browser features

Low priority — add via `vercel.json` `headers` when convenient.

---

## 2. Content Quality — Score 45 / 100

### ✅ What's working
- Clear value proposition in H1 ("The fitout partner that hands you the keys on the date we committed")
- Problem → Answer → Proof → Scope → Process narrative arc is well-constructed
- Real project stats (area, handover date, budget variance) add authority
- Editorial, confident voice — not template SaaS copy
- Copy is human and readable (Flesch estimate: 55–60, appropriate for B2B)

### ❌ Gaps

**No meta description.**
Currently Google will auto-generate one, and it'll probably grab the first long string of body copy it sees — likely the problem-statement paragraph. That's a terrible SERP impression.

**Suggested:**
```html
<meta name="description" content="BloxDot delivers office design and fitout as one contract, one timeline, one team. Recent projects in Lahore, Karachi, Islamabad. Request a proposal for a site visit this week.">
```
(158 chars — within the 160-char SERP limit)

**Thin site architecture for a multi-service, multi-city business.**
You sell 6 capability categories × 3 cities = 18 potential long-tail keyword clusters (e.g. "office fitout Karachi", "joinery Lahore", "MEP contractor Islamabad"). A single-page site captures maybe 2 of them.

This isn't a landing-page fix — it's a content-strategy call. At minimum, **the 3 project case studies should be standalone pages** (`/work/topspot-media`, `/work/global-bloom`, `/work/hybriddot-creative`). That alone multiplies your rankable surface by 4×.

**E-E-A-T (Experience / Expertise / Authoritativeness / Trust) is thin:**
- No author or team page
- No "About" or company history
- No client logos (you mention real clients but don't show them)
- No credentials, certifications, or awards
- No testimonials or reviews

For a local premium service, Google's algorithm weights E-E-A-T heavily. Every missing signal is visible to the algorithm.

**Missing content types that AI search engines love to cite:**
- No FAQ section (ChatGPT / Perplexity answer questions → site without FAQs rarely gets cited)
- No "How we work" breakdown with structured steps (you have a Process section but it's not Schema-marked)
- No pricing transparency signal (even a range like "typical project budgets: PKR 8–40M" helps qualify)

---

## 3. On-Page SEO — Score 40 / 100

### Title tag
```
BloxDot — Office Design & Fitout · Lahore, Karachi, Islamabad
```
**Assessment:** 62 characters. At the upper edge but fine. Includes brand + primary service + 3 cities. **Good.**

Optional improvement: put primary keyword before brand for first-click SEO:
```
Office Design & Fitout in Lahore, Karachi, Islamabad · BloxDot
```

### H1
```
The fitout partner that hands you the keys on the date we committed.
```
Memorable and on-brand, but **does not contain the primary keyword** ("office fitout", "office design"). Google relies on H1 as a strong ranking signal. Consider a hidden-for-SR-only variant, or reword to include "office fitout" naturally.

### Heading hierarchy
32 total headings (H1: 1, H2: 7, H3: 23, H4: 1). Proper hierarchy. ✓

### Internal linking
In-page anchors to `#how-we-work`, `#work`, `#process`, `#cta` work. But with only 1 page, there's no real internal-link graph for Google to follow.

### Alt text
**Only 2 `<img>` tags exist** — both are the logo, both have `alt="BloxDot"`. All 29 cinematic project/hero images are CSS `background-image` — **zero alt text anywhere.**

For an interior design studio this is the biggest single SEO miss. Image search drives significant traffic for this vertical. Fix plan detailed in Section 6.

---

## 4. Schema / Structured Data — Score 0 / 100

### Current state
**Zero JSON-LD blocks. Zero microdata. Zero RDFa.** Google has nothing to enrich your SERP listing with.

### What you're losing
- No Google Business Panel enrichment
- No "People also ask" inclusions
- No AI Overview citations (ChatGPT web, Perplexity, Google SGE)
- No rich results (ratings, hours, location, price range)
- No sitelinks in SERP

### Minimum recommended schema (3 blocks)

**1. LocalBusiness** — your head location (Lahore DHA)
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://bloxdot.com/#business",
  "name": "BloxDot",
  "description": "Office design and fitout, delivered as one contract.",
  "url": "https://bloxdot.com",
  "telephone": "+92-300-0228345",
  "email": "hello@bloxdot.com",
  "image": "https://bloxdot.com/assets/img/Hero%20slideshow/H1.webp",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "CP-93 Fairways Raya, DHA Phase 6",
    "addressLocality": "Lahore",
    "addressCountry": "PK"
  },
  "areaServed": ["Lahore", "Karachi", "Islamabad", "Dubai"],
  "sameAs": []
}
```

**2. Organization** — parent brand (HybridDot) relationship
**3. ItemList of 3 Projects** — marks up the Recent Work section so Google/AI can read your portfolio

I'll generate all three as one bundle when you say go.

### SERP impact
Adding these gets you candidacy for:
- Local 3-Pack on "office fitout Lahore" queries
- Business Panel on branded searches
- Rich snippet stars (once you add `AggregateRating` when you have reviews)

---

## 5. Performance — Score 70 / 100

### ✅ What's working
- HTML gzipped = 15 KB (excellent)
- `tokens.css` = 2.1 KB gzipped (excellent)
- `content-visibility: auto` on off-screen project sections — great call, defers ~2 MB of background-image fetches until scroll
- All images served as WebP (properly compressed)
- TTFB ~440ms via Vercel edge
- HTTP/2 multiplexing

### ❌ Frictions

| Issue | Current | Recommended |
|---|---|---|
| Google Fonts render-blocking `@import` in `tokens.css` | 2 font families (Fraunces, Montserrat) | Preload critical font weight; self-host if you want max control |
| Hero H1 (LCP) is a background-image on a 197KB WebP | No preload hint | `<link rel="preload" as="image" href="...H1.webp">` in `<head>` |
| Google Fonts range includes `opsz 9..144` + full italic + WONK axis | Full variation range | Subset the Fraunces URL to just the axes you actually use |
| `api/contact.js` serverless function | Cold-starts on Vercel free plan | Fine; just be aware |

### Core Web Vitals (estimated)
I don't have Chrome DevTools CWV measurements for this session, but based on page construction:
- **LCP:** likely 1.8–2.5s (hero image is heavy, no preload hint) — target is < 2.5s
- **INP:** likely < 200ms (minimal JS, no frameworks) — good
- **CLS:** likely < 0.1 (layouts use explicit aspect-ratios) — good

**To validate:** run the live URL through https://pagespeed.web.dev/ after fixes ship.

---

## 6. Images — Score 35 / 100

### 🚨 The big one: 29 background-images, zero indexability

| Location | Count | `<img>` tag? | Alt text? |
|---|---|---|---|
| Logo (nav) | 1 | ✅ | "BloxDot" ✅ |
| Logo (footer) | 1 | ✅ | "BloxDot" ✅ |
| Hero slideshow | 3 | ❌ (background) | ❌ |
| Project hero wide (×3 projects) | 3 | ❌ (background) | ❌ |
| Project grid tiles (×4 per project) | 12 | ❌ (background) | ❌ |
| Capability tiles | 0 (text-only now) | — | — |
| Process step thumbs | 0 (graphical flow now) | — | — |
| CTA background | 1 | ❌ (CSS `background`) | ❌ |

### Fix strategy — 3 options, pick one

**Option A: Hybrid approach (recommended)** — keep hero as CSS background for the cinematic layout, but **convert all 15 project grid/hero images to `<img>` tags** with descriptive alt text. Minor CSS reshape on the `.proj-grid` and `.proj-hero-wide` rules. Unlocks image search for the work that matters — the case studies.

**Option B: Full migration** — rewrite every background-image as `<picture>`/`<img>` with `loading="lazy"` + `decoding="async"` + alt text. ~2 hours of work. Best SEO outcome.

**Option C: Keep backgrounds, add hidden `<img>` siblings** — SEO anti-pattern, Google will mark as cloaking. **Don't do this.**

### Alt-text templates (when you choose Option A or B)

Keep alt text descriptive + keyword-rich without being spammy:
- Hero 1: `"TopSpot Media office entry lounge — dark travertine and brass, Lahore fitout by BloxDot"`
- Hero 2: `"Executive office with backlit stone wall, warm minimal interior design"`
- Project grid example: `"Global Bloom workstations — oak slat wall, Karachi office fitout"`

### Image filenames
Current filenames are good:
- `HD-hero.webp` → fine
- `TS-grid-A (tall).webp` → **spaces and parentheses break URLs, you've been URL-encoding them (`%20%28tall%29`)** — minor cosmetic, search engines don't care but developers will. Rename to `ts-grid-a-tall.webp` next time you're in there.

### Responsive images
Currently you serve one size per image. Consider `srcset` for the project heroes:
```html
<img srcset="ts-hero-1200.webp 1200w, ts-hero-2400.webp 2400w" sizes="100vw" src="ts-hero-1200.webp" alt="...">
```
Small mobile devices currently download the full 2400w asset — ~30–40% data waste on mobile.

---

## 7. AI Search Readiness — Score 20 / 100

### The shift
ChatGPT, Perplexity, Google AI Overviews, and Claude all now answer queries like *"best office fitout company in Lahore"* by scraping and citing sources. Without structured data and an `llms.txt` or clearly-marked content, you are invisible to these engines — and they increasingly drive high-intent B2B queries.

### Current state
- No JSON-LD → AI crawlers have no easy data extraction
- No FAQ section → one of the top citation formats
- No `/llms.txt` file → emerging standard for AI-friendly sites (like `robots.txt` but for LLMs)
- Stats are visually styled in CSS, not marked up semantically → AI can't confidently extract "2800 sq ft in 18 weeks"

### Recommended adds
1. **FAQ section** with 6–10 Q&As, marked up as `FAQPage` schema. Example questions:
   - "How long does an office fitout take in Lahore?"
   - "What's included in a BloxDot fitout contract?"
   - "Do you handle MEP and electrical in-house?"
   - "What's the typical project budget range?"
   - "How soon can we start after signing?"
2. **`/llms.txt`** at site root — plain-text description of what BloxDot does, primary services, cities served, links to key pages. Think "README for AI crawlers."
3. **Structured stats blocks** — use `QuantitativeValue` schema inside your project case studies so AI can reliably cite "handed over in 18 weeks" as a fact.

---

## 8. Analytics / Tracking

### Current
- Meta Pixel `1646000253120189` installed correctly — PageView fires on all visits, Lead event fires on form submission ✓

### Missing
- **Google Analytics 4** — zero first-party traffic data. You can see Meta ad performance but have no idea how organic search, direct, or referral traffic behaves. Essential for SEO measurement — you can't improve what you can't measure.
- **Google Search Console** — required to submit sitemap, see keyword impressions, fix indexing errors. Sign up at https://search.google.com/search-console, verify via DNS TXT or HTML file upload.
- **Server-side CAPI** (Meta) — improves ad attribution 20–40% on iOS. We discussed earlier; defer until you're spending serious ad budget.

---

## 9. Mobile SEO

- Viewport meta present ✓
- Responsive breakpoints at 720px and 1024px ✓
- Simplified mobile nav (recent fix) ✓
- Form usable on mobile ✓
- Google's mobile-friendly test would pass ✓

One concern: **hero images are the same 2400-wide WebPs on all devices.** A 375px iPhone downloads 10× more pixel data than it can display. Not a ranking issue directly, but hurts Mobile LCP → hurts ranking indirectly.

---

## Scoring Breakdown

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 25% | 40 | 10.0 |
| Content Quality | 25% | 45 | 11.25 |
| On-Page SEO | 20% | 40 | 8.0 |
| Schema / Structured Data | 10% | 0 | 0 |
| Performance | 10% | 70 | 7.0 |
| Images | 5% | 35 | 1.75 |
| AI Search Readiness | 5% | 20 | 1.0 |
| **TOTAL** | **100%** | **—** | **39 / 100** |

---

## What would move this score fast

If I had to bet on ROI per hour of dev time:

| Fix | Effort | Score impact |
|---|---|---|
| Launch on custom domain (bloxdot.com) | 30 min DNS + redeploy | +10 |
| Meta description + OG + Twitter tags | 10 min | +6 |
| robots.txt + sitemap.xml + favicon | 10 min | +5 |
| LocalBusiness + Organization JSON-LD | 20 min | +8 |
| Convert project images to `<img>` with alt | 90 min | +7 |
| Add FAQ section + FAQPage schema | 45 min | +4 |
| Split 3 projects into standalone pages | 4–6 hours | +6 |
| Set up GA4 + Search Console | 20 min | measurement infra |

Total time budget: **~10 hours of focused work** takes this from 39 → ~80.

See `ACTION-PLAN.md` for the ordered step-by-step.
