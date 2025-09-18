export default function ContactTop() {
  return (
    <div className="w-full bg-slate-50 text-slate-900 text-sm py-2">
      <div className="mx-auto max-w-7xl px-4 flex flex-wrap items-center gap-x-6 gap-y-1">
        <a href="tel:+34926923838" className="font-semibold">926 923 838</a>
        <span className="text-slate-600">Atención primaria</span>
        <a href="tel:+34621126286" className="font-semibold">621 126 286</a>
        <span className="text-slate-600">Servicios y profesionales</span>
        <address className="not-italic ml-auto">C/ del Río, 8, Ciudad Real</address>
      </div>
    </div>
  )
}

