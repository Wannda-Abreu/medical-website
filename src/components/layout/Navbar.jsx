import { useEffect, useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";
import Button from "../common/Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");

  const menuItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Equipo", href: "#equipo" },
    { label: "Pacientes", href: "#testimonios" },
    { label: "Contacto", href: "#contacto" },
  ];

  useEffect(() => {
    // Evita scroll del fondo cuando el menú móvil está abierto
    const prev = document.documentElement.style.overflow;
    if (open) document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    // Resalta la sección activa según el viewport
    const ids = menuItems.map((m) => m.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target?.id) setActive(`#${top.target.id}`);
      },
      { root: null, threshold: [0.4, 0.6, 0.8] }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full overflow-visible border-b border-gray-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex items-center justify-between px-0 py-0 md:py-0">
        <a
          href="#inicio"
          className="group -my-3 md:-my-6 flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Ir al inicio"
        >
          <img
            src="https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757204734/Untitled_design_27_jtcfh3.png"
            alt="Sanital - Logo"
            width="360"
            height="144"
            className="h-[2rem] w-auto md:h-[8.5rem] drop-shadow-sm will-change-transform transition-all duration-200 ease-out group-hover:scale-[1.05] group-hover:drop-shadow-md group-active:scale-[1.01]"
            decoding="async"
          />
        </a>

        {/* Menú de escritorio */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-8 text-[15px] lg:text-[17px] font-medium text-gray-800"
          aria-label="Navegación principal"
        >
          {menuItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={`relative px-2 py-2 rounded-md transition-all ease-out hover:text-primary hover:shadow-sm hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 group ${active === href ? "text-primary" : ""}`}
              aria-current={active === href ? "page" : undefined}
            >
              {label}
              {/* Subrayado animado */}
              <span className={`pointer-events-none absolute inset-x-1 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-200 ease-out ${active === href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
            </a>
          ))}
        </nav>

        {/* Botón Agendar Cita (escritorio) */}
        <div className="hidden md:flex">
          <Button
            as="a"
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            className="gap-2 px-5 py-2.5 text-[15px] lg:text-[16px] hover:scale-[1.05] hover:shadow-lg active:scale-100"
            aria-label="Agendar cita"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar Cita
          </Button>
        </div>

        {/* Botón de menú móvil */}
        <button
          className="md:hidden rounded-md p-2 text-gray-700 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil (centrado) */}
      {open && (
        <nav
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 flex flex-col items-center gap-3 border-t border-gray-200 bg-white/95 px-6 py-6 backdrop-blur-md md:hidden"
          aria-label="Navegación móvil"
        >
          {/* Links centrados con hover + sombra leve */}
          {menuItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`inline-flex w-full max-w-sm justify-center rounded-lg px-4 py-3 text-center text-[16px] font-medium text-gray-800 transition-all hover:text-primary hover:bg-primary/10 hover:shadow-sm hover:shadow-primary/15 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${active === href ? "text-primary bg-primary/10" : ""}`}
              aria-current={active === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}

          {/* CTA mobile (centrado) */}
          <Button
            as="a"
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            variant="primary"
            size="md"
            className="mt-1 inline-flex w-full max-w-sm items-center justify-center gap-2 px-6 py-3 text-[16px] hover:scale-[1.04] hover:shadow-lg active:scale-100"
            aria-label="Agendar cita"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar Cita
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;



