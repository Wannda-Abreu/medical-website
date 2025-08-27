import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";

const testimonials = [
  {
    name: "María López",
    role: "Paciente",
    text: "La atención fue excelente, me sentí acompañada en todo momento.",
    image: "/patient1.jpg",
  },
  {
    name: "Carlos Ramírez",
    role: "Paciente",
    text: "Un equipo médico profesional y humano. Muy agradecido.",
    image: "/patient2.jpg",
  },
  {
    name: "Laura Sánchez",
    role: "Paciente",
    text: "Instalaciones modernas y un trato cercano. 100% recomendable.",
    image: "/patient3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Testimonios"
          subtitle="Lo que nuestros pacientes dicen sobre nosotros"
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {testimonials.map((t, index) => (
            <Card key={index} className="text-center">
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 mx-auto rounded-full object-cover"
              />
              <p className="mt-4 text-muted-foreground">“{t.text}”</p>
              <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
