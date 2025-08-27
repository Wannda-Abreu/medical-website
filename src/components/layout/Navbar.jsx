import { useState } from "react";
import { Menu, X, CalendarCheck } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Equipo", href: "#equipo" },
    { label: "Pacientes", href: "#pacientes" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70">
      <div className="container mx-auto flex items-center justify-between px-5 py-3 md:py-4">
        <a
          href="#inicio"
          className="group flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
          aria-label="Ir al inicio"
        >
          <img
            src="https://res.cloudinary.com/dfq9eaz2e/image/upload/v1755632835/logo_gjf9dn.png"
            alt="Logo Vital"
            className="h-14 w-auto md:h-19 will-change-transform transition-all duration-200 ease-out group-hover:scale-[1.25] group-hover:drop-shadow-md group-active:scale-[1.02]"
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
              className="relative px-2 py-2 rounded-md transition-all ease-out hover:text-green-700 hover:shadow-sm hover:shadow-green-600/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40 group"
            >
              {label}
              {/* Subrayado animado */}
              <span className="pointer-events-none absolute inset-x-1 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-green-700 transition-transform duration-200 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Botón Agendar Cita (escritorio) */}
        <div className="hidden md:flex">
          <a
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-[15px] lg:text-[16px] font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.05] hover:shadow-lg hover:text-white hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/50 active:scale-100"
            aria-label="Agendar cita"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar Cita
          </a>
        </div>

        {/* Botón de menú móvil */}
        <button
          className="md:hidden rounded-md p-2 text-gray-700 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600/60"
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
              className="inline-flex w-full max-w-sm justify-center rounded-lg px-4 py-3 text-center text-[16px] font-medium text-gray-800 transition-all hover:text-green-700 hover:bg-green-50 hover:shadow-sm hover:shadow-green-600/15 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/40"
            >
              {label}
            </a>
          ))}

          {/* CTA mobile (centrado) */}
          <a
            href="https://booking.slotspot.app/sanital"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-1 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-[16px] font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.04] hover:shadow-lg hover:text-white hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600/50 active:scale-100"
            aria-label="Agendar cita"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar Cita
          </a>
        </nav>
      )}
    </header>
  );
};

export default Navbar;






