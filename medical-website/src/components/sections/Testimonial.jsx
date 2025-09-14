import { useState } from "react";
import { User2, Star, StarHalf } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";

const testimonials = [
  { name: "María López", role: "Paciente", text: "La atención fue excelente, me sentí acompañada en todo momento.", image: "/patient1.jpg", rating: 5 },
  { name: "Carlos Ramírez", role: "Paciente", text: "Un equipo médico profesional y humano. Muy agradecido.", image: "/patient2.jpg", rating: 4.5 },
  { name: "Laura Sánchez", role: "Paciente", text: "Instalaciones modernas y un trato cercano. 100% recomendable.", image: "/patient3.jpg", rating: 5 },
];

function Stars({ rating = 5 }) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center justify-center gap-1" aria-label={`Valoración ${rating} de 5`} title={`Valoración ${rating} / 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f${i}`} className="h-4 w-4 fill-accent text-accent" />
      ))}
      {hasHalf && <StarHalf className="h-4 w-4 fill-accent text-accent" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} className="h-4 w-4 text-accent/30" />
      ))}
    </div>
  );
}

function Avatar({ src, alt, name }) {
  const [errored, setErrored] = useState(false);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden shadow-sm">
      {!errored ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setErrored(true)}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="text-primary font-semibold">{initials}</span>
      )}
    </div>
  );
}

const Testimonials = () => {
  return (
    <section id="testimonios" className="relative py-14 md:py-16 bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle title="Testimonios" subtitle="Lo que nuestros pacientes dicen sobre nosotros" />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="text-center p-6 relative overflow-hidden border border-primary/15 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 hover:shadow-lg transition-shadow"
            >
              <Avatar src={t.image} alt={t.name} name={t.name} />

              <p className="mt-4 text-muted-foreground leading-relaxed">«{t.text}»</p>

              <div className="mt-3">
                <Stars rating={t.rating} />
              </div>

              <h3 className="mt-4 text-lg font-semibold flex items-center justify-center gap-2">
                <User2 className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
                {t.name}
              </h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

