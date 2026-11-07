// Runs after `vite build`. Pulls content from Sanity and writes crawlable HTML:
//  - dist/<slug>/index.html for every service/city page (own title, description, canonical, text)
//  - static text inside dist/index.html for the home page
//  - dist/sitemap.xml with all pages
// React replaces the static text once it loads, so visitors see the normal app.
// If Sanity is unreachable the build still succeeds (pages just stay client-rendered).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(ROOT, "dist");
const SITE = "https://www.verdictnexus.in";
const API = "https://urj7gol0.api.sanity.io/v2024-01-01/data/query/production";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const paras = (t) => (t ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

async function q(query) {
  const res = await fetch(`${API}?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  return (await res.json()).result;
}

function setMeta(html, { title, description, url }) {
  const rep = (re, val) => (re.test(html) ? (html = html.replace(re, val)) : html);
  rep(/<title>.*?<\/title>/s, () => `<title>${esc(title)}</title>`);
  rep(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => a + esc(description) + b);
  rep(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + url + b);
  rep(/(<meta property="og:title" content=")[^"]*(")/, (_, a, b) => a + esc(title) + b);
  rep(/(<meta property="og:description" content=")[^"]*(")/, (_, a, b) => a + esc(description) + b);
  rep(/(<meta property="og:url" content=")[^"]*(")/, (_, a, b) => a + url + b);
  return html;
}

const inject = (html, body, extraHead = "") =>
  html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`).replace("</head>", () => `${extraHead}</head>`);

function pageBody(p, links) {
  const sections = (p.sections ?? [])
    .map(
      (s) =>
        `<section><h2>${esc(s.heading)}</h2>${paras(s.body).map((x) => `<p>${esc(x)}</p>`).join("")}` +
        ((s.points ?? []).length ? `<ul>${s.points.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : "") +
        `</section>`,
    )
    .join("");
  const faqs = (p.faqs ?? []).length
    ? `<section><h2>Frequently asked questions</h2>${p.faqs
        .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
        .join("")}</section>`
    : "";
  const rel = links
    .filter((l) => l.slug !== p.slug)
    .map((l) => `<li><a href="/${esc(l.slug)}">${esc(l.title)}</a></li>`)
    .join("");
  return (
    `<main><article><nav><a href="/">Home</a> / ${esc(p.title)}</nav><h1>${esc(p.h1)}</h1>` +
    paras(p.intro).map((x) => `<p>${esc(x)}</p>`).join("") +
    sections +
    faqs +
    `<section><h2>Other areas and locations</h2><ul>${rel}</ul></section>` +
    (p.note ? `<p>${esc(p.note)}</p>` : "") +
    `</article></main>`
  );
}

function faqLd(faqs = []) {
  if (!faqs.length) return "";
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

async function main() {
  const base = readFileSync(resolve(DIST, "index.html"), "utf8");

  const [pages, hero, settings, areas, faq, contact] = await Promise.all([
    q(`*[_type=="landingPage"] | order(order asc){ title, "slug": slug.current, seoTitle, seoDescription, h1, intro, note,
         "sections": coalesce(sections, [])[]{ heading, body, "points": coalesce(points, []) }, "faqs": coalesce(faqs, []) }`),
    q(`*[_id=="heroSection"][0]`),
    q(`*[_id=="siteSettings"][0]`),
    q(`*[_id=="practiceAreasSection"][0]`),
    q(`*[_id=="faqSection"][0]`),
    q(`*[_id=="contactSection"][0]`),
  ]);

  const links = pages.map((p) => ({ title: p.title, slug: p.slug }));

  // --- service / city pages
  for (const p of pages) {
    let html = setMeta(base, { title: p.seoTitle, description: p.seoDescription, url: `${SITE}/${p.slug}` });
    html = inject(html, pageBody(p, links), faqLd(p.faqs));
    const dir = resolve(DIST, p.slug);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "index.html"), html);
  }

  // --- home page
  const homeBody =
    `<main><h1>${esc(hero.headingLine1)} ${esc(hero.headingLine2)}</h1><p>${esc(hero.description)}</p>` +
    `<section><h2>${esc(areas.title)}</h2><ul>${(areas.areas ?? [])
      .map((a) => `<li><h3>${esc(a.title)}</h3><p>${esc(a.description)}</p></li>`)
      .join("")}</ul></section>` +
    `<section><h2>${esc(faq.title)}</h2>${(faq.faqs ?? [])
      .map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`)
      .join("")}</section>` +
    `<section><h2>${esc(contact.title)}</h2><ul>${(contact.items ?? [])
      .map((i) => `<li><strong>${esc(i.title)}</strong>: ${esc(i.content)}</li>`)
      .join("")}</ul></section>` +
    `<nav><h2>Areas of practice by location</h2><ul>${links
      .map((l) => `<li><a href="/${esc(l.slug)}">${esc(l.title)}</a></li>`)
      .join("")}</ul></nav></main>`;
  let home = setMeta(base, { title: settings.seoTitle, description: settings.seoDescription, url: `${SITE}/` });
  home = inject(home, homeBody);
  writeFileSync(resolve(DIST, "index.html"), home);

  // --- sitemap
  const today = new Date().toISOString().slice(0, 10);
  const urls = [`${SITE}/`, ...pages.map((p) => `${SITE}/${p.slug}`)];
  writeFileSync(
    resolve(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n") +
      `\n</urlset>\n`,
  );

  console.log(`Prerendered home + ${pages.length} pages, sitemap updated.`);
}

main().catch((e) => {
  console.warn("Prerender skipped:", e.message);
});
