"use client";
import { useEffect, useState } from "react";
import { useScrollLock } from "../../utils/scrollLock";
import { cld, cldSrcSet } from "../../utils/cloudinary";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useScrollLock(visible, "splash");

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 900);   // empieza fade antes
    const t2 = setTimeout(() => setVisible(false), 1200); // splash se oculta rápido
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`fixed inset-0 z-[9999] flex items-center justify-center 
        bg-gradient-to-br from-[#009D98] via-[#0FB8B2] to-[#009D98] 
        transition-opacity duration-500 pointer-events-none 
        ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-black/10 blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center">
        <img
          src={cld(
            "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757193672/Untitled_design_18_ulx4if.png",
            512
          )}
          srcSet={cldSrcSet(
            "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757193672/Untitled_design_18_ulx4if.png",
            [256, 384, 512]
          ).srcSet}
          sizes="288px"
          alt=""
          width={288}
          height={288}
          className="w-72 h-auto drop-shadow-xl select-none transition-transform duration-500 ease-out will-change-transform saturate-125 contrast-110"
          style={{
            transform: fadeOut
              ? "translateY(-6px) scale(0.98)"
              : "translateY(0) scale(1)",
          }}
          draggable={false}
        />

        <p className="mt-4 text-white/95 text-sm tracking-wide">Cuidamos tu salud</p>

        <div className="mt-6 w-40 h-1.5 rounded-full bg-white/20 overflow-hidden">
          <div
            className={`h-full bg-white transition-all duration-[900ms] ease-out ${
              fadeOut ? "w-full" : "w-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
