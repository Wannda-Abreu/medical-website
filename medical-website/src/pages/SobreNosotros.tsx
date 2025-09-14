import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet-async";
import TeamBanner from "../components/TeamBanner";

export default function SobreNosotros() {
  const heroUrl =
    "https://res.cloudinary.com/dfq9eaz2e/image/upload/f_auto,q_auto,c_fill,g_auto,w_1600,h_700/v1755546332/ChatGPT_Image_18_ago_2025_21_24_24_l4pkpb_e_background_removal_f_png_drpvr7.png";

  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <Navbar />

      <header
        className="relative isolate"
        style={{
          minHeight: "44vh",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.35)), url('${heroUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      >
        <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24 text-white">
          <div className="inline-block max-w-2xl rounded-2xl bg-black/35 backdrop-blur px-5 py-4 ring-1 ring-white/20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Sobre nosotros</h1>
            <p className="mt-3 text-[15px] md:text-base text-white/90">
              Conoce la historia, el equipo y nuestra forma de trabajar. Atención cercana, especialistas colegiados y cita online.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://booking.slotspot.app/sanital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-[#009D98] hover:bg-[#007E7A] px-5 py-2.5 text-white font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Agendar cita
              </a>
              <a
                href="/#contacto"
                className="inline-flex items-center justify-center rounded-lg border border-white/60 px-5 py-2.5 text-white font-semibold hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                Contacto
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <Helmet>
          <title>Sobre nosotros | Sanital</title>
          <link rel="canonical" href="https://www.sanital.es/sobre-nosotros" />
          <meta name="description" content="Conoce la historia, el equipo y la forma de trabajar de Clínica Sanital en Daimiel. Atención cercana, especialistas colegiados y cita online." />
        </Helmet>

        <TeamBanner />

        <section className="prose prose-zinc max-w-none prose-p:leading-7">
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
