import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "../../utils/scrollLock";
import { useFocusTrap } from "../../utils/focusTrap";
import { useGlobalInert } from "../../utils/globalInert";

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [embeds, setEmbeds] = useState(true);
  const prefsRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    try {
      const v = localStorage.getItem("cookie-consent");
      if (!v) { setOpen(true); return; }
      const p = JSON.parse(v);
      if (typeof p === "object" && p !== null && "embeds" in p) setEmbeds(!!p.embeds);
    } catch {}
  }, []);

  const accept = () => {
    try { localStorage.setItem("cookie-consent", JSON.stringify({ v: 1, embeds: true, t: Date.now() })); } catch {}
    setOpen(false);
  };

  const decline = () => {
    try { localStorage.setItem("cookie-consent", JSON.stringify({ v: 0, embeds: false, t: Date.now() })); } catch {}
    setOpen(false);
  };

  if (!open) return null;

  useScrollLock(prefsOpen, "cookie-prefs");
  useFocusTrap(prefsRef, prefsOpen);
  useGlobalInert(prefsOpen);

  useEffect(() => {
    if (!prefsOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setPrefsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [prefsOpen]);

  // Return focus to the opener when prefs close
  useEffect(() => {
    if (prefsOpen) {
      openerRef.current = typeof document !== "undefined" ? document.activeElement : null;
    } else {
      openerRef.current?.focus?.();
    }
  }, [prefsOpen]);

  return (
    <div className="fixed inset-x-4 bottom-4 z-[140]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-primary/15 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 p-4 shadow-lg ring-1 ring-primary/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-800">
            Usamos cookies necesarias para el funcionamiento del sitio y contenidos embebidos (p. ej., Google Maps/Form).
            Consulta la <a href="#/legal/cookies" className="font-semibold text-accent underline underline-offset-2">Política de Cookies</a> y la <a href="#/legal/privacidad" className="font-semibold text-accent underline underline-offset-2">Privacidad</a>.
          </p>
          <div className="flex gap-2 sm:shrink-0">
            <button onClick={decline} className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10">Rechazar</button>
            <button onClick={accept} className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white hover:from-primary-700 hover:to-primary-800">Aceptar</button>
            <button onClick={() => setPrefsOpen(true)} className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-white px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5">Configurar</button>
          </div>
        </div>
      </div>
      {prefsOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center">
          <button aria-label="Cerrar" onClick={() => setPrefsOpen(false)} className="absolute inset-0 bg-black/40" />
          <div role="dialog" aria-modal className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-primary/15" tabIndex="-1" ref={prefsRef}>
            <h3 className="text-lg font-semibold text-gray-900">Preferencias de cookies</h3>
            <div className="mt-4 space-y-3">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1" />
                <span>
                  <span className="font-medium">Necesarias</span> (obligatorias)
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" checked={embeds} onChange={(e) => setEmbeds(e.target.checked)} className="mt-1" />
                <span>
                  <span className="font-medium">Contenidos de terceros</span> (Mapas/Formularios de Google)
                </span>
              </label>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button onClick={() => setPrefsOpen(false)} className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10">Cancelar</button>
              <button onClick={() => { try { localStorage.setItem("cookie-consent", JSON.stringify({ v: 1, embeds, t: Date.now() })); } catch {}; setPrefsOpen(false); setOpen(false); }} className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white hover:from-primary-700 hover:to-primary-800">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
