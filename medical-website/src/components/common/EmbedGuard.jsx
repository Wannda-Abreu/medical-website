import { useEffect, useState } from "react";
export default function EmbedGuard({
  typeKey = "embeds",
  children,
  placeholder,
  buttonLabel = "Activar contenidos",
}) {
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    try {
      const v = localStorage.getItem("cookie-consent");
      if (!v) return setAllowed(true);
      const p = JSON.parse(v);
      if (p && typeof p === "object" && typeKey in p)
        return setAllowed(!!p[typeKey]);
      setAllowed(true);
    } catch {
      setAllowed(true);
    }
  }, [typeKey]);

  const enable = () => {
    try {
      const v = localStorage.getItem("cookie-consent");
      const prev = v ? JSON.parse(v) : {};
      const next = { v: 1, ...(prev || {}), [typeKey]: true, t: Date.now() };
      localStorage.setItem("cookie-consent", JSON.stringify(next));
    } catch {}
    setAllowed(true);
  };

  if (allowed) return children;

  return (
    <div className="grid h-full w-full place-items-center bg-white/90">
      {placeholder || (
        <div className="text-center px-4">
          <p className="text-sm text-gray-700">
            Para ver este contenido de terceros necesitas activarlo.
          </p>
          <button
            onClick={enable}
            className="mt-3 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-primary-700 px-4 py-2 text-sm font-semibold text-white hover:from-primary-700 hover:to-primary-800"
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
}
