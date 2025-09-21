import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import React from "react";
import LazySection from "../components/common/LazySection";
import Footer from "../components/layout/Footer";
// Defer non-critical sections above the fold to reduce main bundle
import StickyCTA from "../components/layout/StickyCTA";
import SplashScreen from "../components/layout/SplashScreen";
import SkipLink from "../components/layout/SkipLink";

export default function Home() {
  useEffect(() => {
    // no-op placeholder to keep consistent hook order if expanded later
  }, []);

  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <SplashScreen />
      <SkipLink />
      <Navbar />
      <main id="main" className="relative pb-8 sm:pb-10">
        <Hero />
        <LazySection
          loader={() => import("../components/sections/Intro")}
          rootMargin="800px"
          fallback={<div className="min-h-[320px]" />}
        />
        <LazySection
          loader={() => import("../components/sections/Benefits")}
          rootMargin="800px"
          fallback={<div className="min-h-[320px]" />}
        />
        <div id="servicios">
          <LazySection
            loader={() => import("../components/sections/Services")}
            rootMargin="600px"
            fallback={<div className="min-h-[520px]" />}
          />
        </div>
        <div id="equipo">
          <LazySection
            loader={() => import("../components/sections/Team")}
            rootMargin="600px"
            fallback={<div className="min-h-[780px]" />}
          />
        </div>
        <div id="testimonios">
          <LazySection
            loader={() => import("../components/sections/Testimonial")}
            rootMargin="600px"
            fallback={<div className="min-h-[520px]" />}
          />
        </div>
        <div id="contacto">
          <LazySection
            loader={() => import("../components/sections/Contact")}
            rootMargin="600px"
            fallback={<div className="min-h-[720px]" />}
          />
        </div>
      </main>

      <Footer />
      <StickyCTA usePortal={false} />
      {/* LegalModal is handled centrally in App Shell */}
    </div>
  );
}
