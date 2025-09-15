import React from "react";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  eager?: boolean;
  className?: string;
  sizes?: string;
  srcSet?: string;
  style?: React.CSSProperties;
};

export default function SmartImage({ src, alt, width, height, eager, className, sizes = "100vw", srcSet, style }: Props) {
  const loading = eager ? "eager" : "lazy";
  const fetchpriority = eager ? "high" : "auto";
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      fetchpriority={fetchpriority as any}
      sizes={sizes}
      srcSet={srcSet}
      className={className}
      style={style}
    />
  );
}

