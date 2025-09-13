import { useState } from "react";
import ShareButtons from "../common/ShareButtons";

export default function Intro() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="intro" className="relative bg-white py-10 md:py-14">
      <div className="container mx-auto px-3 md:px-4 max-w-5xl">
        <header className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tu salud, nuestra prioridad.
          </h2>
          <p className="mt-2 text-[15px] text-gray-700">
            En <strong>Clínica Sanital</strong> ofrecemos un modelo de atención cercano,
            profesional y accesible, con un equipo multidisciplinar que combina
            conocimiento y procesos ágiles para tu bienestar.
          </p>
        </header>

        {/* know more  content */}
        {showMore && (
          <div className="prose prose-zinc max-w-none prose-p:leading-7 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-gray-900 mt-6">
              Qué encontrarás en nuestra clínica
            </h3>
            <p>
              Trabajamos con estándares de calidad y seguridad para que cada visita
              aporte valor real a tu salud. Tanto en <strong>endocrinología</strong> como en
              <strong> atención primaria</strong>, serás atendido por especialistas colegiados
              que escuchan, explican el plan terapéutico y resuelven dudas con un
              lenguaje claro. Promovemos <strong>hábitos saludables</strong> y revisiones
              periódicas para que avances a tu ritmo y con confianza.
            </p>
            <p>
              Sabemos que la <strong>rapidez</strong> y la <strong>coordinación</strong> son
              clave. Por eso, contamos con agendas flexibles, recordatorios y
              comunicación directa. Si necesitas continuidad, diseñamos un plan de
              seguimiento con hitos y objetivos realistas adaptados a tu día a día.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-6">
              Servicios y equipo a tu alcance
            </h3>
            <p>
              Conoce todas nuestras especialidades en{" "}
              <a className="text-primary hover:underline" href="/#servicios">
                servicios
              </a>{" "}
              y descubre a los profesionales en{" "}
              <a className="text-primary hover:underline" href="/#equipo">
                equipo
              </a>
              . En la sección{" "}
              <a className="text-primary hover:underline" href="/#contacto">
                contacto
              </a>{" "}
              encontrarás teléfono, correo y un formulario de consulta rápida.
            </p>
            <p>
              Si lo prefieres, agenda tu cita online en segundos en{" "}
              <a
                className="text-primary hover:underline"
                href="https://booking.slotspot.app/sanital"
                target="_blank"
                rel="noopener noreferrer"
              >
                nuestra plataforma de reservas
              </a>
              , con confirmación inmediata.
            </p>
          </div>
        )}

        {/* Botones */}
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

          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center justify-center rounded-lg border border-[#009D98] px-5 py-3 text-[#009D98] font-semibold transition hover:bg-[#009D98] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009D98]"
          >
            {showMore ? "Ver menos" : "Saber más"}
          </button>

          <ShareButtons className="ml-1" text="Clínica Sanital · Especialistas en Ciudad Real" />
        </div>
      </div>
    </section>
  );
}


