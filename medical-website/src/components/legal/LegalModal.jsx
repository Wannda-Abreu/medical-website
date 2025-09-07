import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "../../utils/scrollLock";
import { useFocusTrap } from "../../utils/focusTrap";
import { useGlobalInert } from "../../utils/globalInert";
import Privacy from "./Privacy";
import CookiesPolicy from "./CookiesPolicy";
import LegalNotice from "./LegalNotice";

export default function LegalModal({ type = "privacidad", onClose }) {
  const dialogRef = useRef(null);
  const [closing, setClosing] = useState(false);
  let Title = "Información Legal";
  let Body = Privacy;
  if (type.includes("cookies")) {
    Title = "Política de Cookies";
    Body = CookiesPolicy;
  } else if (type.includes("aviso")) {
    Title = "Aviso Legal";
    Body = LegalNotice;
  } else {
    Title = "Política de Privacidad";
    Body = Privacy;
  }

  useEffect(() => {
    try {
      localStorage.setItem("legal-last", type);
    } catch {}
  }, [type]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const t = setTimeout(() => dialogRef.current?.focus?.(), 0);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onClose?.(), 200);
  };

  useScrollLock(true, "legal-modal");
  useFocusTrap(dialogRef, !closing);
  useGlobalInert(!closing);

  return (
    <div className="fixed inset-0 z-[160]">
      <button
        aria-label="Cerrar"
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity duration-200 ${
          closing ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-title"
        tabIndex={-1}
        ref={dialogRef}
        className={`fixed inset-x-0 bottom-0 z-[165] max-h-[70vh] overflow-y-auto rounded-t-2xl bg-white p-4 shadow-2xl sm:inset-0 sm:m-auto sm:h-auto sm:max-w-md sm:w-[92vw] sm:rounded-2xl sm:p-6 transform transition duration-200 ease-out ${
          closing
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-2 sm:translate-y-0"
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-2">
          <h3
            id="legal-title"
            className="text-base sm:text-lg font-semibold text-gray-900"
          >
            {Title}
          </h3>
          <button
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-3 text-sm leading-relaxed text-gray-800">
          <Body />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            onClick={handleClose}
            className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
