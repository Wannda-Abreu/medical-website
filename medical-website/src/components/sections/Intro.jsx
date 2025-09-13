import ShareButtons from "../common/ShareButtons";

export default function Intro() {
  return (
    <section id="intro" className="relative bg-white py-10 md:py-14">
      <div className="container mx-auto px-3 md:px-4 max-w-5xl">
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tu salud, nuestra prioridad en Daimiel
          </h2>
          <p className="mt-2 text-[15px] text-gray-700">
            En <strong>Clínica Sanital</strong> ofrecemos un modelo de atención cercano, profesional y accesible. 
            Combinamos el conocimiento de un <strong>equipo multidisciplinar</strong> con procesos ágiles para que obtengas diagnóstico, tratamiento y 
            seguimiento sin esperas innecesarias.
          </p>
        </header>

        <div className="prose prose-zinc max-w-none prose-p:leading-7">
          <h3 className="text-2xl font-semibold text-gray-900">Qué encontrarás en nuestra clínica</h3>
          <p>
            Trabajamos con estándares de calidad y seguridad para que cada visita aporte valor real a tu bienestar. 
            Si vienes por <strong>endocrinología</strong> o por <strong>atención primaria</strong>, te recibirá un especialista colegiado que escuchará tu caso con calma, 
            explicará el plan terapéutico y resolverá tus dudas con un lenguaje claro. Nos apoyamos en <strong>hábitos saludables</strong> y revisiones 
            periódicas para que mejores a tu ritmo y con confianza.
          </p>
          <p>
            Sabemos que la <strong>rapidez</strong> y la <strong>coordinación</strong> son clave. Por eso, contamos con agendas flexibles, recordatorios y canales de contacto directos. 
            Si necesitas continuidad, diseñamos un plan de seguimiento con hitos, objetivos realistas y revisiones adaptadas a tu día a día.
          </p>

          <h3 className="text-2xl font-semibold text-gray-900">Servicios y equipo a tu alcance</h3>
          <p>
            Visita nuestra página de <a className="text-primary hover:underline" href="/#servicios">servicios</a> para conocer todas las 
            especialidades disponibles. En la sección de <a className="text-primary hover:underline" href="/#equipo">equipo</a> encontrarás a los profesionales que te atenderán, 
            junto a su formación y enfoque de trabajo. ¿Listo para hablar con nosotros? En <a className="text-primary hover:underline" href="/#contacto">contacto</a> 
            tienes teléfono, correo y un formulario de consulta rápida.
          </p>
          <p>
            Si lo prefieres, puedes <a className="text-primary hover:underline" href="https://booking.slotspot.app/sanital" target="_blank" rel="noopener noreferrer">agendar tu cita online</a> 
            en cuestión de segundos. El proceso es sencillo y recibirás confirmación inmediata.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="https://booking.slotspot.app/sanital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#009D98] to-[#007E7A] px-5 py-3 text-white font-semibold shadow-sm transition hover:from-[#007E7A] hover:to-[#006B68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]"
              aria-label="Agendar cita en Sanital"
            >
              Reservar cita ahora
            </a>
            <ShareButtons className="ml-1" text="Clínica Sanital · Especialistas en Ciudad Real" />
          </div>
        </div>
      </div>
    </section>
  );
}

