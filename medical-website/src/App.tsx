import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home"));
const SobreNosotros = React.lazy(() => import("./pages/SobreNosotros"));
import LegalModal from "./components/legal/LegalModal";

function GlobalShell() {
  const location = useLocation();
  const [hash, setHash] = useState<string>(typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash.replace(/^#/, ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, location.hash]);

  const showLegal = hash.startsWith("/legal/");
  const legalType = showLegal ? hash.replace("/legal/", "").replace(/\/$/, "") : "";

  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        </Routes>
      </Suspense>
      {showLegal && (
        <LegalModal
          type={legalType}
          onClose={() => {
            try {
              window.location.hash = "site-footer";
            } catch {}
          }}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <GlobalShell />
      </BrowserRouter>
    </HelmetProvider>
  );
}
