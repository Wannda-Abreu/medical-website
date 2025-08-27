const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-10 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} Sanital. Todos los derechos reservados.</p>
        <nav className="flex justify-center gap-6 text-sm">
          <a href="#inicio" className="hover:underline">Inicio</a>
          <a href="#equipo" className="hover:underline">Equipo</a>
          <a href="#servicios" className="hover:underline">Servicios</a>
          <a href="#contacto" className="hover:underline">Contacto</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
