const DEFAULT_TRANSFORMS = "f_auto,q_auto,c_fill";

export function cld(url, w = 800) {
  if (!url || typeof url !== "string") return url;
  try {
    if (url.includes("/upload/")) {
      const inject = `/upload/${DEFAULT_TRANSFORMS},w_${w}/`;
      return url.replace(/\/upload\/.*?\//, inject);
    }
    return url;
  } catch {
    return url;
  }
}

export function cldSrcSet(url, widths = [320, 480, 640, 960, 1280]) {
  const src = cld(url, widths[Math.floor(widths.length / 2)]);
  const srcSet = widths.map((w) => `${cld(url, w)} ${w}w`).join(", ");
  return { src, srcSet };
}

