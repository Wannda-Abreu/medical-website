import ShareButtons from "../common/ShareButtons";

export default function Intro() {
  return (
    <section id="intro" className="relative bg-white py-10 md:py-14">
      <div className="container mx-auto px-3 md:px-4 max-w-5xl">
        <header className="mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tu salud, nuestra prioridad.</h2>
          <p className="mt-2 text-[15px] text-gray-700">
            En <strong>Clínica Sanital</strong> ofrecemos un modelo de atención cercano y profesional. Conoce más sobre nuestra forma de trabajar y
            nuestro equipo en la página sobre nosotros.
          </p>
        </header>

        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <a
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-[#009D98] hover:bg-[#007E7A] px-4 py-2.5 text-[15px] font-semibold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]"
          >
            Reservar cita ahora
          </a>
          <a
            href="/sobre-nosotros"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg px-3 py-2 text-[15px] font-semibold text-[#009D98] hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]"
          >
            Saber más
          </a>
        </div>

        <div className="mt-3">
          <ShareButtons className="text-sm" text="Clínica Sanital · Especialistas en Ciudad Real" />
        </div>
      </div>
    </section>
  );
}

