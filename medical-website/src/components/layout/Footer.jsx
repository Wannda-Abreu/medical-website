import { cld } from "../../utils/cloudinary";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="site-footer"
      className="relative mt-1 text-white bg-gradient-to-r from-primary-700 via-primary to-accent"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none bg-white/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-[radial-gradient(70%_100%_at_50%_0%,rgba(255,255,255,0.12),rgba(255,255,255,0))]"
      />
      <div className="container mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <a
          href="#inicio"
          className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          aria-label="Sanital - Ir al inicio"
        >
          <img
            src={cld(
              "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1757207840/Untitled_design_29_tauo4r.png",
              720
            )}
            alt="Sanital - Logo"
            width="360"
            height="144"
            className="h-[2rem] w-auto md:h-[4.5rem] drop-shadow-sm"
            loading="lazy"
            decoding="async"
          />
        </a>

        <nav
          aria-label="Navegacion principal"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[15px] md:text-[16px]"
        >
          {[
            ["#inicio", "Inicio"],
            ["#servicios", "Servicios"],
            ["#equipo", "Equipo"],
            ["#testimonios", "Pacientes"],
            ["#contacto", "Contacto"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-white/85 hover:text-white hover:underline underline-offset-4 decoration-white/70 decoration-2 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="text-sm text-white/85">&copy; {year} Sanital</div>
      </div>

      <div className="border-t border-white/15">
        <div className="container mx-auto px-4 py-3 text-center text-sm md:text-[15px]">
          <a
            href="#/legal/privacidad"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "/legal/privacidad";
              setTimeout(() => {
                try {
                  const y = Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                  );
                  window.scrollTo(0, y);
                } catch {}
              }, 0);
            }}
            className="text-white/85 hover:text-white hover:underline underline-offset-4 decoration-white/70 decoration-2 transition-colors"
          >
            Privacidad
          </a>
          <span className="mx-2 text-white/50">&middot;</span>
          <a
            href="#/legal/cookies"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "/legal/cookies";
              setTimeout(() => {
                try {
                  const y = Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                  );
                  window.scrollTo(0, y);
                } catch {}
              }, 0);
            }}
            className="text-white/85 hover:text-white hover:underline underline-offset-4 decoration-white/70 decoration-2 transition-colors"
          >
            Cookies
          </a>
          <span className="mx-2 text-white/50">&middot;</span>
          <a
            href="#/legal/aviso-legal"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = "/legal/aviso-legal";
              setTimeout(() => {
                try {
                  const y = Math.max(
                    document.documentElement.scrollHeight,
                    document.body.scrollHeight
                  );
                  window.scrollTo(0, y);
                } catch {}
              }, 0);
            }}
            className="text-white/85 hover:text-white hover:underline underline-offset-4 decoration-white/70 decoration-2 transition-colors"
          >
            Aviso legal
          </a>
        </div>
      </div>
    </footer>
  );
}
