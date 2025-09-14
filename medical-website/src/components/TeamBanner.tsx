import React from "react";

const CLOUDINARY_TRANSFORMS = "f_auto,q_auto,dpr_auto,e_improve,e_auto_contrast,e_auto_color,e_sharpen:40";

function cld(url: string, w: number) {
  if (!url) return url;
  const inject = `/upload/${CLOUDINARY_TRANSFORMS},w_${w}/`;
  return url.replace(/\/upload\/.*?\//, inject);
}

function srcset(url: string, widths: number[]) {
  return widths.map((w) => `${cld(url, w)} ${w}w`).join(", ");
}

const IMG_1 = "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757280531/Untitled_design_30_vwumus.png";
const IMG_2 = "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253397/2_swjp7l.png";
const IMG_3 = "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253396/1_ujihn0.png";

export default function TeamBanner() {
  return (
    <section aria-labelledby="team-banner-title" className="relative w-full overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 sm:py-14 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#009D98] via-[#16b3a8] to-[#AFCA0B] p-[2px] shadow-xl">
          <div className="relative rounded-2xl bg-white/70 p-6 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <h2 id="team-banner-title" className="text-2xl font-extrabold tracking-tight text-[#064e4b] sm:text-3xl">
              Conoce a nuestro equipo médico
            </h2>
            <p className="mt-2 max-w-prose text-[15px] text-gray-700">
              Atención cercana y especializada en Daimiel. Endocrinología, Atención Primaria y Cirugía con trato humano y diagnóstico ágil.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/#equipo" className="inline-flex items-center justify-center rounded-lg bg-[#009D98] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#007E7A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]">
                Ver equipo
              </a>
              <a href="https://booking.slotspot.app/sanital" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg border border-[#009D98] px-4 py-2.5 text-sm font-semibold text-[#009D98] transition hover:bg-[#009D98] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]">
                Agendar cita
              </a>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-tr from-[#009D98]/20 via-[#009D98]/10 to-[#AFCA0B]/20 blur-2xl" />
          <ul className="flex items-end gap-5">
            <li className="relative">
              <figure className="size-40 sm:size-44 md:size-48 rounded-full bg-white/70 ring-2 ring-[#009D98]/25 ring-offset-2 ring-offset-white overflow-hidden shadow-lg">
                <img
                  src={cld(IMG_1, 480)}
                  srcSet={srcset(IMG_1, [320, 480, 640])}
                  sizes="(min-width:1024px) 220px, 33vw"
                  alt="Cirujano del equipo Sanital"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </li>
            <li className="relative translate-y-3 sm:translate-y-4">
              <figure className="size-44 sm:size-52 md:size-56 rounded-full bg-white/70 ring-2 ring-[#009D98]/25 ring-offset-2 ring-offset-white overflow-hidden shadow-xl">
                <img
                  src={cld(IMG_2, 560)}
                  srcSet={srcset(IMG_2, [360, 560, 720])}
                  sizes="(min-width:1024px) 240px, 34vw"
                  alt="Endocrinóloga del equipo Sanital"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </li>
            <li className="relative">
              <figure className="size-40 sm:size-44 md:size-48 rounded-full bg-white/70 ring-2 ring-[#009D98]/25 ring-offset-2 ring-offset-white overflow-hidden shadow-lg">
                <img
                  src={cld(IMG_3, 480)}
                  srcSet={srcset(IMG_3, [320, 480, 640])}
                  sizes="(min-width:1024px) 220px, 33vw"
                  alt="Médico de familia del equipo Sanital"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

