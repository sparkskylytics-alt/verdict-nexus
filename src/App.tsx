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
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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


function App() {
  const [accepted, setAccepted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {!accepted && <DisclaimerModal onAccept={() => setAccepted(true)} />}

      <Routes>
        {/* 🌍 PUBLIC WEBSITE */}
        <Route
          path="/"
          element={
            accepted ? (
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
            ) : null
          }
        />
        
        {/* 📄 ORDERS AND JUDGMENT PAGES */}
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/judgment" element={<JudgmentPage />} />
        
        {/* 🔗 REDIRECT TO HOME (if needed) */}
        <Route path="/Home" element={<HomePage />} />
                <Route path="/EduHome" element={<EduHome />} />


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