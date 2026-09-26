import { useEffect } from "react";

const SITE_URL = "https://verdictnexus.in";

type Meta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  canonicalPath?: string;
};

function setTag(selector: string, attr: string, key: string, value: string) {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = document.createElement(selector.startsWith("link") ? "link" : "meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(selector.startsWith("link") ? "href" : "content", value);
}

export function usePageMeta({ title, description, path, image, noindex, canonicalPath }: Meta) {
  useEffect(() => {
    const canonicalUrl = SITE_URL + (canonicalPath ?? path);
    document.title = title;
    setTag('meta[name="description"]', "name", "description", description);
    setTag('link[rel="canonical"]', "rel", "canonical", canonicalUrl);
    setTag('meta[name="robots"]', "name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setTag('meta[property="og:title"]', "property", "og:title", title);
    setTag('meta[property="og:description"]', "property", "og:description", description);
    setTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    if (image) setTag('meta[property="og:image"]', "property", "og:image", SITE_URL + image);
  }, [title, description, path, image, noindex, canonicalPath]);
}
