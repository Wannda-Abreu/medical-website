import { useEffect, useRef, useState } from "react";
import { CalendarCheck, Menu, X } from "lucide-react";
import Button from "../common/Button";
import { cld, srcset } from "@/lib/cld";

const Navbar = () => {
  const [active, setActive] = useState("#inicio");
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  const menuItems = [
    { label: "Inicio", href: "/#inicio" },
    { label: "Servicios", href: "/#servicios" },
    { label: "Equipo", href: "/#equipo" },
    { label: "Sobre nosotros", href: "/sobre-nosotros" },
    { label: "Pacientes", href: "/#testimonios" },
    { label: "Contacto", href: "/#contacto" },
  ];

  useEffect(() => {
    const ids = ["inicio", "servicios", "equipo", "testimonios", "contacto"];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;
    const io = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const top = visible[0];
      if (top?.target?.id) setActive(`#${top.target.id}`);
    }, { threshold: [0.4, 0.6, 0.8] });
    sections.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleItemClick = href => {
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : href;
    setActive(hash);
    setOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full overflow-visible border-b border-gray-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 leading-none"
    >
      <div className="container mx-auto flex items-center justify-between px-0 py-2 md:py-0">
        <a
          href="/#inicio"
          className="group ml-3 -my-7 md:ml-0 flex h-[6rem] md:h-[10rem] items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Ir al inicio"
        >
          <img
            src={cld(
              "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757204734/Untitled_design_27_jtcfh3.png",
              320,
              true
            )}
            srcSet={srcset(
              "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757204734/Untitled_design_27_jtcfh3.png",
              [240, 320, 480],
              true
            )}
            sizes="288px"
            alt="Sanital"
            width="360"
            height="144"
            className="block h-full w-auto drop-shadow-sm transition-all duration-200 ease-out group-hover:scale-[1.05] group-hover:drop-shadow-md group-active:scale-[1.01]"
            decoding="async"
            loading="lazy"
            fetchpriority="low"
            draggable="false"
          />
        </a>

        <nav
          className="mx-2 hidden md:flex flex-1 items-center justify-center gap-x-4 gap-y-1 px-2 py-0 text-[15px] sm:text-[16px] font-medium text-gray-800 flex-wrap"
          aria-label="Navegación principal"
        >
          {menuItems.map(({ label, href }) => {
            const isHash = href.includes("#");
            const current = isHash ? `#${href.split("#")[1]}` : href;
            return (
              <a
                key={href}
                href={href}
                onClick={() => handleItemClick(href)}
                className={`relative px-2 py-1.5 rounded-md transition-all ease-out hover:text-primary hover:shadow-sm hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 group ${active === current ? "text-primary" : ""}`}
                aria-current={active === current ? "page" : undefined}
              >
                {label}
                <span
                  className={`pointer-events-none absolute inset-x-1 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-200 ease-out ${active === current ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 pr-3 md:pr-3">
          <Button
            as="a"
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="md"
            className="hidden md:inline-flex gap-2 px-4 py-2.5 text-[15px] lg:text-[16px] hover:scale-[1.05] hover:shadow-lg active:scale-100"
            aria-label="Agendar cita"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar Cita
          </Button>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 mr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div className={`md:hidden ${open ? "fixed" : "hidden"} inset-0 z-50`} aria-hidden={!open}>
        <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="container mx-auto flex items-center justify-between px-3 py-3">
            <span className="text-base font-semibold">Menú</span>
            <Button
              as="button"
              onClick={() => setOpen(false)}
              variant="secondary"
              size="sm"
              className="px-3 py-2"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="px-3 pb-4 pt-2 text-[16px] font-medium text-gray-900" aria-label="Navegación móvil">
            <ul className="flex flex-col divide-y divide-gray-200">
              {menuItems.map(({ label, href }) => {
                const isHash = href.includes("#");
                const current = isHash ? `#${href.split("#")[1]}` : href;
                return (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={() => handleItemClick(href)}
                      className={`flex items-center justify-between px-2 py-3 rounded-lg transition-colors ${active === current ? "text-primary" : "text-gray-900"}`}
                      aria-current={active === current ? "page" : undefined}
                    >
                      <span>{label}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${active === current ? "bg-primary" : "bg-transparent"}`} />
                    </a>
                  </li>
                );
              })}
              <li className="pt-2">
                <Button
                  as="a"
                  href="https://booking.slotspot.app/sanital"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="md"
                  className="w-full justify-center gap-2 px-4 py-3 text-[16px]"
                  aria-label="Agendar cita"
                  onClick={() => setOpen(false)}
                >
                  <CalendarCheck className="h-5 w-5" />
                  Agendar Cita
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;



