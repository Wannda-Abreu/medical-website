import { useEffect, useRef, useMemo } from "react";
import { X, CalendarCheck } from "lucide-react";

export default function DoctorDialog({ open, onClose, doctor }) {
  const panelRef = useRef(null);
  const openerRef = useRef(typeof document !== "undefined" ? document.activeElement : null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      openerRef.current?.focus?.();
    };
  }, [open, onClose]);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://www.sanital.example";

  const category = useMemo(() => {
    if (!doctor) return "general";
    const txt = `${doctor.role || ""} ${doctor.specialty || ""}`.toLowerCase();
    if (txt.includes("endocr")) return "endocrino";
    if (txt.includes("primaria") || txt.includes("familia")) return "ap";
    return "general";
  }, [doctor]);

  const copy = useMemo(() => {
    if (category === "endocrino") {
      return {
        intro: "Atención especializada en endocrinología, obesidad y metabolismo con enfoque integral y seguimiento cercano.",
        atiende: [
          "Diabetes tipo 1 y 2, prediabetes y resistencia a la insulina",
          "Trastornos de tiroides (hipo/hiper, nódulos)",
          "Obesidad y nutrición clínica",
          "Dislipemias y síndrome metabólico",
          "Trastornos hormonales (suprarrenal, hipófisis)"
        ],
        primera: [
          "Historia clínica endocrina y revisión de hábitos",
          "Revisión de analíticas previas y solicitud de pruebas",
          "Plan personalizado (tratamiento, nutrición y seguimiento)"
        ]
      };
    }
    if (category === "ap") {
      return {
        intro: "Atención primaria centrada en prevención, seguimiento de crónicos y resolución de problemas de salud frecuentes.",
        atiende: [
          "Chequeos y revisiones de salud",
          "Hipertensión, control de peso y riesgo cardiovascular",
          "Infecciones leves y curas",
          "Salud familiar y educación sanitaria",
          "Derivación a especialista cuando procede"
        ],
        primera: [
          "Historia clínica completa y exploración básica (TA, IMC)",
          "Revisión de informes y medicación habitual",
          "Plan de cuidado y próximos pasos claros"
        ]
      };
    }
    return {
      intro: "Atención médica con enfoque preventivo y seguimiento cercano.",
      atiende: [
        "Revisiones y chequeos integrales",
        "Control de factores de riesgo",
        "Infecciones frecuentes y curas",
        "Educación sanitaria y hábitos",
        "Derivación a especialistas"
      ],
      primera: [
        "Historia clínica y exploración básica",
        "Revisión de informes previos",
        "Plan de cuidado personalizado"
      ]
    };
  }, [category]);

  const jsonLd = useMemo(() => {
    if (!doctor) return null;
    const schemaSpecialty =
      category === "endocrino" ? "Endocrinology" :
      category === "ap" ? "PrimaryCare" : "MedicalSpecialty";
    return {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": `${baseUrl}/equipo#${doctor.slug}`,
      url: `${baseUrl}/equipo#${doctor.slug}`,
      name: doctor.name,
      image: doctor.image,
      medicalSpecialty: schemaSpecialty,
      description: doctor.specialty || doctor.role,
      areaServed: "Tomelloso, Castilla-La Mancha, España",
      worksFor: {
        "@type": "MedicalClinic",
        name: "Sanital",
        url: baseUrl,
        address: "Tomelloso, Castilla-La Mancha, España",
        areaServed: "Tomelloso, Castilla-La Mancha, España"
      },
      potentialAction: {
        "@type": "ReserveAction",
        target: "https://booking.slotspot.app/sanital"
      }
    };
  }, [doctor, baseUrl, category]);

  if (!open || !doctor) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <button aria-label="Cerrar" onClick={onClose} className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="doctor-title"
        aria-describedby="doctor-desc"
        ref={panelRef}
        tabIndex={-1}
        className="fixed inset-x-0 bottom-0 z-[95] max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:inset-0 sm:m-auto sm:h-auto sm:max-w-lg sm:rounded-2xl"
        itemScope
        itemType="https://schema.org/Physician"
      >
        <meta itemProp="url" content={`${baseUrl}/equipo#${doctor.slug}`} />
        <div className="flex items-start justify-between gap-4">
          <h3 id="doctor-title" className="text-xl font-semibold text-gray-900" itemProp="name">
            {doctor.name} · <span className="text-emerald-700" itemProp="medicalSpecialty">{doctor.role}</span>
          </h3>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4">
          <div className="mx-auto w-fit rounded-2xl ring-1 ring-emerald-200 bg-emerald-50 p-1.5">
            <img
              src={doctor.image}
              alt={`${doctor.name}, ${doctor.role}`}
              itemProp="image"
              width={140}
              height={140}
              className="block w-[120px] sm:w-[140px] h-auto rounded-xl object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div id="doctor-desc" className="mt-5 space-y-4 text-sm text-gray-700">
          <p className="leading-relaxed">{copy.intro}</p>
          <div>
            <h4 className="font-semibold text-emerald-900">Qué atiende</h4>
            <ul className="mt-2 space-y-1">
              {copy.atiende.map((t) => <li key={t}>• {t}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-emerald-900">Primera visita</h4>
            <ul className="mt-2 space-y-1">
              {copy.primera.map((t) => <li key={t}>• {t}</li>)}
            </ul>
          </div>
          <span itemProp="worksFor" itemScope itemType="https://schema.org/MedicalClinic" className="sr-only">
            <meta itemProp="name" content="Sanital" />
            <meta itemProp="address" content="Tomelloso, Castilla-La Mancha, España" />
            <meta itemProp="areaServed" content="Tomelloso, Castilla-La Mancha, España" />
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.03] hover:shadow-md"
          >
            <CalendarCheck className="h-4 w-4" />
            Agendar cita
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-900 shadow-sm transition hover:bg-emerald-100 hover:ring-2 hover:ring-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <X className="h-4 w-4" />
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
