import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

import Navbar from "./components/Navbar";
import FooterSection from "./components/FooterSection";
import PrivacyBanner from "./components/PrivacyBanner";
import VeilPreloader from "./components/VeilPreloader";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Routed page components
import Home from "./pages/Home";
import Documentation from "./components/Documentation";
import FAQ from "./components/FAQ";
import Roadmap from "./components/Roadmap";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Risks from "./components/Risks";
import Manifesto from "./components/Manifesto";

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainAppLayout() {
  const [isPreloaded, setIsPreloaded] = React.useState(false);
  const { lang } = useLanguage();

  return (
    <main
      className={`relative w-full min-h-screen select-none font-sans bg-[#050505] flex flex-col overflow-x-hidden ${isPreloaded ? "overflow-y-auto" : "overflow-y-hidden max-h-screen"}`}
      id="veil-view-port"
    >
      <ScrollToTop />
      <VeilPreloader lang={lang} onComplete={() => setIsPreloaded(true)} />

      {/* Floating Header Navbar */}
      <Navbar isPreloaded={isPreloaded} />

      <Routes>
        <Route path="/" element={<Home isPreloaded={isPreloaded} />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/risks" element={<Risks />} />
        <Route path="/manifesto" element={<Manifesto />} />
      </Routes>

      {/* Module 6: Footer with the Giant breathing VEIL emblem */}
      <FooterSection />

      <PrivacyBanner lang={lang} triggerShow={isPreloaded} />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <LanguageProvider>
          <MainAppLayout />
        </LanguageProvider>
      </ErrorBoundary>
    </Router>
  );
}
