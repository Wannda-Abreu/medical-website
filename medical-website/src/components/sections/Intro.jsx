import ShareButtons from "../common/ShareButtons";

export default function Intro() {
  return (
    <section id="intro" className="relative bg-white py-10 md:py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Tu salud, nuestra prioridad
          </h2>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-700 max-w-4xl mx-auto">
            En <strong>Clínica Sanital</strong> ofrecemos un modelo de atención
            <strong> cercano, profesional y multidisciplinar</strong>, pensado
            para que cada paciente se sienta escuchado y acompañado. Nos
            centramos en la <strong>prevención</strong> y el
            <strong> seguimiento personalizado</strong>. Conoce nuestra forma de
            trabajar y a nuestro equipo en la&nbsp;
            <a
              href="/sobre-nosotros"
              className="text-primary font-semibold hover:underline underline-offset-2"
            >
              página Sobre Nosotros
            </a>
        </div>
      </div>
          </div>
    </section>
  );
}
