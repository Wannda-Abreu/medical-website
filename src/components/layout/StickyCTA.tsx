"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarCheck, Phone, MessageCircle } from "lucide-react";

type Props = {
  bookingUrl?: string;
  phone?: string;
  whatsapp?: string; // E.164 sin + para wa.me
  className?: string;
  usePortal?: boolean;
};

export default function StickyCTA({
  bookingUrl = "https://booking.slotspot.app/sanital",
  phone = "+34 678 123 456",
  whatsapp = "34678123456",
  className = "",
  usePortal = false, // mejor desactivar portal por defecto
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [hide, setHide] = useState(false);

  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const waHref = `https://wa.me/${whatsapp}`;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setHide(entry.isIntersecting),
      // Hide CTA earlier (before footer overlaps): expand bottom margin more
      { root: null, threshold: 0, rootMargin: "0px 0px 360px 0px" }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const node = (
    <div
      role="region"
      aria-label="Acciones rápidas: agendar cita, WhatsApp o llamar"
      className={[
        // siempre pegado a la izquierda
        "fixed inset-x-4 bottom-4 z-[120] lg:left-6 lg:right-auto lg:inset-x-auto",
        "rounded-2xl bg-white/90 shadow-xl ring-1 ring-primary/20 backdrop-blur",
        "px-3 py-2 sm:px-3.5 sm:py-2.5",
        "supports-[backdrop-filter]:bg-white/70",
        "flex items-center gap-2 sm:gap-2.5 max-w-[720px]",
        "transition-opacity duration-200",
        hide ? "opacity-0 pointer-events-none" : "opacity-100",
        "pointer-events-auto print:hidden",
        className,
      ].join(" ")}
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)" }}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-700 px-4 py-2.5 text-sm sm:text-base font-semibold text-white hover:text-white hover:from-primary-700 hover:to-primary-800 shadow-sm transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        <span>Agendar cita</span>
      </a>

      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-3.5 py-2.5 text-sm sm:text-base font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        <span className="sm:hidden">Chat</span>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

      <a
        href={telHref}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/30 bg-white px-3.5 py-2.5 text-sm sm:text-base font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
        <span className="sm:hidden">Tel</span>
        <span className="hidden sm:inline">Llamar</span>
      </a>
    </div>
  );

  if (!mounted) return null;
  return usePortal ? createPortal(node, document.body) : node;
}
