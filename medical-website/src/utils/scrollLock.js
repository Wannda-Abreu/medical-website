// Simple key-based scroll lock with reference counting
// Locks both html and body overflow, restoring previous values when last lock is released

import { useEffect } from "react";

let locks = new Set();
let prevHtmlOverflow = "";
let prevBodyOverflow = "";

function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function lockScroll(key = "default") {
  if (!canUseDOM()) return;
  if (locks.size === 0) {
    try {
      prevHtmlOverflow = document.documentElement?.style?.overflow || "";
      prevBodyOverflow = document.body?.style?.overflow || "";
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } catch {}
  }
  locks.add(key);
}

export function unlockScroll(key = "default") {
  if (!canUseDOM()) return;
  locks.delete(key);
  if (locks.size === 0) {
    try {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    } catch {}
  }
}

export function useScrollLock(enabled, key = "default") {
  useEffect(() => {
    if (!enabled) return;
    lockScroll(key);
    return () => unlockScroll(key);
  }, [enabled, key]);
}

