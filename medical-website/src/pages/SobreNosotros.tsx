export default function SobreNosotros() {
  return (
    <main className="container mx-auto px-4 py-10 max-w-5xl">
      {/* Meta handled statically; set title via effect if needed */}

      <h1 className="text-3xl md:text-4xl font-bold text-primary">Sobre nosotros</h1>
      <p className="mt-3 text-[15px] text-gray-700">
        En Clínica Sanital ofrecemos un modelo de atención cercano, profesional y accesible, con un equipo multidisciplinar que combina
        conocimiento y procesos ágiles para tu bienestar.
      </p>

      <section className="prose prose-zinc max-w-none prose-p:leading-7 mt-8">
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

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://booking.slotspot.app/sanital"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[#009D98] hover:bg-[#007E7A] px-4 py-2.5 text-white font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]"
        >
          Agendar cita
        </a>
        <a
          href="/#contacto"
          className="inline-flex items-center justify-center rounded-lg border border-[#009D98] px-4 py-2.5 text-[#009D98] font-semibold hover:bg-[#009D98] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]"
        >
          Contacto
        </a>
      </div>
    </main>
  );
}
