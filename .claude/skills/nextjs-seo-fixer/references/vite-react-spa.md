# Vite / Create-React-App SPA SEO (react-router)

Use this instead of the Next.js patterns when package.json has `vite` or `react-scripts` and no `next`.
In an SPA every route shares one index.html, so titles/descriptions must be set per route in JavaScript.
Google renders JavaScript, so this works, but keep the most important signals in index.html too.

## Hard rules for SPA fixes
- Do NOT add npm packages (no react-helmet, no prerender plugins). Use the small hook below.
- Keep the router, layout and design unchanged. Only add SEO pieces.
- `npm run build` (vite build) must still pass.

## 1. Per-page meta hook — src/lib/usePageMeta.ts
```ts
import { useEffect } from "react";

const SITE_URL = "https://www.example.com"; // take the real domain from index.html og:url / canonical

type Meta = { title: string; description: string; path: string; image?: string };

function setTag(selector: string, attr: string, key: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(selector.startsWith("link") ? "href" : "content", value);
}

export function usePageMeta({ title, description, path, image }: Meta) {
  useEffect(() => {
    const url = SITE_URL + path;
    document.title = title;
    setTag('meta[name="description"]', "name", "description", description);
    setTag('link[rel="canonical"]', "rel", "canonical", url);
    setTag('meta[property="og:title"]', "property", "og:title", title);
    setTag('meta[property="og:description"]', "property", "og:description", description);
    setTag('meta[property="og:url"]', "property", "og:url", url);
    if (image) setTag('meta[property="og:image"]', "property", "og:image", SITE_URL + image);
  }, [title, description, path, image]);
}
```
Call it at the top of each page component:
```tsx
usePageMeta({ title: "Criminal Lawyer in Greater Noida | Verdict Nexus", description: "...", path: "/criminal-law" });
```
Each route gets a unique title (50–60 chars, keyword first, brand last) and description (140–160 chars).

## 2. index.html (default for the home page and for crawlers that don't run JS)
- Strong home title/description with service + city.
- `<link rel="canonical" href="https://domain/">`, absolute og:image URL (not `/Images/...`).
- Remove `meta keywords` only if asked; it is ignored by Google but harmless.
- JSON-LD in a `<script type="application/ld+json">`: for law firms use `LegalService` (or `Attorney`), for others the matching LocalBusiness type, with name, url, logo, telephone, address (PostalAddress), openingHoursSpecification, areaServed, sameAs. Use only facts already on the site.

## 3. public/robots.txt
```
User-agent: *
Allow: /
Disallow: /admin
Sitemap: https://domain/sitemap.xml
```
Always disallow admin / dashboard / login routes that exist in the router.

## 4. public/sitemap.xml
Static file listing every real route from the router (src/App.tsx or routes file), absolute URLs, `<lastmod>` = today. Skip 404/admin/thank-you routes.
If two routes render the same page (e.g. `/` and `/Home`), list only one in the sitemap and set the
duplicate's canonical to the main URL with usePageMeta (path of the main URL). Update it whenever routes are added.

## 5. Content in the components
- One `<h1>` per page, keyword + city naturally; semantic `<main>`, `<section>`, `<footer>`.
- Links between pages must be react-router `<Link to="...">` (real `<a href>`), not onClick navigation.
- `<img>` needs meaningful `alt`, plus `width`/`height` and `loading="lazy"` below the fold.
- NAP (name, address, phone) identical everywhere; phone as `tel:` link.

## 6. Hosting notes
- On **Vercel**, an SPA needs `vercel.json` in the repo root, otherwise opening a deep link directly
  (e.g. /orders) returns 404 and Google cannot index it. If it is missing, add:
  `{ "rewrites": [ { "source": "/(.*)", "destination": "/index.html" } ] }`
  (Vercel serves real files like robots.txt and sitemap.xml before applying rewrites.)
- On Apache hosting (Hostinger shared), deep links need `public/.htaccess` rewriting to index.html. Only add it if the repo clearly deploys to Apache and has no routing fallback; mention it in the report instead of guessing.
- Suggest (do not implement) prerendering for better SEO in the future.
