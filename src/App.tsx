/*import React, { useState } from 'react';
import DisclaimerModal from './components/DisclaimerModel';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import OurClients from './components/OurClients';

import PracticeAreas from './components/PracticeAreas';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      {!accepted && <DisclaimerModal onAccept={() => setAccepted(true)} />}

      {accepted && (
        <div className="min-h-screen">
          <Navbar />
          <Hero />
           <OurClients />
          <PracticeAreas />
          <Team />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;*/
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { usePageMeta } from "./lib/usePageMeta";
import { useSiteContent } from "./content/SiteContent";
import DisclaimerModal from "./components/DisclaimerModel";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OurClients from "./components/OurClients";
import PracticeAreas from "./components/PracticeAreas";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLayout from "./admin/AdminLayout";
import AddClient from "../src/admin/add-client";
import UploadOrder from "../src/admin/upload-order";
import UploadJudgment from "../src/admin/upload-judgement";
import OrdersPage from "../src/pages/OrderPage";
import JudgmentPage from "../src/pages/JudgmentPage";
import HomePage from "./pages/Home";
import EduHome from "./pages/EduHome";
import LandingPage from "./pages/LandingPage";


const PAGE_META: Record<string, { title: string; description: string; noindex?: boolean; canonicalPath?: string }> = {
  "/": {
    title: "Verdict Nexus | Advocates in Greater Noida West, Gurugram & Mumbai",
    description: "Verdict Nexus is a law firm with offices in Greater Noida West (Noida Extension), Gurugram and Mumbai. Advocates practising criminal, family, civil, property and corporate law.",
  },
  "/orders": {
    title: "Court Orders Search | Verdict Nexus",
    description: "Search and access court order documents online by case number through our secure client portal.",
  },
  "/judgment": {
    title: "Court Judgment Search | Verdict Nexus",
    description: "Search and view final court judgments online by case number through our secure legal document portal.",
  },
  "/Home": {
    title: "Verdict Nexus - Legal Services in India",
    description: "Verdict Nexus offers expert legal services across India. Contact our senior advocates for civil, corporate, and criminal law consultations.",
    canonicalPath: "/",
  },
  "/EduHome": {
    title: "Verdict Nexus",
    description: "This page is not part of the Verdict Nexus legal services site.",
    noindex: true,
  },
};

function App() {
  const [accepted, setAccepted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { siteSettings } = useSiteContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseMeta = PAGE_META[location.pathname] ?? PAGE_META["/"];
  const isHomeMeta = baseMeta === PAGE_META["/"] || baseMeta === PAGE_META["/Home"];
  const meta = isHomeMeta
    ? { ...baseMeta, title: siteSettings.seoTitle, description: siteSettings.seoDescription }
    : baseMeta;
  usePageMeta({
    ...meta,
    path: location.pathname,
    image: siteSettings.shareImage,
    skip: !(location.pathname in PAGE_META), // landing pages set their own meta
  });

  return (
    <>
      {!accepted && <DisclaimerModal onAccept={() => setAccepted(true)} />}

      <Routes>
        {/* 🌍 PUBLIC WEBSITE */}
        <Route
          path="/"
          element={
            (
              <div className="min-h-screen">
                <Navbar scrolled={scrolled} />
                <Hero />
                <OurClients />
                <PracticeAreas />
                <Team />
                {/* <Testimonials /> */}
                <FAQ />
                <Contact />
                <Footer />
              </div>
            )
          }
        />
        
        {/* 📄 ORDERS AND JUDGMENT PAGES */}
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/judgment" element={<JudgmentPage />} />
        
        {/* 🔗 REDIRECT TO HOME (if needed) */}
        <Route path="/Home" element={<HomePage />} />
                <Route path="/EduHome" element={<EduHome />} />


        {/* 🔎 SERVICE / CITY PAGES (content from Sanity) */}
        <Route path="/:slug" element={<LandingPage scrolled={scrolled} />} />

        {/* 🔐 ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="add-client" element={<AddClient />} />
          <Route path="upload-order" element={<UploadOrder />} />
          <Route path="upload-judgment" element={<UploadJudgment />} />
          
        </Route>
      </Routes>
    </>
  );
}

export default App;