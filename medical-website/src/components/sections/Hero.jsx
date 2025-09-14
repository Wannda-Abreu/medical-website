import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarCheck, ShieldCheck, Users2, CalendarClock, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { cld, cldSrcSet } from "../../utils/cloudinary";
import ShareButtons from "../common/ShareButtons";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const glowX = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="inicio" className="relative h-screen bg-[#f3f4f6]" style={{ ["--hero-bg"]: "#f3f4f6" }}>
      {/* Contenedor objetivo también con position: relative */}
      <div ref={ref} className="relative container grid h-full items-center gap-10 lg:grid-cols-12">
        {/* ===== IMAGEN ===== */}
        <motion.div
          className="relative order-1 flex h-full justify-center lg:order-2 lg:col-span-6 lg:justify-end"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative h-full w-full max-w-[1150px]">
            <div className="relative h-full w-full overflow-hidden">
              {/* Imagen con degradado fuerte en bordes */}
              <img
                src={cld(
                  "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1755546332/ChatGPT_Image_18_ago_2025_21_24_24_l4pkpb_e_background_removal_f_png_drpvr7.png",
                  1200
                )}
                srcSet={cldSrcSet(
                  "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1755546332/ChatGPT_Image_18_ago_2025_21_24_24_l4pkpb_e_background_removal_f_png_drpvr7.png",
                  [640, 960, 1200, 1600]
                ).srcSet}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Profesional sanitaria sonriendo con paciente en consulta"
                className="h-full w-full object-cover"
                width={1200}
                height={800}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(130% 130% at 50% 50%, black 60%, rgba(0,0,0,0.85) 75%, transparent 92%)",
                  maskImage:
                    "radial-gradient(130% 130% at 50% 50%, black 60%, rgba(0,0,0,0.85) 75%, transparent 92%)",
                }}
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(140% 160% at 55% 50%, rgba(243,244,246,0) 60%, var(--hero-bg) 86%),
                    linear-gradient(to right, var(--hero-bg) 0%, rgba(243,244,246,0) 12%, rgba(243,244,246,0) 88%, var(--hero-bg) 100%),
                    linear-gradient(to bottom, rgba(243,244,246,0) 78%, var(--hero-bg) 100%),
                    linear-gradient(to top, rgba(243,244,246,0) 88%, var(--hero-bg) 100%)
                  `,
                }}
              />
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 top-1/2 h-[620px] w-[620px] -translate-y-1/2 rounded-full bg-primary/25 blur-3xl"
                style={{ y: glowY, x: glowX }}
              />

              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 lg:hidden">
                <a
                  href="https://booking.slotspot.app/sanital"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar cita en Sanital Tomelloso"
                  className="inline-flex items-center gap-1.5 rounded-full text-[13px] font-semibold text-white transition-all duration-200 hover:scale-110 hover:shadow-2xl active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  style={{
                    padding: "10px 14px",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    background:
                      "linear-gradient(180deg, rgba(0,157,152,0.94) 0%, rgba(0,126,122,0.92) 100%)",
                    boxShadow: "0 12px 26px rgba(0,157,152,0.32)",
                    border: "1px solid rgba(255,255,255,0.28)",
                  }}
                >
                  <CalendarCheck className="h-4 w-4" />
                  Agendar cita
                </a>

                <a
                  href="#servicios"
                  aria-label="Ver todos los servicios médicos de Sanital"
                  className="inline-flex items-center rounded-full text-[12px] font-semibold text-primary transition-all duration-200 hover:scale-105 hover:shadow-xl hover:opacity-95 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  style={{
                    padding: "9px 12px",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.26) 100%)",
                    border: "1px solid rgba(255,255,255,0.38)",
                  }}
                >
                  Ver servicios
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="order-2 lg:order-1 lg:col-span-6" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">Cuidado sanitario de calidad cerca de ti</h1>

          <h2 className="sr-only">Ventajas de nuestra clínica</h2>

          <div className="mt-4 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-800">Atención cercana por especialistas colegiados</span>
            </div>
            <p className="text-gray-600">Ofrecemos una atención médica humana y profesional para ti y tu familia. Reserva online en segundos.</p>
          </div>

          <div className="mt-6 hidden flex-wrap items-center gap-4 lg:flex">
            <a
              href="https://booking.slotspot.app/sanital"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Agendar cita en Sanital Tomelloso"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-6 py-3 text-white font-semibold shadow-sm transition-transform duration-200 hover:scale-[1.08] hover:shadow-xl hover:from-primary-700 hover:to-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:scale-100 hover:text-white"
            >
              <CalendarCheck className="h-5 w-5" />
              Agendar cita
            </a>

            <a
              href="#servicios"
              aria-label="Ver todos los servicios médicos de Sanital"
              className="inline-flex items-center justify-center rounded-xl border-2 border-accent px-8 py-3.5 text-base font-semibold text-primary bg-white transition-all duration-200 hover:bg-primary/10 hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:bg-primary/15"
            >
              Ver servicios
            </a>
          </div>

          <div className="mt-4 hidden lg:block">
            <ShareButtons text="Clínica Sanital · Especialistas en Ciudad Real" />
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            {[
              { icon: Users2, label: "Equipo multidisciplinar" },
              { icon: CalendarClock, label: "Citas el mismo día" },
              { icon: CheckCircle2, label: "Seguimiento continuo" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-md bg-primary/5 px-3 py-2 text-gray-800 transition-colors hover:bg-primary/10">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

