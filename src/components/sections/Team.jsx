import { useMemo, useState, memo } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Info, Stethoscope } from "lucide-react";
import DoctorDialog from "../common/DoctorDialog";

const DOCTORS = [
  {
    slug: "diana-storinoz",
    name: "Dra. Diana Storino",
    role: "Endocrino",
    specialty: "Consulta endocrinología y obesidad",
    image:
      "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253397/2_swjp7l.png",
  },
  {
    slug: "pablo-carmona",
    name: "Dr. Pablo Carmona Díaz Salazar",
    role: "Atención primaria",
    specialty: "Atención Primaria",
    image:
      "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253396/1_ujihn0.png",
  },
  {
    slug: "mirko-solano",
    name: "Dr. Mirko Solano",
    role: "Cirujano",
    specialty: "Cirugía",
    image:
      "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757197011/Untitled_design_19_h0bvaj.png",
  },
];

const ORDER = ["pablo-carmona", "diana-storinoz", "mirko-solano"];

const CLOUDINARY_TRANSFORMS =
  "f_auto,q_auto:good,dpr_auto,e_improve,e_auto_contrast,e_auto_color,e_sharpen:60";

function cld(url, w) {
  if (!url) return url;
  try {
    if (url.includes("/upload/")) {
      const inject = `/upload/${CLOUDINARY_TRANSFORMS},w_${w}/`;
      return url.replace(/\/upload\/.*?\//, inject);
    }
    return url;
  } catch (e) {
    return url;
  }
}

const widths = [320, 480, 640, 960, 1280];

function buildSrcSets(imageUrl) {
  const src = cld(imageUrl, 640);
  const srcSet = widths.map((w) => `${cld(imageUrl, w)} ${w}w`).join(", ");
  return { src, srcSet };
}

const clinic = {
  name: "Sanital",
  url: "https://www.sanital.example",
  address: {
    streetAddress: "Calle Orquídea 20",
    addressLocality: "Daimiel",
    addressRegion: "Castilla-La Mancha",
    addressCountry: "ES",
  },
  areaServed: "Daimiel, Castilla-La Mancha, España",
};

const DoctorCard = memo(function DoctorCard({ d, onMore }) {
  const { src, srcSet } = buildSrcSets(d.image);

  return (
    <li className="flex justify-center" key={d.slug}>
      <motion.article
        id={d.slug}
        itemScope
        itemType="https://schema.org/Physician"
        className="group relative w-full max-w-[22rem] p-[1px] rounded-2xl bg-gradient-to-br from-primary/40 to-emerald-400/30 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg/30 motion-reduce:transform-none"
        aria-label={`${d.name}, ${d.role}`}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="rounded-2xl bg-primary/5 border border-primary/20 p-5">
          {/* Halo decorativo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-5 -z-0 h-16 rounded-3xl bg-primary/20 blur-3xl"
          />

          {/* Imagen */}
          <figure className="relative z-10 mx-auto h-[300px] w-full rounded-xl ring-1 ring-primary/20 shadow-md overflow-hidden bg-primary/5">
            <motion.img
              src={src}
              srcSet={srcSet}
              sizes="(min-width: 640px) 22rem, 90vw"
              alt={`${d.name}, ${d.role}`}
              itemProp="image"
              loading="lazy"
              decoding="async"
              width={352}
              height={300}
              className="block h-full w-full object-cover filter contrast-105 saturate-110 brightness-[1.03] drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)] transition-transform duration-300 will-change-transform group-hover:scale-[1.015] motion-reduce:transform-none"
              whileHover={{ scale: 1.015 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(255,255,255,0)_60%,rgba(46,125,50,0.06)_100%)]" />
            {/* Badge rol */}
            <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs font-medium text-foreground shadow-sm ring-1 ring-black/5 backdrop-blur">
              <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{d.role}</span>
            </div>
            <figcaption className="sr-only">
              {d.name}, {d.role} â€” {d.specialty}
            </figcaption>
          </figure>

          {/* Contenido */}
          <div className="mt-4 text-center">
            <h3 itemProp="name" className="text-lg font-semibold text-primary">
              {d.name}
            </h3>
            <p className="mt-0.5 text-[0.92rem] font-medium text-foreground/80">
              {d.specialty}
            </p>
            {/* Mantener specialty para SEO */}
            <meta itemProp="medicalSpecialty" content={d.specialty} />
          </div>

          {/* Acciones */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="https://booking.slotspot.app/sanital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:scale-[1.04] hover:text-white hover:shadow-md hover:from-primary-700 hover:to-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-reduce:transform-none"
              aria-label={`Agendar cita con ${d.name}`}
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Agendar cita
            </a>

            <motion.button
              type="button"
              onClick={() => onMore(d)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/40 bg-white px-4 py-2 text-sm font-semibold text-accent shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-[1.05] hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 motion-reduce:transform-none"
              aria-haspopup="dialog"
              aria-controls="doctor-dialog"
              aria-label={`Saber más sobre ${d.name}`}
              whileTap={{ scale: 0.96 }}
            >
              <Info className="h-4 w-4" aria-hidden="true" />
              Saber más
            </motion.button>
          </div>

          <meta itemProp="jobTitle" content={d.role} />
          <meta itemProp="url" content={`/equipo#${d.slug}`} />

          <span className="pointer-events-none absolute inset-x-5 bottom-0 h-0.5 origin-left scale-x-0 bg-primary/70 transition-transform duration-200 group-hover:scale-x-100" />
        </div>
      </motion.article>
    </li>
  );
});

export default function Team() {
  const [active, setActive] = useState(null);

  const baseUrl = useMemo(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin;
    }
    return clinic.url; // fallback SSR
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
    <section
      id="equipo"
      aria-labelledby="equipo-heading"
      className="relative py-8 mt-8 bg-gradient-to-b from-white via-primary/10 to-white"
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
        >
          Nuestro Equipo médico
        </h2>
        <p className="sr-only">
          Conoce a nuestro equipo médico de Sanital en Daimiel, Castilla-La
          Mancha: especialistas colegiados con atención cercana.
        </p>

        <ul
          aria-label="Tarjetas del equipo médico"
          className="mx-auto grid max-w-[1000px] grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {renderDoctors.map((d) => (
            <DoctorCard key={d.slug} d={d} onMore={setActive} />
          ))}
        </ul>
      </div>
      <DoctorDialog
        id="doctor-dialog"
        open={!!active}
        onClose={() => setActive(null)}
        doctor={active}
      />
    </section>
  );
}




