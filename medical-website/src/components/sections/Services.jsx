import {
  Stethoscope,
  TestTubes,
  HeartPulse,
  CheckCircle2,
  CalendarCheck,
  Info,
} from "lucide-react";

const services = [
  {
    slug: "atencion-primaria",
    icon: Stethoscope,
    title: "Atención Primaria",
    desc: "Chequeos, primeros diagnósticos y seguimiento de patologías comunes.",
    bullets: [
      "Prevención y educación en salud",
      "Derivación a especialista si procede",
    ],
    doctorName: "Dr. Pablo Carmona Díaz Salazar",
    doctorSlug: "pablo-carmona",
  },
  {
    slug: "endocrinologia",
    icon: TestTubes,
    title: "Endocrinología",
    desc: "Tratamiento personalizado en nutrición, obesidad y acompañamiento para deportistas.",
    bullets: [
      "Plan personalizado y control continuo",
      "Analíticas y ajuste de tratamiento",
    ],
    doctorName: "Dra. Diana Storino",
    doctorSlug: "diana-storinoz",
  },
];

services.push({
  slug: "cirugia",
  icon: HeartPulse,
  title: "Medicina general y cirugía ambulatoria",
  desc: "Atención domiciliaria a demanda y de urgencia.",
  bullets: [
    "Atención personalizada a pie de cama",
    "Cirugía menor y curas avanzadas",
    "Valoración preoperatoria y seguimiento postoperatorio",
  ],
  doctorName: "Dr. Mirko Solano Aldana",
  doctorSlug: "mirko-solano",
});

export default function Services() {
  const servicesSchema = services.map((s, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "Service",
      name: s.title,
      serviceType: s.title,
      description: s.desc,
      areaServed: "Ciudad Real, Castilla-La Mancha, España",
      provider: { "@type": "MedicalClinic", name: "Sanital" },
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios médicos",
    itemListElement: servicesSchema,
  };

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="relative bg-gradient-to-b from-white via-primary/10 to-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-6 h-16 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(0,157,152,0.2),rgba(0,157,152,0))]"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container py-3 md:py-3">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <h2
            id="servicios-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            Nuestros servicios
          </h2>
        </header>

        <ul
          aria-label="Listado de servicios de la clínica"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map(
            ({
              slug,
              icon: Icon,
              title,
              desc,
              bullets,
              doctorName,
              doctorSlug,
            }) => (
              <li key={slug}>
                <article
                  id={slug}
                  aria-labelledby={`${slug}-title`}
                  className="group relative flex flex-col h-full rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg/30"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-sm"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3
                      id={`${slug}-title`}
                      className="text-xl font-bold text-primary"
                    >
                      {title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-gray-700">
                    {desc}
                  </p>

                  <p className="mt-3 text-sm font-medium text-gray-800">
                    Profesional: <span className="font-semibold">{doctorName}</span>
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2">
                        <CheckCircle2
                          className="h-4 w-4 text-primary"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                    <a
                      href="https://booking.slotspot.app/sanital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.04] hover:shadow-md hover:from-primary-700 hover:to-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-100 hover:text-white"
                      aria-label={`Agendar cita para ${title}`}
                      title="Agendar cita"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Agendar cita
                    </a>

                    <a
                      href={`#${doctorSlug}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-white/70 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-[2px] transition-all duration-150 hover:scale-[1.03] hover:bg-accent/10 hover:text-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                      aria-label={`Saber más sobre ${title} con ${doctorName}`}
                      title={`Ver especialista: ${doctorName}`}
                    >
                      <Info className="h-4 w-4" />
                      Saber más
                    </a>
                  </div>

                  <span className="pointer-events-none absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-primary/70 transition-transform duration-200 group-hover:scale-x-100" />
                </article>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
