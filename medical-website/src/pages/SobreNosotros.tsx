import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";
import TeamBanner from "../components/TeamBanner";

export default function SobreNosotros() {
  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <Navbar />

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <Helmet>
          <title>Sobre nosotros | Sanital</title>
          <link rel="canonical" href="https://www.sanital.es/sobre-nosotros" />
          <meta
            name="description"
            content="Conoce la historia, el equipo y la forma de trabajar de Clínica Sanital en Daimiel. Atención cercana, especialistas colegiados y cita online."
          />
        </Helmet>

        <TeamBanner />

        <section className="prose prose-zinc max-w-none prose-p:leading-7 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">Qué encontrarás en nuestra clínica</h2>
          <p>
            Trabajamos con estándares de calidad y seguridad para que cada visita aporte valor real a tu salud. Tanto en endocrinología como en
            atención primaria, serás atendido por especialistas colegiados que escuchan, explican el plan terapéutico y resuelven dudas con un
            lenguaje claro. Promovemos hábitos saludables y revisiones periódicas para que avances a tu ritmo y con confianza.
          </p>
          <p>
            Sabemos que la rapidez y la coordinación son clave. Contamos con agendas flexibles, recordatorios y comunicación directa. Si necesitas
            continuidad, diseñamos un plan de seguimiento con hitos y objetivos realistas adaptados a tu día a día.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">Servicios y equipo a tu alcance</h2>
          <p>
            Conoce todas nuestras especialidades en <a className="text-primary hover:underline" href="/#servicios">servicios</a> y descubre a los profesionales en
            <a className="text-primary hover:underline" href="/#equipo"> equipo</a>. En <a className="text-primary hover:underline" href="/#contacto">contacto</a> encontrarás teléfono, correo y un formulario de consulta rápida.
          </p>
          <p>
            Si lo prefieres, agenda tu cita online en
            <a className="text-primary hover:underline" href="https://booking.slotspot.app/sanital" target="_blank" rel="noopener noreferrer">
              nuestra plataforma de reservas
            </a>
            y recibirás confirmación inmediata.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

