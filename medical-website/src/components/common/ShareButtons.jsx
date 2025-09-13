import { useMemo } from "react";

export default function ShareButtons({
  url,
  text = "Descubre Clínica Sanital",
  className = "",
}) {
  const shareUrl = useMemo(() => encodeURIComponent(url || window.location.href), [url]);
  const shareText = useMemo(() => encodeURIComponent(text), [text]);

  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      aria: "Compartir por WhatsApp",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      aria: "Compartir en Facebook",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      aria: "Compartir en LinkedIn",
    },
  ];

  return (
    <div className={["flex flex-wrap items-center gap-2", className].join(" ")}> 
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={l.aria}
          className="inline-flex items-center rounded-lg border border-primary/30 bg-white px-3 py-1.5 text-sm font-semibold text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

