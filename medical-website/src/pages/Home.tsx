import { useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/sections/Hero";
import React from "react";
import LazySection from "../components/common/LazySection";
import Footer from "../components/layout/Footer";
import Benefits from "../components/sections/Benefits";
import Intro from "../components/sections/Intro";
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
      <main id="main" className="relative pb-36 sm:pb-40">
        <Hero />
        <Intro />
        <Benefits />
        <LazySection loader={() => import("../components/sections/Services")} fallback={null} />
        <LazySection loader={() => import("../components/sections/Team")} fallback={null} />
        <LazySection loader={() => import("../components/sections/Testimonial")} fallback={null} />
        <LazySection loader={() => import("../components/sections/Contact")} fallback={null} />
      </main>

      <Footer />
      <StickyCTA usePortal={false} />
      {/* LegalModal is handled centrally in App Shell */}
    </div>
  );
}
