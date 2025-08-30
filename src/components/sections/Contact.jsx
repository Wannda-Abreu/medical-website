// src/components/sections/Contact.jsx
import { useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";

const CLINIC = {
  name: "Sanital",
  email: "wandamarketingspecialist@gmail.com",
  phone: "+34 678 123 456",
  addressLabel: "Av. Salud 456, Barcelona",
  mapQuery: "Av. Salud 456, Barcelona",
};

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const data = new FormData(e.currentTfarget);
    const payload = {
      name: data.get("name")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      message: data.get("message")?.toString() ?? "",
      honeypot: data.get("company")?.toString() ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await res.text();
      let json = null;
      try { json = JSON.parse(raw); } catch {}

      if (res.ok) {
        setStatus({ ok: true, msg: "¡Mensaje enviado! Te responderemos pronto." });
        e.currentTarget.reset();
      } else {
        const msg = (json && json.error) || raw || "No se pudo enviar. Intenta de nuevo.";
        setStatus({ ok: false, msg });
        console.error("POST /api/contact →", res.status, msg);
      }
    } catch (err) {
      setStatus({ ok: false, msg: err?.message || "No hay conexión. Intenta otra vez." });
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="relative bg-[#f3f7f5] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          title="Contáctanos"
          subtitle="Estamos aquí para ayudarte. Escríbenos y te responderemos pronto."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <Card className="p-6 md:p-7">
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-800">Nombre</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-800">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-800">Mensaje</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Cuéntanos cómo podemos ayudarte"
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                />
              </div>
              {status && (
                <p role="status" className={`text-sm ${status.ok ? "text-emerald-700" : "text-red-600"}`}>
                  {status.msg}
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
                aria-label="Enviar mensaje de contacto"
              >
                {sending ? "Enviando…" : "Enviar Mensaje"}
              </button>
              <div className="mt-6 space-y-3 text-[15px] text-gray-800">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-emerald-700" />
                  <a href={`tel:${CLINIC.phone.replace(/\s+/g, "")}`} className="hover:underline">
                    {CLINIC.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-emerald-700" />
                  <a href={`mailto:${CLINIC.email}`} className="hover:underline">
                    {CLINIC.email}
                  </a>
                </div>
              </div>
            </form>
          </Card>

          <div className="order-last lg:order-none">
            <div className="overflow-hidden rounded-xl border border-emerald-200 shadow-sm">
              <iframe
                title={`Mapa — ${CLINIC.addressLabel}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[320px] w-full md:h-[380px]"
              />
            </div>
            <div className="mt-4 flex items-start gap-3 text-gray-800">
              <MapPin className="mt-0.5 h-5 w-5 text-emerald-700" />
              <p>{CLINIC.addressLabel}</p>
            </div>
          </div>

          <Card className="flex flex-col items-center justify-center gap-6 p-6 md:p-7">
            <img
              src="/logo-sanital.png"
              alt="Sanital — logotipo"
              className="h-14 w-auto opacity-90"
              loading="lazy"
              decoding="async"
            />
            <p className="max-w-[46ch] text-center text-[15px] text-gray-700">
              En <strong>Sanital</strong> creemos en un modelo de salud humano, accesible y profesional. Nuestro equipo médico está comprometido a garantizar atención cercana y de calidad.
            </p>
            <div className="mt-2 flex items-center gap-4">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Sanital"
                className="grid h-11 w-11 place-items-center rounded-full border border-emerald-300 bg-white text-emerald-700 shadow-sm transition hover:scale-105 hover:bg-emerald-50"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Sanital"
                className="grid h-11 w-11 place-items-center rounded-full border border-emerald-300 bg-white text-emerald-700 shadow-sm transition hover:scale-105 hover:bg-emerald-50"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

