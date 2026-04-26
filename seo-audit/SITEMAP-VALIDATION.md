# Sitemap Validation Report — bloxdot.com

**Date:** 2026-04-27
**File audited:** `/sitemap.xml`
**URL count:** 18
**Mode:** Analyze existing sitemap

---

## Verdict

**Status:** Healthy. Two minor items worth addressing, neither blocking.

The sitemap is well-formed, every URL has a canonical that matches, no noindex/redirected URLs are listed, and `robots.txt` references it correctly. Comfortably within the 50,000-URL limit (no index file needed).

---

## What passes

| Check | Result |
|---|---|
| Valid XML, correct `urlset` namespace | Pass |
| URL count under 50k (18 URLs) | Pass |
| HTTPS only, no HTTP URLs | Pass |
| Sitemap referenced in `robots.txt` line 20 | Pass |
| All 18 sitemap URLs exist on disk | Pass |
| Canonical of each page matches sitemap URL | Pass |
| No noindexed URLs in sitemap | Pass |
| No redirected URLs in sitemap (5 legacy redirects in `vercel.json` are not listed) | Pass |
| `lastmod` dates are varied and recent (2026-04-24 → 2026-04-27) | Pass |
| Trailing-slash convention matches `vercel.json` `trailingSlash: false` | Pass |
| Clean URLs (no `.html` suffix) match `cleanUrls: true` | Pass |

---

## Issues

### 1. `<priority>` and `<changefreq>` on every URL — Info

Google has publicly ignored both tags for years; Bing also deprecated them. They add ~40% file size with no SEO benefit, and a stale `changefreq=monthly` can quietly mismatch reality (e.g. `/projects/*` carries `yearly` but project pages were last touched two days ago).

**Recommendation:** Remove both tags from every `<url>`. The remaining `<loc>` + `<lastmod>` pair is what crawlers actually use. This is purely a cleanup task, not a ranking issue.

### 2. `/blog/template/index.html` is publicly reachable but unfinished — Medium

The file exists on disk and has no `noindex` directive. Because `cleanUrls: true` is set in `vercel.json`, Vercel will serve it at `https://bloxdot.com/blog/template`. It's a scaffold full of placeholder copy ("Post title", "Short summary of the post…"). It is correctly **not** in the sitemap, but Google can still discover it via internal links or a manual URL hit, and indexing a placeholder page hurts site quality signals.

**Recommendation — pick one:**
- Add `<meta name="robots" content="noindex,nofollow">` to `blog/template/index.html`, **or**
- Add `Disallow: /blog/template` to `robots.txt`, **or**
- Move the template outside the deploy root (rename the folder to `_template` so Vercel stops serving it under a clean URL — Vercel ignores leading-underscore folders only if you mark them; safest is the meta tag).

The meta-tag fix is one line and is the most robust. I'd do that.

### 3. No blog posts in the sitemap yet — Info, not an issue

Worth flagging only because the `blog/template/` checklist explicitly says "Add the post to /sitemap.xml". When the first real post ships, drop a `<url>` block into `sitemap.xml` between `/projects` and `/projects/greystone-villa`. Future-you will thank you for the reminder.

---

## File size reference

- Current: 18 URLs, all six tags per URL, ~3.0 KB
- After removing `<priority>` and `<changefreq>`: ~1.7 KB (≈40% smaller)
- Both versions are trivially small; the cleanup is for tidiness, not bandwidth.

---

## Suggested cleanup (apply if you agree)

Slim `<url>` block — keep only `<loc>` and `<lastmod>`:

```xml
<url>
  <loc>https://bloxdot.com/architecture</loc>
  <lastmod>2026-04-27</lastmod>
</url>
```

If you want, I can:
1. Strip `<priority>` and `<changefreq>` from all 18 URLs.
2. Add `noindex` to `blog/template/index.html`.

Both are one-shot edits.
