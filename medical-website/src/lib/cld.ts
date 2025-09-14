const TX = "f_auto,q_auto,dpr_auto";
export function cld(url: string, w: number, cover = false) {
  const base = cover ? `${TX},c_fill` : TX;
  const inject = `/upload/${base},w_${w}/`;
  return typeof url === "string" ? url.replace(/\/upload\/.*?\//, inject) : url;
}
export function srcset(url: string, widths: number[], cover = false) {
  return widths.map((w) => `${cld(url, w, cover)} ${w}w`).join(", ");
}
export function sizesFor(maxPx: number) {
  return `(min-width: ${maxPx}px) ${Math.round(maxPx)}px, 100vw`;
}
