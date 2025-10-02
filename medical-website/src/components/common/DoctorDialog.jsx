import { useEffect, useRef, useMemo } from "react";
import { X, CalendarCheck, User } from "lucide-react";
import { useFocusTrap } from "../../utils/focusTrap";
import { useGlobalInert } from "../../utils/globalInert";
import { useScrollLock } from "../../utils/scrollLock";
import SmartImage from "@/components/SmartImage";

export default function DoctorDialog({ open, onClose, doctor }) {
  const panelRef = useRef(null);
  const openerRef = useRef(
    typeof document !== "undefined" ? document.activeElement : null
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      openerRef.current?.focus?.();
    };
  }, [open, onClose]);

  useFocusTrap(panelRef, open);
  useGlobalInert(open);
  useScrollLock(open, "doctor-dialog");

  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://www.sanital.es";

  const isPsychologist =
    doctor?.slug === "gema-paz" || doctor?.slug === "juan-carlos-fernandez";

  const copy = useMemo(() => {
    if (!doctor) return null;

    if (isPsychologist) {
      return {
        intro:
          "Atención psicológica centrada en el bienestar emocional, la salud mental y el crecimiento personal.",
        atiende: [
          "Ansiedad, estrés y depresión",
          "Terapia individual y de pareja",
          "Problemas de autoestima y desarrollo personal",
          "Acompañamiento en procesos vitales y duelos",
          "Evaluación psicológica y orientación",
        ],
        primera: [
          "Entrevista clínica para conocer tu situación",
          "Identificación de objetivos terapéuticos",
          "Diseño de un plan de intervención personalizado",
        ],
      };
    }

    return {
      intro: "Atención médica con enfoque preventivo y seguimiento cercano.",
      atiende: [
        "Revisiones y chequeos integrales",
        "Control de factores de riesgo",
        "Infecciones frecuentes y curas",
        "Educación sanitaria y hábitos",
        "Derivación a especialistas",
      ],
      primera: [
        "Historia clínica y exploración básica",
        "Revisión de informes previos",
        "Plan de cuidado personalizado",
      ],
    };
  }, [doctor, isPsychologist]);

  if (!open || !doctor || !copy) return null;

  const isNoImage = !doctor.image;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        ref={panelRef}
        tabIndex={-1}
        className="fixed inset-x-0 bottom-0 z-[95] max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:inset-0 sm:m-auto sm:h-auto sm:max-w-lg sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {doctor.name} — <span className="text-primary">{doctor.role}</span>
          </h3>
          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <figure
            className="mx-auto relative rounded-2xl p-0 bg-transparent shadow-none"
            aria-label="Foto del profesional"
          >
            <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] overflow-hidden rounded-full ring-2 ring-primary/25 ring-offset-2 ring-offset-white bg-gradient-to-b from-white to-primary/10 flex items-center justify-center">
              {isNoImage ? (
                <User className="h-20 w-20 text-primary opacity-80" />
              ) : (
                <SmartImage
                  src={doctor.image}
                  alt={`${doctor.name}, ${doctor.role}`}
                  width={220}
                  height={220}
                  className="block w-full h-full object-cover rounded-full"
                />
              )}
            </div>
          </figure>
        </div>

        <div className="mt-5 space-y-4 text-sm text-gray-700">
          <p className="leading-relaxed">{copy.intro}</p>

          <div>
            <h4 className="font-semibold text-primary">Qué atiende</h4>
            <ul className="mt-2 space-y-1">
              {copy.atiende.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-primary">Primera visita</h4>
            <ul className="mt-2 space-y-1">
              {copy.primera.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:scale-[1.04] hover:shadow-md hover:from-primary-700 hover:to-primary-800 hover:text-white"
          >
            <CalendarCheck className="h-4 w-4" />
            Agendar cita
          </a>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary shadow-sm transition hover:bg-primary/10 hover:ring-2 hover:ring-primary/20"
          >
            <X className="h-4 w-4" />
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
