import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteContent } from "../content/SiteContent";
import { usePageMeta } from "../lib/usePageMeta";

type Page = {
  title: string;
  city?: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro?: string;
  sections?: { heading: string; body?: string; points?: string[] }[];
  faqs?: { question: string; answer: string }[];
  note?: string;
};

const API = "/sanity-api/v2024-01-01/data/query/production";
const QUERY = `*[_type=="landingPage" && slug.current==$slug][0]{
  title, city, seoTitle, seoDescription, h1, intro, note,
  "sections": coalesce(sections, [])[]{ heading, body, "points": coalesce(points, []) },
  "faqs": coalesce(faqs, [])
}`;

const paragraphs = (t?: string) => (t ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function LandingPage({ scrolled }: { scrolled: boolean }) {
  const { slug = "" } = useParams();
  const { landingLinks, siteSettings } = useSiteContent();
  const [page, setPage] = useState<Page | null | undefined>(undefined); // undefined = loading, null = not found

  useEffect(() => {
    let cancelled = false;
    setPage(undefined);
    fetch(`${API}?query=${encodeURIComponent(QUERY)}&$slug=${encodeURIComponent(JSON.stringify(slug))}`, {
      cache: "no-cache",
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((j) => !cancelled && setPage(j.result ?? null))
      .catch(() => !cancelled && setPage(null));
    window.scrollTo(0, 0);
    return () => {
      cancelled = true;
    };
  }, [slug]);

  usePageMeta({
    title: page ? page.seoTitle : page === null ? "Page not found | Verdict Nexus" : siteSettings.seoTitle,
    description: page ? page.seoDescription : siteSettings.seoDescription,
    path: `/${slug}`,
    image: siteSettings.shareImage,
    noindex: page === null,
    skip: page === undefined,
  });

  // FAQ structured data
  useEffect(() => {
    if (!page?.faqs?.length) return;
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
    document.head.appendChild(el);
    return () => {
      el.remove();
    };
  }, [page]);

  const related = landingLinks.filter((l) => l.slug !== slug);

  return (
    <div className="min-h-screen font-montserrat bg-white">
      <Navbar scrolled={scrolled} />
      <main className="pt-24">
        {page === undefined && <div className="py-32 text-center text-[#5C6F7A]">Loading…</div>}

        {page === null && (
          <div className="container mx-auto px-4 py-32 text-center">
            <h1 className="text-2xl font-semibold text-[#2F3336] mb-4">Page not found</h1>
            <Link to="/" className="text-[#5C6F7A] underline">
              Go to the home page
            </Link>
          </div>
        )}

        {page && (
          <>
            <section className="bg-[#2F3336] text-white">
              <div className="container mx-auto px-4 py-14 max-w-4xl">
                <nav aria-label="Breadcrumb" className="text-xs text-[#CFC7B8] mb-4">
                  <Link to="/" className="hover:text-white">Home</Link> <span>/</span> <span>{page.title}</span>
                </nav>
                <h1 className="text-2xl md:text-4xl font-semibold leading-tight">{page.h1}</h1>
              </div>
            </section>

            <article className="container mx-auto px-4 py-12 max-w-4xl text-[#2F3336]">
              {paragraphs(page.intro).map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-gray-700 mb-4">{p}</p>
              ))}

              {page.sections?.map((s, i) => (
                <section key={i} className="mt-10">
                  <h2 className="text-xl font-semibold mb-3">{s.heading}</h2>
                  {paragraphs(s.body).map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-gray-700 mb-3">{p}</p>
                  ))}
                  {!!s.points?.length && (
                    <ul className="list-disc pl-6 space-y-1.5 text-gray-700">
                      {s.points.map((pt, j) => (
                        <li key={j}>{pt}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              {!!page.faqs?.length && (
                <section className="mt-12">
                  <h2 className="text-xl font-semibold mb-4">Frequently asked questions</h2>
                  <div className="space-y-5">
                    {page.faqs.map((f, i) => (
                      <div key={i}>
                        <h3 className="font-medium">{f.question}</h3>
                        <p className="text-gray-700 leading-relaxed mt-1">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-12 rounded-lg bg-gray-50 border border-gray-200 p-6">
                <h2 className="text-lg font-semibold mb-2">Contact us</h2>
                <p className="text-sm text-gray-700 mb-3">
                  You can write to us or visit one of our offices. Details are on the contact section of the home page.
                </p>
                <Link to="/#contact" className="inline-block bg-[#5C6F7A] text-white text-sm px-5 py-2 rounded hover:bg-[#6F848F]">
                  Go to contact details
                </Link>
              </section>

              {!!related.length && (
                <section className="mt-12">
                  <h2 className="text-lg font-semibold mb-3">Other areas and locations</h2>
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {related.map((l) => (
                      <li key={l.slug}>
                        <Link to={`/${l.slug}`} className="text-[#5C6F7A] underline hover:text-[#2F3336]">
                          {l.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {page.note && <p className="mt-10 text-xs text-gray-500">{page.note}</p>}
            </article>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
