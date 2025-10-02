import { useState, useRef } from "react";

export default function SuggestServiceDialog({ open, onClose }) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef(null);

  const endpoint =
    "https://script.google.com/macros/s/AKfycbzbh3I1hq6BD44AJTQddVMssQWt11eO7C4WH7lTmpwJMQgKndDozl0sKo3FxrXfbHNb/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name") ?? "",
      email: data.get("email") ?? "",
      message: "[SUGERENCIA DE SERVICIO] " + (data.get("message") ?? ""),
      company: "",
    };

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
        setStatus({ ok: true, msg: "¡Gracias por tu sugerencia!" });
        formRef.current?.reset();
      } else {
        setStatus({
          ok: false,
          msg: (json && (json.error || json.message)) || raw,
        });
      }
    } catch (err) {
      setStatus({
        ok: false,
        msg: err?.message || "Sin conexión. Intenta otra vez.",
      });
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Sugiere un servicio
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4">
          Cuéntanos qué especialista o servicio te gustaría ver en Sanital.
        </p>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Tu nombre"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Tu email"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            required
          />
          <textarea
            name="message"
            placeholder="Escribe tu sugerencia"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            rows="3"
            required
          />
          {status && (
            <p
              className={`text-sm ${
                status.ok ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.msg}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300"
            >
              Cerrar
            </button>
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 text-sm font-semibold rounded-lg bg-primary text-white hover:bg-primary-700 disabled:opacity-60"
            >
              {sending ? "Enviando…" : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
