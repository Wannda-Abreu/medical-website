import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";
import MosaicHero from "../components/MosaicHero";

export default function SobreNosotros() {
  return (
    <div className="bg-white text-gray-800 font-sans antialiased">
      <Helmet>
        <title>Sobre nosotros | Sanital</title>
        <link rel="canonical" href="https://www.sanital.es/sobre-nosotros" />
        <meta
          name="description"
          content="Clínica Sanital en Ciudad Real: medicina cercana y multidisciplinar. Conoce nuestra filosofía, especialidades y equipo médico colegiado."
        />
      </Helmet>

      <Navbar />
      <MosaicHero
        images={[
          {
            src: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253397/2_swjp7l.png",
            alt: "Dra. Diana Storino – Endocrinología",
          },
              {
            src: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1759436256/Untitled_design_33_bo3vt6.png",
            alt: "Dr. Gema de Paz López – psicologa",
          },
             {
            src: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757280531/Untitled_design_30_vwumus.png",
            alt: "Dr. Mirko Solano – Cirugía",
          },
             {
            src: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253396/1_ujihn0.png",
            alt: "Dr. Pablo Carmona – Medicina Familiar",
          },
       

        ]}
        heading="Sobre Clínica Sanital"
        subheading="Unimos experiencia, tecnología y trato humano para tu cuidado."
      />

      <main className="container mx-auto max-w-4xl px-6 py-16 space-y-16 leading-relaxed">
        <section>
          <h1 className="text-4xl font-bold text-primary mb-6">
            Nuestra filosofía
          </h1>
          <p className="text-lg text-gray-700">
            En Sanital creemos en una medicina cercana y preventiva. Queremos
            que cada visita aporte valor real a tu bienestar, ya sea en
            <strong> Endocrinología</strong>, <strong>Medicina Familiar</strong>{" "}
            o <strong>Cirugía</strong>. Nuestro compromiso se resume en:
          </p>
          <ul className="mt-4 list-disc list-inside text-gray-700 space-y-1">
            <li>Escucha activa y comunicación clara</li>
            <li>Planes de cuidado personalizados</li>
            <li>Seguimiento continuo y ágil</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Cómo trabajamos
          </h2>
          <p className="text-lg text-gray-700">
            Desde la primera cita, cuidamos cada detalle para que la experiencia
            sea sencilla y humana:
          </p>
          <div className="grid gap-6 mt-6 md:grid-cols-3">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-2">Valoración inicial</h3>
              <p className="text-gray-700">Historia clínica y exploración completa para conocer tu situación.</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-2">Plan personalizado</h3>
              <p className="text-gray-700">Objetivos claros y tratamiento adaptado a tu estilo de vida.</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 shadow-sm transition hover:shadow-md">
              <h3 className="text-xl font-semibold text-primary mb-2">Revisión continua</h3>
              <p className="text-gray-700">Seguimiento con recordatorios y contacto directo con tu médico.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Especialidades y equipo
          </h2>
          <p className="text-lg text-gray-700">
            Descubre nuestras{" "}
            <a
              href="/#servicios"
              className="text-primary underline hover:text-primary/80"
            >
              especialidades
            </a>{" "}
            y conoce al{" "}
            <a
              href="/#equipo"
              className="text-primary underline hover:text-primary/80"
            >
              equipo médico colegiado
            </a>{" "}
            que te atenderá con trato cercano y profesional.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Por qué elegirnos
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Atención integral en un solo centro</li>
            <li>Agendas flexibles y cita online</li>
            <li>Equipamiento moderno y seguro</li>
            <li>Ubicación cómoda en el centro de Ciudad Real</li>
          </ul>
        </section>

        <section className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            ¿Listo para tu primera cita? Reserva en línea o contáctanos para más
            información.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://booking.slotspot.app/sanital"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-primary px-6 py-3 text-white font-semibold shadow hover:bg-primary-700 transition"
            >
              Agendar cita
            </a>
            <a
              href="/#contacto"
              className="rounded-lg border border-primary px-6 py-3 text-primary font-semibold hover:bg-primary hover:text-white transition"
            >
              Contacto
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

