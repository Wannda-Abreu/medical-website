import { useEffect } from "react";

const SELECTORS = [
  "header",
  "#site-footer",
  "[role=region][aria-label*='Acciones']",
];

function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function useGlobalInert(active) {
  useEffect(() => {
    if (!canUseDOM() || !active) return;
    const prev = [];
    const nodes = SELECTORS.flatMap((sel) => Array.from(document.querySelectorAll(sel)));
    nodes.forEach((el) => {
      prev.push({ el, aria: el.getAttribute("aria-hidden"), inert: el.hasAttribute("inert") });
      try {
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("inert", "");
      } catch {}
    });
    return () => {
      prev.forEach(({ el, aria, inert }) => {
        try {
          if (aria == null) el.removeAttribute("aria-hidden");
          else el.setAttribute("aria-hidden", aria);
          if (!inert) el.removeAttribute("inert");
        } catch {}
      });
    };
  }, [active]);
}

