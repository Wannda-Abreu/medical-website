const TX = "f_auto,q_auto,dpr_auto";
function cld(url: string, w: number) {
  const inject = `/upload/${TX},w_${w}/`;
  return url.replace(/\/upload\/.*?\//, inject);
}

type Img = { src: string; alt: string };

export default function HorizontalMosaicFullWidth({
  images = [],
  heightClasses = "h-40 md:h-48 lg:h-56",
  rounded = "rounded-xl",
}: {
  images?: Img[];
  heightClasses?: string;
  rounded?: string;
}) {
  const gradients = [
    "bg-[linear-gradient(135deg,#E9F8F7_0%,#F2F9E4_100%)]",
    "bg-[linear-gradient(135deg,#009D981A,#AFCA0B1A)]",
    "bg-[linear-gradient(135deg,#006B68_0%,#009D98_20%,#AFCA0B_100%)]",
  ];

  const pattern: ("img" | "color")[] = [
    "img",
    "color",
    "img",
    "color",
    "img",
    "color",
  ];
  let imgIdx = 0;

  return (
    <section className="relative w-screen overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 left-1/4 h-56 w-56 rounded-full bg-[#009D98]/10 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-[#AFCA0B]/10 blur-3xl" />
        <div className="absolute top-1/3 right-0 h-40 w-40 rounded-full bg-[#006B68]/10 blur-2xl" />
      </div>

      <div className="mx-auto w-screen px-4 md:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {pattern.map((slot, i) => {
            const isImg = slot === "img" && images[imgIdx];
            const colorClass = gradients[i % gradients.length];

            return (
              <div
                key={i}
                className={[
                  heightClasses,
                  rounded,
                  "overflow-hidden ring-1 ring-[#009D98]/20 bg-white",
                  "transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]",
                  "hover:shadow-[0_8px_24px_rgba(0,157,152,0.12)] hover:ring-[#009D98]/40",
                  "focus-within:ring-2 focus-within:ring-[#009D98]/60",
                  "motion-reduce:transition-none",
                ].join(" ")}
              >
                {isImg ? (
                  <img
                    src={cld(images[imgIdx].src, 1200)}
                    alt={images[imgIdx++].alt}
                    className="h-full w-full object-cover object-top transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ) : (
                  <div
                    aria-hidden
                    className={`h-full w-full ${colorClass} transition-colors duration-300 hover:brightness-[1.05]`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
