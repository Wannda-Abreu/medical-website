import { Check } from "lucide-react";

const items = [
  { title: "Atención rápida", desc: "Sin largas esperas innecesarias." },
  { title: "Médicos especialistas", desc: "Amplia experiencia profesional." },
  { title: "Instalaciones modernas", desc: "Tecnología y confort." },
  { title: "Cuidado personalizado", desc: "Trato cercano y humano." },
];

export default function Benefits() {
  return (
    // SOLO esta sección usa gris muy claro
    <section id="beneficios" className="bg-[#f3f4f6]">
      <div className="container py-8 md:py-8">
        <header className="mb-8 text-center md:mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Beneficios
          </h2>
        </header>

        <ul
          aria-label="Lista de beneficios de la clínica"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {items.map(({ title, desc }) => (
            <li
              key={title}
              className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg/30"
            >
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-sm">
                <Check className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-center text-lg font-semibold text-gray-900">
                {title}
              </h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-gray-600">
                {desc}
              </p>

              <span className="pointer-events-none absolute inset-x-8 bottom-0 h-0.5 origin-left scale-x-0 bg-primary/70 transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
