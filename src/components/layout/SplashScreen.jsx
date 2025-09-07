"use client";
import { useEffect, useMemo, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

export default function SplashScreen() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const timings = useMemo(() => {
    if (prefersReducedMotion) {
      return { fade: 0, remove: 0, progress: 0 };
    }
    return { fade: 1200, remove: 1800, progress: 1200 };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const prevOverflow = document.documentElement.style.overflow;
    if (visible) document.documentElement.style.overflow = "hidden";
    return () => {
      // Ensure we always restore scrolling
      document.documentElement.style.overflow = prevOverflow || "";
    };
  }, [visible]);

  useEffect(() => {
    const t1 = window.setTimeout(() => setFadeOut(true), timings.fade);
    const t2 = window.setTimeout(() => setVisible(false), timings.remove);
    const t3 = window.setTimeout(() => setProgress(100), 50);

    const t4 = window.setTimeout(() => {
      setFadeOut(true);
      setVisible(false);
      try {
        document.documentElement.style.overflow = "";
      } catch {}
    }, 3500);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [timings.fade, timings.remove]);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#009D98] via-[#0FB8B2] to-[#009D98] transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Decorative blurred shapes for a subtle depth effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757193672/Untitled_design_18_ulx4if.png"
          alt="Sanital"
          className="w-72 max-w-[70vw] h-auto drop-shadow-xl select-none transition-transform duration-500 ease-out will-change-transform saturate-125 contrast-110"
          style={{
            transform: fadeOut
              ? "translateY(-6px) scale(0.98)"
              : "translateY(0) scale(1)",
          }}
          draggable={false}
        />

        {/* Progress bar */}
        <div className="mt-6 h-1.5 w-48 max-w-[70vw] rounded-full bg-white/30 overflow-hidden shadow-sm">
          <div
            className="h-full rounded-full bg-white/90"
            style={{
              width: `${progress}%`,
              transition: prefersReducedMotion
                ? "none"
                : "width 1200ms ease-in-out",
            }}
          />
        </div>

        {/* Optional tagline for brand feel */}
        <p className="mt-3 text-white/95 text-sm tracking-wide">
          Cuidamos tu salud
        </p>
      </div>
    </div>
  );
}
