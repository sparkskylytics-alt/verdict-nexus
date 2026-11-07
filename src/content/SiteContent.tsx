import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type seed from "../../studio/scripts/seed-data.json";

// Shape of the content (type only - no data is bundled with the site).
export type SiteContent = typeof seed;

// Requests go through a same-origin proxy (see vercel.json / vite.config.ts)
const API = "/sanity-api/v2024-01-01/data/query/production";

const img = (k: string) => `"${k}": ${k}.asset->url`;
const list = (k: string, projection = "") => `"${k}": coalesce(${k}, [])${projection}`;

const QUERY = `{
  "siteSettings": *[_id=="siteSettings"][0]{
    ..., ${img("navbarLogo")}, ${img("footerLogo")}, ${img("favicon")}, ${img("shareImage")},
    ${list("navItems")}, ${list("footerPracticeAreas")}, ${list("seoKeywords")}
  },
  "heroSection": *[_id=="heroSection"][0]{ ..., ${img("image")} },
  "clientsSection": *[_id=="clientsSection"][0]{ ..., ${list("clients", `[]{ name, ${img("logo")} }`)} },
  "practiceAreasSection": *[_id=="practiceAreasSection"][0]{ ..., ${list("areas", `[]{ title, description, ${img("icon")} }`)} },
  "teamSection": *[_id=="teamSection"][0]{ ..., ${list("members", `[]{ name, role, bio, ${img("photo")} }`)} },
  "faqSection": *[_id=="faqSection"][0]{ ..., ${list("faqs")} },
  "contactSection": *[_id=="contactSection"][0]{ ..., ${list("items", `[]{ title, content, ${img("icon")} }`)}, ${list("caseTypes")} },
  "disclaimerSection": *[_id=="disclaimerSection"][0]
}`;

const Ctx = createContext<SiteContent | null>(null);

export function useSiteContent(): SiteContent {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSiteContent must be used inside SiteContentProvider");
  return c;
}

const centered: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 16,
  fontFamily: "Montserrat, sans-serif",
  color: "#2F3336",
  background: "#fff",
};

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setError(false);
    fetch(`${API}?query=${encodeURIComponent(QUERY)}`, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((json) => {
        const r = json?.result;
        if (cancelled) return;
        if (!r || Object.values(r).some((v) => v === null)) throw new Error("Missing content in Sanity");
        setContent(r as SiteContent);
      })
      .catch((e) => {
        console.error("Failed to load content from Sanity:", e);
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const favicon = content?.siteSettings.favicon;
  const keywords = content?.siteSettings.seoKeywords;
  useEffect(() => {
    if (!content) return;
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
    kw.content = (keywords ?? []).join(", ");
  }, [content, favicon, keywords]);

  if (error)
    return (
      <div style={centered}>
        <p>Unable to load the website content.</p>
        <button
          onClick={() => setAttempt((a) => a + 1)}
          style={{ padding: "8px 20px", background: "#5C6F7A", color: "#fff", borderRadius: 6 }}
        >
          Try again
        </button>
      </div>
    );

  if (!content)
    return (
      <div style={centered}>
        <div
          style={{
            width: 36,
            height: 36,
            border: "3px solid #ddd",
            borderTopColor: "#5C6F7A",
            borderRadius: "50%",
            animation: "vn-spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes vn-spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );

  return <Ctx.Provider value={content}>{children}</Ctx.Provider>;
}
