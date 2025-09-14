import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import React, { Suspense } from "react";
const Services = React.lazy(() => import("../components/sections/Services"));
const Team = React.lazy(() => import("../components/sections/Team"));
const Testimonial = React.lazy(() => import("../components/sections/Testimonial"));
const Contact = React.lazy(() => import("../components/sections/Contact"));
import Footer from "../components/layout/Footer";
import Benefits from "../components/sections/Benefits";
import Intro from "../components/sections/Intro";
import StickyCTA from "../components/layout/StickyCTA";
import SplashScreen from "../components/layout/SplashScreen";
import SkipLink from "../components/layout/SkipLink";
import LegalModal from "../components/legal/LegalModal";

export default function Home() {
  const [route, setRoute] = useState(
    typeof window !== "undefined" ? window.location.hash.replace(/^#/, "") : ""
  );

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace(/^#/, ""));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const showLegal = route.startsWith("/legal/");
  const legalType = showLegal
    ? route.replace("/legal/", "").replace(/\/$/, "")
    : "";

  useEffect(() => {
    if (showLegal && typeof window !== "undefined") {
      const t = setTimeout(() => {
        try {
          const y = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight
          );
          window.scrollTo(0, y);
        } catch {}
      }, 0);
      return () => clearTimeout(t);
    }
  }, [showLegal]);

  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <SplashScreen />
      <SkipLink />
      <Navbar />
      <main id="main" className="relative pb-36 sm:pb-40">
        <Hero />
        <Intro />
        <Benefits />
        <Suspense fallback={null}>
          <Services />
        </Suspense>
        <Suspense fallback={null}>
          <Team />
        </Suspense>
        <Suspense fallback={null}>
          <Testimonial />
        </Suspense>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <StickyCTA usePortal={false} />
      {showLegal && (
        <LegalModal
          type={legalType}
          onClose={() => {
            if (typeof window !== "undefined")
              window.location.hash = "site-footer";
          }}
        />
      )}
    </div>
  );
}
