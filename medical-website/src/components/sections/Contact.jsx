import { useRef, useState, useEffect } from "react";
import { useScrollLock } from "../../utils/scrollLock";
import { useFocusTrap } from "../../utils/focusTrap";
import { useGlobalInert } from "../../utils/globalInert";
import EmbedGuard from "../common/EmbedGuard";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import ShareButtons from "../common/ShareButtons";
import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";

const CLINIC = {
  name: "Sanital",
  email: "sanital.salud@gmail.com",
  phonePrimaryLabel: "Atención primaria",
  phonePrimary: "926 923 838",
  phonePrimaryHref: "+34926923838",
  phoneServicesLabel: "Servicios y profesionales",
  phoneServices: "621 126 286",
  phoneServicesHref: "+34621126286",
  addressLabel: "C/ del Río, 8, Ciudad Real",
  mapQuery: "C/ del Río, 8, Ciudad Real",
  logo: "https://res.cloudinary.com/dfq9eaz2e/image/upload/f_auto,q_auto,c_fill,w_720/v1755632835/logo_gjf9dn.png",
};

export default function Contact() {
  const [embedsAllowed, setEmbedsAllowed] = useState(true);
  useEffect(() => {
    try {
      const v = localStorage.getItem("cookie-consent");
      if (!v) {
        setEmbedsAllowed(true);
        return;
      }
      const p = JSON.parse(v);
      if (typeof p === "object" && p !== null && "embeds" in p)
        setEmbedsAllowed(!!p.embeds);
    } catch {
      setEmbedsAllowed(true);
    }
  }, []);
  const enableEmbeds = () => {
    try {
      localStorage.setItem(
        "cookie-consent",
        JSON.stringify({ v: 1, embeds: true, t: Date.now() })
      );
    } catch {}
    setEmbedsAllowed(true);
  };

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const formRef = useRef(null);
  const thanksRef = useRef(null);
  const openerRef = useRef(null);

  useScrollLock(!!status?.ok, "contact-thanks");
  useFocusTrap(thanksRef, !!status?.ok);
  useGlobalInert(!!status?.ok);

  useEffect(() => {
    if (!status?.ok) return;
    const onKey = (e) => {
      if (e.key === "Escape") setStatus(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [status]);

  useEffect(() => {
    const isOpen = !!status?.ok;
    if (isOpen) {
      openerRef.current =
        typeof document !== "undefined" ? document.activeElement : null;
    } else {
      openerRef.current?.focus?.();
    }
  }, [status]);

  const endpoint =
    "https://script.google.com/macros/s/AKfycbzbh3I1hq6BD44AJTQddVMssQWt11eO7C4WH7lTmpwJMQgKndDozl0sKo3FxrXfbHNb/exec";

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
    const formEl = e.currentTarget;
    setSending(true);
    setStatus(null);
    const data = new FormData(formEl);
    const payload = {
      name: data.get("name")?.toString() ?? "",
      email: data.get("email")?.toString() ?? "",
      message: data.get("message")?.toString() ?? "",
      company: data.get("company")?.toString() ?? "",
    };
    if (!validate(payload)) {
      setSending(false);
      setStatus({ ok: false, msg: "Revisa los campos marcados" });
      return;
    }
    try {
      const params = new URLSearchParams(payload);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: params.toString(),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const raw = await res.text();
      let json = null;
      try {
        json = JSON.parse(raw);
      } catch {}
      if (json?.ok) {
        setStatus({
          ok: true,
          msg: "¡Mensaje enviado! Te responderemos pronto.",
        });
        formEl.reset();
        setErrors({ name: "", email: "", message: "" });
        formRef.current?.reset?.();
      } else {
        const msg =
          (json && (json.error || json.message)) ||
          raw ||
          "No se pudo enviar. Intenta de nuevo.";
        setStatus({ ok: false, msg });
      }
    } catch (err) {
      setStatus({
        ok: false,
        msg: err?.message || "No hay conexión. Intenta otra vez.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacto" className="relative bg-[#f3f7f5] pt-2 md:pt-2 pb-6 md:pb-8">
      <div className="container mx-auto px-2 md:px-3">
        <SectionTitle
          title="Contáctanos"
          subtitle="Estamos aquí para ayudarte."
        />

        <div className="mt-0 grid gap-4 lg:grid-cols-3 items-stretch">
          <Card className="p-2 md:p-5 h-full flex flex-col">
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              className="space-y-3 flex-1 flex flex-col"
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
              />

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-gray-800"
                >
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
                  className={`mt-1 w-full rounded-lg bg-white px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p id="error-name" className="mt-1 text-xs text-red-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-gray-800"
                >
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
                  className={`mt-1 w-full rounded-lg bg-white px-3 py-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p id="error-email" className="mt-1 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-800 mt-0"
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="¿Cómo podemos ayudarte?"
                  required
                  minLength={10}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "error-message" : undefined
                  }
                  rows={4}
                  className={`w-full rounded-lg bg-white px-1 py-1 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.message && (
                  <p id="error-message" className="mt-1 text-xs text-red-600">
                    {errors.message}
                  </p>
                )}
              </div>

              <div aria-live="polite" className="min-h-[1.1rem]">
                {status && (
                  <p
                    className={`text-sm ${
                      status.ok ? "text-primary" : "text-red-600"
                    }`}
                  >
                    {status.msg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-0 inline-flex w-full items-center justify-center rounded-lg bg-primary px-1 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 disabled:opacity-60"
                aria-label="Enviar mensaje de contacto"
                ref={openerRef}
              >
                {sending ? "Enviando…" : "Enviar"}
              </button>
            </form>
          </Card>

          <Card className="p-3 md:p-4 h-full flex flex-col">
            <div className="relative rounded-xl border border-primary/20 shadow-sm overflow-hidden h-48 md:h-56 lg:h-60">
              {embedsAllowed ? (
                <iframe
                  title={`Mapa - ${CLINIC.addressLabel}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    CLINIC.mapQuery
                  )}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <EmbedGuard
                  typeKey="embeds"
                  onEnable={enableEmbeds}
                  placeholder={
                    <div className="text-center px-4">
                      <p className="text-sm text-gray-700">
                        Activa los contenidos de terceros para ver el mapa.
                      </p>
                      <button
                        onClick={enableEmbeds}
                        className="mt-2 inline-flex items-center justify-center rounded-lg border border-primary/30 bg-white px-3 py-1.5 text-sm font-medium text-primary shadow-sm transition hover:bg-primary/10"
                      >
                        Activar contenidos
                      </button>
                    </div>
                  }
                  buttonLabel="Activar contenidos"
                />
              )}
            </div>

            <footer className="mt-5 rounded-xl bg-white/80 border border-primary/20 p-3">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-800 text-[13px] leading-tight">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href={`tel:${CLINIC.phonePrimaryHref}`}
                    className="font-medium hover:underline"
                  >
                    {CLINIC.phonePrimary}
                  </a>
                  <span className="text-xs text-gray-600">
                    {CLINIC.phonePrimaryLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a
                    href={`tel:${CLINIC.phoneServicesHref}`}
                    className="font-medium hover:underline"
                  >
                    {CLINIC.phoneServices}
                  </a>
                  <span className="text-xs text-gray-600">
                    {CLINIC.phoneServicesLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a
                    href={`mailto:${CLINIC.email}`}
                    className="hover:underline"
                  >
                    {CLINIC.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-gray-700">{CLINIC.addressLabel}</span>
                </div>
              </div>
            </footer>
          </Card>

          <Card className="p-4 md:p-6 h-full flex flex-col items-center justify-center gap-4">
            <img
              src={CLINIC.logo}
              alt="Sanital · logotipo"
              className="h-12 w-auto opacity-90"
              loading="lazy"
              decoding="async"
              width={180}
              height={40}
            />
            <p className="max-w-[44ch] text-[14px] text-gray-700 mt-3 py-5">
              En <strong>Sanital</strong> creemos en un modelo de salud humano,
              accesible y profesional. Nuestro equipo médico está comprometido a
              garantizar una atención cercana, segura y de calidad, basada en la
              prevención y el seguimiento personalizado.
            </p>
            <div className="flex items-center mt-2 gap-3 py-5">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Sanital"
                className="grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-white text-primary shadow-sm transition hover:scale-[1.02]"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Sanital"
                className="grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-white text-primary shadow-sm transition hover:scale-[1.02]"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <ShareButtons text="Clínica Sanital · Especialistas en Ciudad Real" />
          </Card>
        </div>
      </div>

      {status?.ok && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center">
          <button
            aria-label="Cerrar"
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setStatus(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="thanks-title"
            className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-primary/20"
            tabIndex={-1}
            ref={thanksRef}
          >
            <h3
              id="thanks-title"
              className="text-lg font-semibold text-gray-900 text-center"
            >
              ¡Gracias! Hemos recibido tu mensaje
            </h3>
            <p className="mt-2 text-center text-sm text-gray-700">
              Te contactaremos lo antes posible.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/34619182680"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white shadow-sm"
              >
                WhatsApp
              </a>
              <button
                type="button"
                onClick={() => setStatus(null)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary shadow-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
