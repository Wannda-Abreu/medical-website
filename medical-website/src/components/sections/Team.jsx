import React, { Suspense, useMemo, useState } from "react";
import DoctorCard from "./DoctorCard";
import SuggestServiceDialog from "./SuggestServiceDialog";
const DoctorDialog = React.lazy(() => import("../common/DoctorDialog"));

const BRAND_PRIMARY = "#009D98";
const BRAND_ACCENT = "#AFCA0B";

const DOCTORS = [
  {
    slug: "diana-storinoz",
    name: "Dra. Diana Storino",
    role: "Endocrino",
    specialty: "Consulta de endocrinología y obesidad",
    image:
      "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253397/2_swjp7l.png",
  },
  {
    slug: "pablo-carmona",
    name: "Dr. Pablo Carmona Diaz Salazar",
    role: "Medicina Familiar y Comunitaria",
    specialty: "Especialista en Medicina Familiar y Comunitaria",
    image:
      "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253396/1_ujihn0.png",
  },
  {
    slug: "mirko-solano",
    name: "Dr. Mirko Solano",
    role: "Medico general y cirujano",
    specialty: "Medicina general y cirugía ambulatoria",
    image:
      "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757280531/Untitled_design_30_vwumus.png",
  },
  {
    slug: "gema-paz",
    name: "Gema de Paz López",
    role: "Psicólogo",
    specialty: "Psicología general sanitaria",
    image:
      "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1759436256/Untitled_design_33_bo3vt6.png",
  },
  {
    slug: "juan-carlos-fernandez",
    name: "Juan Carlos Fernández Molera",
    role: "Psicólogo",
    specialty: "Perfil en actualización",
    image: "",
  },
  {
    slug: "proximamente",
    name: "",
    role: "Nuevo especialista",
    specialty: "Próximamente se unirán nuevos especialistas",
    image: "",
    comingSoon: true,
  },
];

const ORDER = [
  "pablo-carmona",
  "diana-storinoz",
  "mirko-solano",
  "gema-paz",
  "juan-carlos-fernandez",
  "proximamente",
];

const clinic = {
  name: "Sanital",
  url: "https://www.sanital.example",
  address: {
    streetAddress: "Calle del Rio 8",
    addressLocality: "Ciudad Real",
    addressRegion: "Castilla-La Mancha",
    addressCountry: "ES",
  },
  areaServed: "Ciudad Real, Castilla-La Mancha, España",
};

export default function Team() {
  const [active, setActive] = useState(null);
  const [openSuggest, setOpenSuggest] = useState(false);

  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined" && window.location?.origin)
      return window.location.origin;
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
      name: "Equipo médico",
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
            address: clinic.address,
            areaServed: clinic.areaServed,
          },
          areaServed: clinic.areaServed,
        },
      })),
    };
  }, [baseUrl, renderDoctors]);

  return (
    <section
      id="equipo"
      aria-labelledby="equipo-heading"
      className="relative py-10 mt-8 bg-gradient-to-b from-white via-[rgba(0,157,152,0.1)] to-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-6 h-16 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,157,152,0.22),rgba(0,157,152,0))]"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container px-4 sm:px-6 lg:px-8">
        <h2
          id="equipo-heading"
          className="mb-8 text-center text-2xl font-bold sm:mb-10 sm:text-3xl"
          style={{ color: BRAND_PRIMARY }}
        >
          Nuestro equipo médico
        </h2>

        <p className="sr-only">
          Conoce a nuestro equipo médico de Sanital en Ciudad Real,
          Castilla-La Mancha: especialistas colegiados con atención cercana.
        </p>

        <ul
          aria-label="Tarjetas del equipo médico"
          className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {renderDoctors.map((d) => (
            <DoctorCard key={d.slug} d={d} onMore={setActive} onSuggest={setOpenSuggest} />
          ))}
        </ul>
      </div>

      <Suspense fallback={null}>
        <DoctorDialog
          id="doctor-dialog"
          open={!!active}
          onClose={() => setActive(null)}
          doctor={active}
        />
      </Suspense>

      <SuggestServiceDialog open={openSuggest} onClose={() => setOpenSuggest(false)} />
    </section>
  );
}

