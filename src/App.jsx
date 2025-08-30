import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Team from "./components/sections/Team";
import Testimonial from "./components/sections/Testimonial";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Benefits from "./components/sections/Benefits";
import StickyCTA from "./components/layout/StickyCTA";

function App() {
  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <Navbar />
      <main className="relative"> {/* contenedor raíz no estático para Framer */}
        {/* Hero principal */}
        <Hero />
        <Benefits />

        {/* Servicios */}
        <Services />

        {/* Equipo */}
        <Team />

        {/* Testimonios */}
        <Testimonial />

        {/* Contacto */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
      <StickyCTA />
    </div>
  );
}

export default App;
