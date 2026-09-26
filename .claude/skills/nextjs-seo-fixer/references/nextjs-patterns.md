# Next.js SEO code patterns

## Contents
1. Site constants (single source of NAP)
2. Root layout metadata (App Router)
3. Static page metadata
4. Dynamic route: generateMetadata + notFound
5. sitemap.ts and robots.ts
6. JSON-LD component
7. Local business schema example (MedicalClinic)
8. Blog, FAQ, Breadcrumb schema
9. Pages Router equivalents
10. Images, fonts, scripts

---

## 1. Site constants — `lib/site.ts`
```ts
export const SITE = {
  name: "Brand Name",
  url: "https://www.example.com", // no trailing slash
  locale: "en_IN",
  phone: "+91-XXXXXXXXXX",
  email: "info@example.com",
  address: {
    streetAddress: "",
    addressLocality: "", // city/area
    addressRegion: "",   // state
    postalCode: "",
    addressCountry: "IN",
  },
  geo: { latitude: 0, longitude: 0 },
  googleBusinessUrl: "",
  social: [] as string[],
  defaultOgImage: "/og-image.jpg", // 1200x630 in /public
};
```

## 2. Root layout — `app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Main Service in City`, template: `%s | ${SITE.name}` },
  description: "140–160 character description with service + location.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    siteName: SITE.name,
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## 3. Static page — `app/about/page.tsx`
```tsx
export const metadata: Metadata = {
  title: "About Dr. Name – Dermatologist in City",
  description: "...",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};
```
If the page file has `"use client"`, move the interactive part into a separate component (e.g. `AboutClient.tsx`) and keep `page.tsx` as a Server Component that exports metadata.

## 4. Dynamic route — `app/blog/[slug]/page.tsx`
```tsx
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> }; // Next 15; in Next 13/14 params is not a Promise

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt ?? "";
  const image = post.image ?? SITE.defaultOgImage;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", url: `/blog/${slug}`, title, description, images: [image],
      publishedTime: post.publishedAt, modifiedTime: post.updatedAt },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  // ...
}
```
Check the installed Next.js version to decide whether `params` is a Promise (15+) or a plain object (13/14).

## 5. `app/sitemap.ts` and `app/robots.ts`
```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = ["", "/about", "/services", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.8,
  }));
  const posts = await getAllPosts();
  const postPages = posts.map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`, lastModified: new Date(p.updatedAt ?? p.publishedAt), priority: 0.6,
  }));
  return [...staticPages, ...postPages];
}
```
```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/admin/", "/studio/"] }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
```
If the project has a Sanity Studio route (e.g. `/studio`), disallow it and add `robots: { index: false }` metadata on it.

## 6. JSON-LD component — `components/JsonLd.tsx`
```tsx
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
```

## 7. Local business schema (clinic example)
```ts
export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic", // or Dentist, Optician, Hospital, LegalService, LocalBusiness
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  image: `${SITE.url}${SITE.defaultOgImage}`,
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", ...SITE.address },
  geo: { "@type": "GeoCoordinates", ...SITE.geo },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "10:00", closes: "19:00" },
  ],
  medicalSpecialty: "Dermatology", // clinics only
  areaServed: [{ "@type": "City", name: "Delhi" }],
  sameAs: [SITE.googleBusinessUrl, ...SITE.social].filter(Boolean),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": `${SITE.url}/#organization` },
};
```
Render both in the root layout: `<JsonLd data={[clinicSchema, websiteSchema]} />`.
Doctor page: `{"@type":"Physician", name, image, medicalSpecialty, worksFor:{"@id": `${SITE.url}/#organization`}}`.

## 8. Blog, FAQ, Breadcrumb
```ts
const article = {
  "@context": "https://schema.org", "@type": "BlogPosting",
  headline: post.title, description, image: [absoluteImage],
  datePublished: post.publishedAt, dateModified: post.updatedAt ?? post.publishedAt,
  author: { "@type": "Person", name: post.author ?? SITE.name },
  publisher: { "@id": `${SITE.url}/#organization` },
  mainEntityOfPage: `${SITE.url}/blog/${slug}`,
};
const faq = {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};
const breadcrumb = {
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
    { "@type": "ListItem", position: 3, name: post.title, item: `${SITE.url}/blog/${slug}` },
  ],
};
```

## 9. Pages Router equivalents
- Per-page tags with `next/head` inside the page component: `<title>`, `<meta name="description">`, `<link rel="canonical" href={absoluteUrl}>`, OG/Twitter meta. Consider a reusable `<Seo title description path image />` component.
- `lang` attribute in `pages/_document.tsx`: `<Html lang="en">`.
- Data for dynamic pages via `getStaticProps` + `getStaticPaths` (with `fallback: "blocking"`) so content is in HTML; return `{ notFound: true }` for missing slugs.
- Sitemap: `pages/sitemap.xml.ts` using `getServerSideProps` to write XML, or the `next-sitemap` package with a postbuild script. Robots: `public/robots.txt` or generated by next-sitemap.

## 10. Images, fonts, scripts
```tsx
import Image from "next/image";
<Image src="/hero.jpg" alt="Dermatologist consulting a patient at Brand Clinic, City" width={1200} height={800} priority sizes="100vw" />

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });

import Script from "next/script";
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXX" strategy="afterInteractive" />
```
Remote images need `images.remotePatterns` in `next.config` (e.g. `cdn.sanity.io`).
