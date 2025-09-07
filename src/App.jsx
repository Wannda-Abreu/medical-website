import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import Team from "./components/sections/Team";
import Testimonial from "./components/sections/Testimonial";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import Benefits from "./components/sections/Benefits";
import StickyCTA from "./components/layout/StickyCTA";
import SplashScreen from "./components/layout/SplashScreen";
import SkipLink from "./components/layout/SkipLink";

function App() {
  return (
    <div className="font-sans antialiased bg-background text-foreground">
      <SplashScreen />  {/* Pantalla de carga */}
      <SkipLink />
      <Navbar />
      <main id="main" className="relative pb-24 sm:pb-28"> 
        <Hero />
        <Benefits />
        <Services />
        <Team />
        <Testimonial />
        <Contact />
      </main>

      <Footer />
      {/* PRUEBA: si en móvil no se ve, activa el fallback sin portal */}
      <StickyCTA usePortal={false} />
    </div>
  );
}

export default App;
