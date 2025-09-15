import { useState, useMemo } from "react";
import { User2, Star, StarHalf } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import SmartImage from "@/components/SmartImage";
import Card from "../common/Card";

const DATA = [
  { name: "María López", role: "Paciente", text: "La atención fue excelente, me sentí acompañada en todo momento.", image: "/patient1.jpg", rating: 5 },
  { name: "Carlos Ramírez", role: "Paciente", text: "Un equipo médico profesional y humano. Muy agradecido.", image: "/patient2.jpg", rating: 4.5 },
  { name: "Laura Sánchez", role: "Paciente", text: "Instalaciones modernas y un trato cercano. 100% recomendable.", image: "/patient3.jpg", rating: 5 },
];

function resolveAsset(p) {
  try { return new URL(p, import.meta.env.BASE_URL).toString(); } catch { return p; }
}

function Stars({ rating = 5 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className="flex items-center justify-center gap-1" aria-label={`Valoración ${rating} de 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="h-4 w-4 fill-[#0b7f52] text-[#0b7f52]" />
      ))}
      {hasHalf && <StarHalf className="h-4 w-4 fill-[#0b7f52] text-[#0b7f52]" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 text-[#0b7f52]/20" />
      ))}
    </div>
  );
}

function Avatar({ name, src, showPhoto = false }) {
  const [errored, setErrored] = useState(false);
  const initials = useMemo(
    () => name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase(),
    [name]
  );
  const safeSrc = useMemo(() => resolveAsset(src || ""), [src]);

  return (
    <div className="w-24 h-24 mx-auto rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#ffffff_0%,#eaf6f3_100%)] border border-[#009D98]/20 shadow-sm grid place-items-center overflow-hidden">
      {showPhoto && safeSrc && !errored ? (
        <SmartImage
          src={safeSrc}
          alt={name}
          width={96}
          height={96}
          sizes="96px"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
        />
      ) : (
        <span className="text-[#0b7f52] font-semibold tracking-wide">{initials}</span>
      )}
    </div>
  );
}

export default function Testimonials() {
  const testimonials = useMemo(
    () => DATA.map(t => ({ ...t, image: resolveAsset(t.image), rating: Math.max(0, Math.min(5, Number(t.rating) || 0)) })),
    []
  );

  return (
    <section id="testimonios" className="relative py-14 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle title="Testimonios" subtitle="Lo que nuestros pacientes dicen sobre nosotros" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {testimonials.map((t, i) => (
            <Card
              key={`${t.name}-${i}`}
              className="text-center p-8 rounded-2xl border border-[#009D98]/15 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-shadow hover:shadow-lg"
            >
              <Avatar name={t.name} src={t.image} showPhoto={false} />
              <p className="mt-6 text-[#0b3b39] leading-relaxed text-lg">«{t.text}»</p>
              <div className="mt-4"><Stars rating={t.rating} /></div>
              <h3 className="mt-5 text-lg font-semibold flex items-center justify-center gap-2">
                <User2 className="w-4 h-4 text-[#0b3b39]" aria-hidden="true" />
                {t.name}
              </h3>
              <p className="text-sm text-[#0b3b39]/80">Paciente</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
