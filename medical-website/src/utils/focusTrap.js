import { useEffect } from "react";

function getFocusable(container) {
  if (!container) return [];
  const selectors = [
    'a[href]','area[href]','input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])','textarea:not([disabled])','button:not([disabled])',
    'iframe','object','embed','[tabindex]:not([tabindex="-1"])','[contenteditable="true"]'
  ];
  return Array.from(container.querySelectorAll(selectors.join(',')))
    .filter(el => el.offsetParent !== null || el === container);
}

export function useFocusTrap(ref, active) {
  useEffect(() => {
    if (!active) return;
    const node = ref?.current;
    if (!node) return;

    const ensureFocusInside = () => {
      const focusables = getFocusable(node);
      const first = focusables[0] || node;
      if (!node.contains(document.activeElement)) {
        first.focus?.();
      }
    };

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const focusables = getFocusable(node);
      if (focusables.length === 0) {
        e.preventDefault();
        node.focus?.();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || !node.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !node.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    // Initial focus
    const t = setTimeout(ensureFocusInside, 0);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      clearTimeout(t);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [ref, active]);
}

