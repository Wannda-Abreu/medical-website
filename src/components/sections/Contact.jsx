import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-muted/50">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Contáctanos"
          subtitle="Estamos aquí para ayudarte. Escríbenos y te responderemos pronto."
        />

        <div className="grid gap-12 lg:grid-cols-2 mt-12">
          {/* Formulario */}
          <Card className="p-6">
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary outline-none"
              />
              <input
                type="email"
                placeholder="Tu correo"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary outline-none"
              />
              <textarea
                rows="5"
                placeholder="Tu mensaje"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input focus:ring-2 focus:ring-primary outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
              >
                Enviar mensaje
              </button>
            </form>
          </Card>

          {/* Info rápida */}
          <div className="space-y-6">
            <Card
              title="Dirección"
              description="Av. Siempre Viva 123, Ciudad Médica"
            />
            <Card title="Teléfono" description="+51 987 654 321" />
            <Card title="Correo" description="contacto@clinica.com" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
