import { useEffect, useRef, useState } from "react";
import { CalendarCheck, ShieldCheck, Users2, CalendarClock, CheckCircle2 } from "lucide-react";
import ShareButtons from "../common/ShareButtons";

const CLD_BASE = "https://res.cloudinary.com/dfq9eaz2e/image/upload";
const CLD_ID = "v1758053297/ChatGPT_Image_18_ago_2025_21_24_24_l4pkpb_e_background_removal_f_png_1_qhxfqn.png";
const CLD_Q = "f_auto,q_auto,dpr_auto,c_limit";

function url(w) {
  return `${CLD_BASE}/${CLD_Q},w_${w}/${CLD_ID}`;
}

export default function Hero() {
  const heroRef = useRef(null);
  const [fm, setFm] = useState(null);
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const setVars = () => {
      const h = window.innerHeight;
      const header = document.querySelector("header");
      const headerH = header ? header.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty("--header-h", `${headerH}px`);
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
    };
    setVars();
    window.addEventListener("resize", setVars);
    window.addEventListener("orientationchange", setVars);
    return () => {
      window.removeEventListener("resize", setVars);
      window.removeEventListener("orientationchange", setVars);
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      import("framer-motion").then((m) => setFm(m)).catch(() => {});
    };
    const onInteract = () => {
      load();
      cleanup();
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("mousemove", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
    window.addEventListener("pointerdown", onInteract, { once: true });
    window.addEventListener("mousemove", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });
    return () => cleanup();
  }, [reduce]);

  const MotionDiv = fm?.motion ? fm.motion.div : "div";
  const fadeUp = { hidden: {}, show: {} };

  return (
    <section id="inicio" ref={heroRef} className="relative bg-[#f3f4f6] overflow-hidden">
      <div className="lg:hidden w-screen max-w-none px-0 mt-0">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded-none bg-[#e9eef2]">
          <picture>
            <source
              type="image/avif"
              srcSet={`${CLD_BASE}/${CLD_Q},w_480/${CLD_ID} 480w, ${CLD_BASE}/${CLD_Q},w_640/${CLD_ID} 640w, ${CLD_BASE}/${CLD_Q},w_960/${CLD_ID} 960w, ${CLD_BASE}/${CLD_Q},w_1200/${CLD_ID} 1200w`}
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet={`${CLD_BASE}/${CLD_Q},w_480/${CLD_ID} 480w, ${CLD_BASE}/${CLD_Q},w_640/${CLD_ID} 640w, ${CLD_BASE}/${CLD_Q},w_960/${CLD_ID} 960w, ${CLD_BASE}/${CLD_Q},w_1200/${CLD_ID} 1200w`}
              sizes="100vw"
            />
            <img
              src={url(1200)}
              srcSet={`${url(480)} 480w, ${url(640)} 640w, ${url(960)} 960w, ${url(1200)} 1200w`}
              sizes="100vw"
              alt="Profesional sanitaria sonriendo con paciente en consulta"
              className="absolute inset-0 block h-full w-full object-cover"
              width={1200}
              height={800}
              loading="eager"
              decoding="async"
              fetchpriority="high"
              style={{
                WebkitMaskImage: "radial-gradient(160% 160% at 60% 55%, rgba(0,0,0,1) 92%, rgba(0,0,0,0.6) 97%, transparent 100%)",
                maskImage: "radial-gradient(160% 160% at 60% 55%, rgba(0,0,0,1) 92%, rgba(0,0,0,0.6) 97%, transparent 100%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat"
              }}
              onError={(e) => { e.currentTarget.removeAttribute("fetchpriority"); }}
            />
          </picture>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(170% 170% at 70% 60%, rgba(243,244,246,0) 80%, #f3f4f6 100%),
                linear-gradient(to bottom, rgba(243,244,246,0) 85%, #f3f4f6 100%)
              `
            }}
          />
          <div className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-3 px-3">
            <a
              href="https://booking.slotspot.app/sanital"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-white shadow-md"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                background: "linear-gradient(180deg, rgba(0,157,152,0.94) 0%, rgba(0,126,122,0.92) 100%)",
                border: "1px solid rgba(255,255,255,0.28)"
              }}
            >
              <CalendarCheck className="h-4 w-4" />
              Agendar cita
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center rounded-full px-4 py-2 text-[12px] font-semibold text-primary"
              style={{
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                background: "linear-gradient(180deg, rgba(255,255,255,0.44) 0%, rgba(255,255,255,0.26) 100%)",
                border: "1px solid rgba(255,255,255,0.38)"
              }}
            >
              Ver servicios
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2" style={{ height: "calc(100dvh - var(--header-h, 0px))" }}>
        <div className="relative h-full w-full">
          <picture>
            <source
              type="image/avif"
              srcSet={`${url(960)} 960w, ${url(1200)} 1200w, ${url(1400)} 1400w, ${url(1600)} 1600w`}
              sizes="50vw"
            />
            <source
              type="image/webp"
              srcSet={`${url(960)} 960w, ${url(1200)} 1200w, ${url(1400)} 1400w, ${url(1600)} 1600w`}
              sizes="50vw"
            />
            <img
              src={url(1600)}
              srcSet={`${url(960)} 960w, ${url(1200)} 1200w, ${url(1400)} 1400w, ${url(1600)} 1600w`}
              sizes="50vw"
              alt="Profesional sanitaria sonriendo con paciente en consulta"
              className="absolute inset-0 block h-full w-full object-cover object-right"
              width={1600}
              height={1067}
              loading="eager"
              decoding="async"
              fetchpriority="high"
              style={{
                WebkitMaskImage: "radial-gradient(220% 200% at 85% 60%, rgba(0,0,0,1) 96%, rgba(0,0,0,0.55) 98%, transparent 100%)",
                maskImage: "radial-gradient(220% 200% at 85% 60%, rgba(0,0,0,1) 96%, rgba(0,0,0,0.55) 98%, transparent 100%)",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat"
              }}
              onError={(e) => { e.currentTarget.removeAttribute("fetchpriority"); }}
            />
          </picture>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(220% 200% at 90% 60%, rgba(243,244,246,0) 82%, #f3f4f6 100%),
                linear-gradient(to right, #f3f4f6 0%, rgba(243,244,246,0) 10%, rgba(243,244,246,0) 90%, #f3f4f6 100%),
                linear-gradient(to bottom, rgba(243,244,246,0) 90%, #f3f4f6 100%)
              `
            }}
          />
        </div>
      </div>

      <div className="relative container grid items-center gap-10 lg:grid-cols-12" style={{ minHeight: "calc(100dvh - var(--header-h, 0px))" }}>
        <MotionDiv className="lg:col-span-6 flex flex-col justify-center" initial={reduce || !fm ? undefined : "hidden"} whileInView={reduce || !fm ? undefined : "show"} viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
          <h1 className="mt-6 lg:mt-0 text-3xl font-bold leading-tight text-gray-700 md:text-4xl">Cuidamos tu salud estés donde estés</h1>
          <h2 className="sr-only">Ventajas de nuestra clínica</h2>
          <div className="mt-4 flex flex-col gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-800">Atención cercana por especialistas colegiados</span>
            </div>
            <p className="text-gray-600">Ofrecemos una atención cercana y profesional para ti y tu familia. Reserva tu cita online o llámanos.</p>
          </div>
          <div className="mt-6 hidden flex-wrap items-center gap-4 lg:flex">
            <a href="https://booking.slotspot.app/sanital" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-6 py-3 text-white font-semibold shadow-sm transition-transform duration-200 hover:scale-[1.08] hover:shadow-xl hover:from-primary-700 hover:to-primary-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 active:scale-100">
              <CalendarCheck className="h-5 w-5" />
              Agendar cita
            </a>
            <a href="#servicios" className="inline-flex items-center justify-center rounded-xl border-2 border-accent px-8 py-3.5 text-base font-semibold text-primary bg-white transition-all duration-200 hover:bg-primary/10 hover:scale-[1.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:bg-primary/15">
              Ver servicios
            </a>
          </div>
          <div className="mt-4 hidden lg:block">
            <ShareButtons text="Clínica Sanital · Especialistas en Ciudad Real" />
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
            {[{ icon: Users2, label: "Equipo multidisciplinar" }, { icon: CalendarClock, label: "Citas el mismo día" }, { icon: CheckCircle2, label: "Seguimiento continuo" }].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-md bg-primary/5 px-3 py-2 text-gray-800 transition-colors hover:bg-primary/10">
                <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </MotionDiv>
        <div className="hidden lg:block lg:col-span-6" />
      </div>
    </section>
  );
}
