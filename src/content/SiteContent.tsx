import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import defaults from "./defaults.json";

export type SiteContent = typeof defaults;

// Requests go through a same-origin proxy (see vercel.json / vite.config.ts)
const API = "/sanity-api/v2024-01-01/data/query/production";

const img = (k: string) => `"${k}": ${k}.asset->url`;

const QUERY = `{
  "siteSettings": *[_id=="siteSettings"][0]{
    ..., ${img("navbarLogo")}, ${img("footerLogo")}, ${img("favicon")}, ${img("shareImage")}
  },
  "heroSection": *[_id=="heroSection"][0]{ ..., ${img("image")} },
  "clientsSection": *[_id=="clientsSection"][0]{ ..., clients[]{ name, ${img("logo")} } },
  "practiceAreasSection": *[_id=="practiceAreasSection"][0]{ ..., areas[]{ title, description, ${img("icon")} } },
  "teamSection": *[_id=="teamSection"][0]{ ..., members[]{ name, role, bio, ${img("photo")} } },
  "faqSection": *[_id=="faqSection"][0],
  "contactSection": *[_id=="contactSection"][0]{ ..., items[]{ title, content, ${img("icon")} } },
  "disclaimerSection": *[_id=="disclaimerSection"][0]
}`;

const imgUrl = (u?: string | null) =>
  u && u.startsWith("https://cdn.sanity.io") ? `${u}?auto=format` : u ?? "";

/** Use CMS value when present, otherwise keep the built-in default. */
function merge<T>(base: T, incoming: unknown): T {
  if (incoming === null || incoming === undefined) return base;
  if (Array.isArray(base) || Array.isArray(incoming)) return incoming as T;
  if (typeof base === "object" && base !== null && typeof incoming === "object") {
    const out: Record<string, unknown> = { ...(base as object) };
    for (const [k, v] of Object.entries(incoming as object)) {
      if (k.startsWith("_")) continue;
      out[k] = merge((base as Record<string, unknown>)[k], v);
    }
    return out as T;
  }
  return incoming as T;
}

const IMAGE_KEYS = new Set(["navbarLogo", "footerLogo", "favicon", "shareImage", "image", "logo", "icon", "photo"]);
function fixImages(value: unknown, key?: string): unknown {
  if (Array.isArray(value)) return value.map((v) => fixImages(v));
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, fixImages(v, k)]));
  if (typeof value === "string" && key && IMAGE_KEYS.has(key)) return imgUrl(value);
  return value;
}

const Ctx = createContext<SiteContent>(defaults);

export const useSiteContent = () => useContext(Ctx);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaults);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}?query=${encodeURIComponent(QUERY)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json) => {
        if (cancelled || !json?.result) return;
        setContent(merge(defaults, fixImages(json.result)));
      })
      .catch((e) => console.warn("Sanity content unavailable, using defaults:", e));
    return () => {
      cancelled = true;
    };
  }, []);

  // Favicon + SEO keywords driven by CMS
  const { favicon, seoKeywords } = content.siteSettings;
  useEffect(() => {
    if (favicon) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.removeAttribute("type");
      link.href = favicon;
    }
    let kw = document.head.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    if (!kw) {
      kw = document.createElement("meta");
      kw.name = "keywords";
      document.head.appendChild(kw);
    }
    kw.content = (seoKeywords ?? []).join(", ");
  }, [favicon, seoKeywords]);

  return <Ctx.Provider value={content}>{children}</Ctx.Provider>;
}
