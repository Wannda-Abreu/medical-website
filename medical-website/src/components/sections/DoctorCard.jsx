import { memo } from "react";
import { CalendarCheck, Info, Stethoscope, User } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { cldEco as cld, srcsetEco as srcset } from "@/lib/cld";

const BRAND_PRIMARY = "#009D98";
const BRAND_ACCENT = "#AFCA0B";

function buildSrcSets(imageUrl) {
  const src = cld(imageUrl, 640, true);
  const srcSet = srcset(imageUrl, [360, 480, 640], true);
  return { src, srcSet };
}

const roleTone = {
  "Medicina Familiar y Comunitaria": `bg-[${BRAND_ACCENT}]/10 text-[${BRAND_ACCENT}] ring-[${BRAND_ACCENT}]/30`,
  Endocrino: `bg-[${BRAND_PRIMARY}]/10 text-[${BRAND_PRIMARY}] ring-[${BRAND_PRIMARY}]/30`,
  Cirujano: `bg-white/80 text-zinc-800 ring-black/5`,
  Psicólogo: `bg-purple-100 text-purple-700 ring-purple-300`,
  "Nuevo especialista": `bg-zinc-100 text-zinc-600 ring-zinc-300`,
};

const DoctorCard = memo(function DoctorCard({ d, onMore, onSuggest }) {
  const { src, srcSet } = d.image
    ? buildSrcSets(d.image)
    : { src: "", srcSet: "" };
  const tone = roleTone[d.role] || `bg-white/80 text-zinc-800 ring-black/5`;

  const isNoImage = !d.image && !d.comingSoon;

  return (
    <li className="flex justify-center">
      <article
        id={d.slug}
        itemScope
        itemType="https://schema.org/Physician"
        className="group relative w-full max-w-[26rem] rounded-2xl border border-zinc-200 shadow-[0_1px_0_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg/30 motion-reduce:transform-none animate-slideDownFade"
        aria-label={`${d.name}, ${d.role}`}
      >
        <div className="rounded-2xl border border-zinc-100 bg-transparent p-6 flex flex-col h-full">
          <figure className="relative z-10 mx-auto h-[300px] w-full rounded-xl ring-1 ring-[rgba(0,157,152,0.15)] shadow-sm overflow-hidden bg-gradient-to-b from-white via-[rgba(0,157,152,0.08)] to-white">
            {d.comingSoon ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="flex flex-col items-center gap-3 animate-fadeIn">
                  <div className="rounded-full bg-[rgba(0,157,152,0.1)] p-4">
                    <Stethoscope className="h-10 w-10 text-[rgba(0,157,152,1)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[rgba(0,157,152,1)]">
                    Próximamente
                  </h3>
                  <p className="text-sm text-zinc-700">
                   Se unirán nuevos especialistas
                  </p>
                </div>
              </div>
            ) : d.image ? (
              <SmartImage
                src={src}
                srcSet={srcSet}
                sizes="(min-width: 640px) 416px, 90vw"
                alt={`${d.name}, ${d.role}`}
                width={416}
                height={300}
                className="block h-full w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-[1.01] motion-reduce:transform-none"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="flex flex-col items-center gap-3 animate-fadeIn">
                  <div className="rounded-full bg-[rgba(0,157,152,0.1)] p-4">
                    <User className="h-10 w-10 text-[rgba(0,157,152,1)]" />
                  </div>
                </div>
              </div>
            )}

            {d.role && (
              <div
                className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium shadow-sm ring-1 backdrop-blur ${tone}`}
              >
                <Stethoscope className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{d.role}</span>
              </div>
            )}
          </figure>

          {/* Info para doctores sin imagen (ej. Juan Carlos) */}
          {isNoImage && (
            <div className="mt-5 text-center">
              {d.name && (
                <h3
                  itemProp="name"
                  className="text-xl font-semibold tracking-tight"
                  style={{ color: BRAND_PRIMARY }}
                >
                  {d.name}
                </h3>
              )}
              <p className="mt-1 text-[0.95rem] font-medium text-foreground/80">
                {d.specialty}
              </p>
            </div>
          )}

          {/* Info para doctores con imagen */}
          {d.image && (
            <div className="mt-5 text-center">
              {d.name && (
                <h3
                  itemProp="name"
                  className="text-xl font-semibold tracking-tight"
                  style={{ color: BRAND_PRIMARY }}
                >
                  {d.name}
                </h3>
              )}
              {!d.comingSoon && (
                <p className="mt-1 text-[0.95rem] font-medium text-foreground/80">
                  {d.specialty}
                </p>
              )}
            </div>
          )}

          {/* Info para tarjeta Próximamente */}
          {d.comingSoon && (
            <div className="mt-5 text-center">
              <p className="mt-1 text-[0.95rem] font-medium text-foreground/80">
                Estamos trabajando para ofrecerte más opciones de cuidado.
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="mt-auto pt-10 pb-6 flex flex-col items-center gap-3">
            {!d.comingSoon ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <a
                  href="https://booking.slotspot.app/sanital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.04] hover:shadow-md hover:from-primary-700 hover:to-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-100 hover:text-white"
                  aria-label={`Agendar cita con ${d.name}`}
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                  Agendar cita
                </a>

                <button
                  type="button"
                  onClick={() => onMore(d)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-accent/30 bg-white/70 px-4 py-2 text-sm font-semibold text-accent backdrop-blur-[2px] transition-all duration-150 hover:scale-[1.03] hover:bg-accent/10 hover:text-accent hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
                  aria-haspopup="dialog"
                  aria-controls="doctor-dialog"
                  aria-label={`Saber más sobre ${d.name}`}
                >
                  <Info className="h-4 w-4" aria-hidden="true" />
                  Saber más
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onSuggest(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:scale-[1.04] hover:shadow-md hover:from-primary-700 hover:to-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-100 hover:text-white"
              >
                Sugiere un servicio
              </button>
            )}
          </div>
        </div>
      </article>
    </li>
  );
});

export default DoctorCard;

