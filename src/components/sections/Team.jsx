import { useState } from "react";
import { CalendarCheck, Info } from "lucide-react";
import DoctorDialog from "../common/DoctorDialog";

const doctors = [
  {
    slug: "diana-storinoz",
    name: "Dra. Diana Storino",
    role: "Endocrino",
    specialty: "Consulta endocrinología y obesidad",
    image: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253397/2_swjp7l.png",
  },
  {
    slug: "pablo-carmona",
    name: "Dr. Pablo Carmona Díaz Salazar",
    role: "Atención primaria",
    specialty: "Atención Primaria",
    image: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253396/1_ujihn0.png",
  },
];

export default function Team() {
  const [active, setActive] = useState(null);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://www.sanital.example";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${baseUrl}/equipo#lista`,
    name: "Equipo médico",
    itemListElement: doctors.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Physician",
        "@id": `${baseUrl}/equipo#${d.slug}`,
        url: `${baseUrl}/equipo#${d.slug}`,
        name: d.name,
        medicalSpecialty: d.specialty,
        image: d.image,
        worksFor: {
          "@type": "MedicalClinic",
          name: "Sanital",
          url: baseUrl,
          address: "Ciudad Real, Castilla-La Mancha, España",
          areaServed: "Ciudad Real, Castilla-La Mancha, España",
        },
        areaServed: "Ciudad Real, Castilla-La Mancha, España",
      },
    })),
  };

  const cld = (u, w) =>
    u.includes("/upload/")
      ? u.replace("/upload/", `/upload/f_auto,q_auto:good,dpr_auto,e_improve,e_auto_contrast,e_auto_color,e_sharpen:60,w_${w}/`)
      : u;

  return (
    <section id="equipo" aria-labelledby="equipo-heading" className="relative bg-white py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 id="equipo-heading" className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl">
          Nuestro Equipo Médico
        </h2>
        <p className="sr-only">
          Conoce a nuestro equipo médico de Sanital en Ciudad Real, Castilla-La Mancha: especialistas colegiados con atención cercana.
        </p>

        <ul aria-label="Tarjetas del equipo médico" className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 sm:grid-cols-2">
          {doctors.map((d) => {
            const src = cld(d.image, 640);
            const srcSet = `${cld(d.image, 480)} 480w, ${cld(d.image, 640)} 640w, ${cld(d.image, 960)} 960w`;

            return (
              <li key={d.slug} className="flex justify-center">
                <article
                  id={d.slug}
                  itemScope
                  itemType="https://schema.org/Physician"
                  className="group relative w-full max-w-[21rem] rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg/30"
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-6 top-5 -z-0 h-16 rounded-3xl bg-emerald-300/15 blur-3xl" />

                  <div className="relative z-10 mx-auto h-[300px] w-full rounded-xl ring-1 ring-emerald-200 shadow-md overflow-hidden bg-emerald-50">
                    <img
                      src={src}
                      srcSet={srcSet}
                      sizes="(min-width: 640px) 21rem, 90vw"
                      alt={`${d.name}, ${d.role}`}
                      itemProp="image"
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover filter contrast-105 saturate-110 brightness-[1.03] drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition-transform duration-300 will-change-transform group-hover:scale-[1.01]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0)_60%,rgba(46,125,50,0.06)_100%)]" />
                  </div>

                  <div className="mt-4 text-center">
                    <h3 itemProp="name" className="text-lg font-semibold text-emerald-900">{d.name}</h3>
                    <p itemProp="medicalSpecialty" className="mt-0.5 text-[0.92rem] font-medium text-emerald-900/80">{d.role}</p>
                    <p className="sr-only">{d.name} atiende en Sanital, Ciudad Real, con especialidad en {d.role}.</p>
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <a
                      href="https://booking.slotspot.app/sanital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.04] hover:bg-green-700 hover:text-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
                      aria-label={`Agendar cita con ${d.name}`}
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Agendar cita
                    </a>

                    <button
                      type="button"
                      onClick={() => setActive(d)}
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-700/30 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-800 backdrop-blur-[2px] transition-all duration-150 hover:scale-[1.03] hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/30"
                      aria-label={`Saber más sobre ${d.name}`}
                    >
                      <Info className="h-4 w-4" />
                      Saber más
                    </button>
                  </div>

                  <meta itemProp="jobTitle" content={d.role} />
                  <meta itemProp="url" content={`/equipo#${d.slug}`} />

                  <span className="pointer-events-none absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-emerald-600/70 transition-transform duration-200 group-hover:scale-x-100" />
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      <DoctorDialog open={!!active} onClose={() => setActive(null)} doctor={active} />
    </section>
  );
}
