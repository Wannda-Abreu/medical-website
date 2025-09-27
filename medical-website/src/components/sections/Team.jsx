import React, { Suspense, useMemo, useState, memo } from "react";
import { CalendarCheck, Info, Stethoscope } from "lucide-react";
const DoctorDialog = React.lazy(() => import("../common/DoctorDialog"));
import { cldEco as cld, srcsetEco as srcset } from "@/lib/cld";
import SmartImage from "@/components/SmartImage";

const BRAND_PRIMARY = "#009D98";
const BRAND_ACCENT = "#AFCA0B";

const DOCTORS = [
  {
    slug: "diana-storinoz",
    name: "Dra. Diana Storino",
    role: "Endocrino",
    specialty: "Consulta de endocrinologia y obesidad",
    image: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253397/2_swjp7l.png",
  },
  {
    slug: "pablo-carmona",
    name: "Dr. Pablo Carmona Diaz Salazar",
    role: "Medicina Familiar y Comunitaria",
    specialty: "Especialista en Medicina Familiar y Comunitaria",
    image: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253396/1_ujihn0.png",
  },
  {
    slug: "mirko-solano",
    name: "Dr. Mirko Solano",
    role: "Medico general y cirujano",
    specialty: "Medicina general y cirugia ambulatoria",
    image: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757280531/Untitled_design_30_vwumus.png",
  },
];

const ORDER = ["pablo-carmona", "diana-storinoz", "mirko-solano"];

function buildSrcSets(imageUrl) {
  const src = cld(imageUrl, 640, true);
  const srcSet = srcset(imageUrl, [360, 480, 640], true);
  return { src, srcSet };
}

const clinic = {
  name: "Sanital",
  url: "https://www.sanital.example",
  address: {
    streetAddress: "Calle del Rio 8",
    addressLocality: "Ciudad Real",
    addressRegion: "Castilla-La Mancha",
    addressCountry: "ES",
  },
  areaServed: "Ciudad Real, Castilla-La Mancha, Espana",
};

const roleTone = {
  "Medicina Familiar y Comunitaria": `bg-[${BRAND_ACCENT}]/10 text-[${BRAND_ACCENT}] ring-[${BRAND_ACCENT}]/30`,
  Endocrino: `bg-[${BRAND_PRIMARY}]/10 text-[${BRAND_PRIMARY}] ring-[${BRAND_PRIMARY}]/30`,
  Cirujano: `bg-white/80 text-zinc-800 ring-black/5`,
};

const DoctorCard = memo(function DoctorCard({ d, onMore }) {
  const { src, srcSet } = buildSrcSets(d.image);
  const tone = roleTone[d.role] || `bg-white/80 text-zinc-800 ring-black/5`;

  return (
    <li className="flex justify-center" key={d.slug}>
      <article
        id={d.slug}
        itemScope
        itemType="https://schema.org/Physician"
        className="group relative w-full max-w-[26rem] rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg/30 motion-reduce:transform-none animate-slideDownFade"
        aria-label={`${d.name}, ${d.role}`}
      >
        <div className="rounded-2xl border border-zinc-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 p-6">
          <figure className="relative z-10 mx-auto h-[300px] w-full rounded-xl ring-1 ring-[rgba(0,157,152,0.15)] shadow-sm overflow-hidden bg-gradient-to-b from-white via-[rgba(0,157,152,0.08)] to-white">
            <SmartImage
              src={src}
              srcSet={srcSet}
              sizes="(min-width: 640px) 416px, 90vw"
              alt={`${d.name}, ${d.role}`}
              width={416}
              height={300}
              className="block h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-[1.01] motion-reduce:transform-none"
            />
            <div className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ring-1 backdrop-blur ${tone}`}>
              <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{d.role}</span>
            </div>
            <figcaption className="sr-only">{d.name}, {d.role} - {d.specialty}</figcaption>
          </figure>

          <div className="mt-5 text-center">
            <h3 itemProp="name" className="text-xl font-semibold tracking-tight" style={{ color: BRAND_PRIMARY }}>
              {d.name}
            </h3>
            <p className="mt-1 text-[0.95rem] font-medium text-foreground/80">{d.specialty}</p>
            <meta itemProp="medicalSpecialty" content={d.specialty} />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
            <a
              href="https://booking.slotspot.app/sanital"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.04] hover:shadow-md hover:from-primary-700 hover:to-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-100 hover:text-white`}
              aria-label={`Agendar cita con ${d.name}`}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Agendar cita
            </a>

            <button
              type="button"
              onClick={() => onMore(d)}
              className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-white/70 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-[2px] transition-all duration-150 hover:scale-[1.03] hover:bg-accent/10 hover:text-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
              aria-haspopup="dialog"
              aria-controls="doctor-dialog"
              aria-label={`Saber mas sobre ${d.name}`}
            >
              <Info className="h-4 w-4" aria-hidden="true" />
              Saber mas
            </button>
          </div>

          <meta itemProp="jobTitle" content={d.role} />
          <meta itemProp="url" content={`/equipo#${d.slug}`} />
          <span className="pointer-events-none absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 transition-transform duration-200 group-hover:scale-x-100" style={{ backgroundColor: BRAND_PRIMARY }} />
        </div>
      </article>
    </li>
  );
});

export default function Team() {
  const [active, setActive] = useState(null);

  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
    return clinic.url;
  }, []);

  const renderDoctors = useMemo(() => {
    const bySlug = Object.fromEntries(DOCTORS.map((d) => [d.slug, d]));
    return ORDER.map((s) => bySlug[s]).filter(Boolean);
  }, []);

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${baseUrl}/equipo#lista`,
      name: "Equipo medico",
      itemListElement: renderDoctors.map((d, i) => ({
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
            name: clinic.name,
            url: baseUrl,
            address: {
              "@type": "PostalAddress",
              streetAddress: clinic.address.streetAddress,
              addressLocality: clinic.address.addressLocality,
              addressRegion: clinic.address.addressRegion,
              addressCountry: clinic.address.addressCountry,
            },
            areaServed: clinic.areaServed,
          },
          areaServed: clinic.areaServed,
        },
      })),
    };
  }, [baseUrl, renderDoctors]);

  return (
    <section id="equipo" aria-labelledby="equipo-heading" className="relative py-10 mt-8 bg-gradient-to-b from-white via-[rgba(0,157,152,0.1)] to-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 h-16 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,157,152,0.22),rgba(0,157,152,0))]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container px-4 sm:px-6 lg:px-8">
        <h2 id="equipo-heading" className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl" style={{ color: BRAND_PRIMARY }}>
          Nuestro equipo medico
        </h2>
        <p className="sr-only">
          Conoce a nuestro equipo medico de Sanital en Ciudad Real, Castilla-La Mancha: especialistas colegiados con atencion cercana.
        </p>

        <ul aria-label="Tarjetas del equipo medico" className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {renderDoctors.map((d) => (
            <DoctorCard key={d.slug} d={d} onMore={setActive} />
          ))}
        </ul>
      </div>

      <Suspense fallback={null}>
        <DoctorDialog id="doctor-dialog" open={!!active} onClose={() => setActive(null)} doctor={active} />
      </Suspense>
    </section>
  );
}
