import { useMemo, useRef, useState } from "react";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";

const CLINIC = {
  name: "Sanital",
  email: "sanital.salud@gmail.com",
  phone: "+34 619 18 26 80",
  addressLabel: "Calle Orquídea 20, CP  13250 Daimiel",
  mapQuery: "Calle Orquídea 20, CP  13250 Daimiel",
  logo: "https://res.cloudinary.com/dfq9eaz2e/image/upload/v1755632835/logo_gjf9dn.png",
};

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const formRef = useRef(null);
  const endpoint = useMemo(() => {
    const base = import.meta.env.VITE_API_BASE && String(import.meta.env.VITE_API_BASE).trim();
    if (base) return `${base.replace(/\/$/, '')}/api/contact`;
    return "/api/contact";
  }, []);

  const validate = (payload) => {
    const e = { name: "", email: "", message: "" };
    if (!payload.name.trim()) e.name = "Introduce tu nombre";
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(payload.email)) e.email = "Email no válido";
    if (!payload.message.trim() || payload.message.trim().length < 10)
      e.message = "Escribe al menos 10 caracteres";
    setErrors(e);
    return !e.name && !e.email && !e.message;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      message: data.get("message")?.toString() ?? "",
      honeypot: data.get("company")?.toString() ?? "",
    };
    if (!validate(payload)) {
      setSending(false);
      setStatus({ ok: false, msg: "Revisa los campos marcados" });
      return;
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const raw = await res.text();
      let json = null;
      try { json = JSON.parse(raw); } catch {}

      if (res.ok) {
        setStatus({ ok: true, msg: "¡Mensaje enviado! Te responderemos pronto." });
        e.currentTarget.reset();
        try { setErrors({ name: "", email: "", message: "" }); } catch {}
        try { formRef.current?.reset(); } catch {}
      } else {
        const detail = json?.details?.error?.message || json?.message;
        const code = json?.code ? ` (código ${json.code})` : '';
        const msg = (json && json.error) || detail || raw || "No se pudo enviar. Intenta de nuevo.";
        const composed = typeof msg === 'string' ? `${msg}${code}` : `No se pudo enviar.${code}`;
        setStatus({ ok: false, msg: composed });
      }
    } catch (err) {
      setStatus({ ok: false, msg: err?.message || "No hay conexión. Intenta otra vez." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="relative bg-[#f3f7f5] py-3 md:py-2">
      <div className="container mx-auto px-2 md:px-3">
        <SectionTitle
          title="Contáctanos"
          subtitle="Estamos aquí para ayudarte. Escríbenos y te responderemos pronto."
        />

        {/* Misma altura en desktop, más bajo (360px) */}
        <div className="mt-2 grid gap-5 lg:grid-cols-3 items-stretch">
          {/* FORMULARIO */}
          <Card className="p-4 md:p-6 h-full flex flex-col">
            <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-4 flex-1 flex flex-col">
              <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" />

              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-gray-800">
                  Nombre
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Tu nombre"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "error-name" : undefined}
                  className={`mt-1 w-full rounded-lg bg-white px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 border ${errors.name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.name && (
                  <p id="error-name" className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
                
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-gray-800">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="tucorreo@ejemplo.com"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "error-email" : undefined}
                  className={`mt-1 w-full rounded-lg bg-white px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 border ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.email && (
                  <p id="error-email" className="mt-1 text-xs text-red-600">{errors.email}</p>
                )}
              </div>
              {errors.message && (
                <p id="error-message" className="-mt-2 text-xs text-red-600">{errors.message}</p>
              )}

              <div>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Cuéntanos cómo podemos ayudarte"
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "error-message" : undefined}
                  className={`w-full rounded-lg bg-white px-3.5 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 border ${errors.message ? "border-red-500" : "border-gray-300"}`}
                />
              </div>

              <div aria-live="polite" className="min-h-[1.25rem]">
                {status && (
                  <p className={`text-sm ${status.ok ? "text-primary" : "text-red-600"}`}>
                    {status.msg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-60"
                aria-label="Enviar mensaje de contacto"
              >
                {sending ? "Enviando…" : "Enviar Mensaje"}
              </button>
            </form>
          </Card>

          {/* MAPA */}
          <div className="h-full">
            <div className="overflow-hidden rounded-xl border border-primary/20 shadow-sm aspect-[4/3] md:aspect-auto md:h-full">
              <iframe
                title={`Mapa - ${CLINIC.addressLabel}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              />
            </div>

            <div className="mt-3 flex items-start gap-3 text-gray-800">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <p className="text-sm">{CLINIC.addressLabel}</p>
            </div>
          </div>

          {/* TEXTO / REDES */}
          <Card className="p-5 md:p-6 h-full flex flex-col items-center justify-between gap-5">
            <img
              src={CLINIC.logo}
              alt="Sanital — logotipo"
              className="h-12 w-auto opacity-90"
              loading="lazy"
              decoding="async"
            />
            <p className="max-w-[44ch] text-center text-[15px] text-gray-700 mt-5">
              En <strong>Sanital</strong> creemos en un modelo de salud humano, accesible y profesional.
              Nuestro equipo médico está comprometido a garantizar atención cercana y de calidad.
            </p>
             <div className="mt-3 space-y-2.5 text-[15px] text-gray-800">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={`tel:${CLINIC.phone.replace(/\s+/g, "")}`} className="hover:underline">
                    {CLINIC.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${CLINIC.email}`} className="hover:underline">
                    {CLINIC.email}
                  </a>
                </div>
              </div>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Sanital"
                className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-white text-primary shadow-sm transition hover:scale-105 hover:bg-primary/10"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Sanital"
                className="grid h-10 w-10 place-items-center rounded-full border border-primary/30 bg-white text-primary shadow-sm transition hover:scale-105 hover:bg-primary/10"
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





