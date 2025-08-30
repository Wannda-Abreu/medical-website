import { Stethoscope, TestTubes, CheckCircle2, CalendarCheck, Info } from "lucide-react";

const services = [
  {
    slug: "atencion-primaria",
    icon: Stethoscope,
    title: "Atención Primaria",
    desc: "Chequeos, primeros diagnósticos y seguimiento de patologías comunes.",
    bullets: ["Prevención y educación en salud", "Derivación a especialista si procede"],
    doctorName: "Dr. Pablo Carmona Díaz Salazar",
    doctorSlug: "pablo-carmona",
  },
  {
    slug: "endocrinologia",
    icon: TestTubes,
    title: "Endocrinología",
    desc: "Diagnóstico y control de diabetes, tiroides, sobrepeso/obesidad y metabolismo.",
    bullets: ["Plan personalizado y control continuo", "Analíticas y ajuste de tratamiento"],
    doctorName: "Dra. Diana Storino",
    doctorSlug: "diana-storinoz",
  },
];

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
    <section id="servicios" aria-labelledby="servicios-heading" className="relative bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container py-3 md:py-3">
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
          <h2 id="servicios-heading" className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Nuestros servicios
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Cuidado sanitario cercano y profesional, ofrecido por nuestro equipo médico en Ciudad Real.
          </p>
        </header>

        <ul aria-label="Listado de servicios de la clínica" className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map(({ slug, icon: Icon, title, desc, bullets, doctorName, doctorSlug }) => (
            <li key={slug}>
              <article
                id={slug}
                aria-labelledby={`${slug}-title`}
                className="group relative rounded-2xl border border-emerald-100 bg-emerald-50 p-6 md:p-8 shadow-[0_1px_0_rgba(0,0,0,0.02)] transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg/30"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-emerald-600 text-white shadow-sm" aria-hidden="true">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 id={`${slug}-title`} className="text-lg font-semibold text-emerald-900">
                    {title}
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-emerald-900/80">{desc}</p>

                <p className="mt-3 text-sm font-medium text-emerald-900">
                  Profesional: <span className="font-semibold">{doctorName}</span>
                </p>

                <ul className="mt-4 space-y-2 text-sm text-emerald-900/80">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="https://booking.slotspot.app/sanital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.04] hover:shadow-md hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 active:scale-100"
                    aria-label={`Agendar cita para ${title}`}
                    title="Agendar cita"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    Agendar cita
                  </a>

                  <a
                    href={`#${doctorSlug}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-emerald-700/30 bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-800 backdrop-blur-[2px] transition-all duration-150 hover:scale-[1.03] hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/30"
                    aria-label={`Saber más sobre ${title} con ${doctorName}`}
                    title={`Ver especialista: ${doctorName}`}
                  >
                    <Info className="h-4 w-4" />
                    Saber más
                  </a>
                </div>

                <span className="pointer-events-none absolute inset-x-6 bottom-0 h-0.5 origin-left scale-x-0 bg-emerald-600/70 transition-transform duration-200 group-hover:scale-x-100" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
