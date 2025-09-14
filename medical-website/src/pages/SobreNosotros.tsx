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
        <meta name="description" content="Clínica Sanital: atenciÃ³n mÃ©dica cercana y multidisciplinar en Daimiel. Conoce a nuestro equipo y filosofía de trabajo." />
      </Helmet>

      <Navbar />

      <MosaicHero
        images={[
          { src: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253397/2_swjp7l.png", alt: "Dra. Diana Storino â€“ Endocrinología" },
          { src: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1756253396/1_ujihn0.png", alt: "Dr. Pablo Carmona â€“ Medicina Familiar" },
          { src: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757280531/Untitled_design_30_vwumus.png", alt: "Dr. Mirko Solano â€“ Cirugía" },
        ]}
        heading="Sobre Clínica Sanital"
        subheading="Unimos experiencia, tecnología y trato humano para tu cuidado."
      />

      <main className="container mx-auto max-w-4xl px-6 py-16 space-y-14 leading-relaxed">
        <section>
          <h2 className="text-3xl font-bold text-primary mb-4">Nuestra filosofía</h2>
          <p className="text-lg text-gray-700">
            En Sanital creemos en una medicina cercana y basada en la prevención. Nuestra meta es que cada visita aporte valor real a tu bienestar, ya sea en
            <strong> Endocrinología</strong>, <strong>Medicina Familiar</strong> o <strong>Cirugía</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-primary mb-4">Compromiso con tu salud</h2>
          <p className="text-lg text-gray-700">
            Ofrecemos agendas flexibles, recordatorios y canales de contacto directo para que tu experiencia sea cómoda. Si necesitas continuidad, diseñamos un plan de seguimiento adaptado a tu ritmo de vida.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}


