import React from "react";

type SmartImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt?: string;

  /** widths that exist in your images-optimized output */
  widths?: number[];

  /** base path for optimized assets */
  optimizedPrefix?: string;

  /** if true, bypass optimization mapping */
  disableOptimize?: boolean;
};

const DEFAULT_WIDTHS = [480, 768, 1024, 1440, 1920];

function stripExt(path: string) {
  return path.replace(/\.(jpe?g|png|webp|avif)$/i, "");
}

function ensureLeadingSlash(p: string) {
  return p.startsWith("/") ? p : `/${p}`;
}

function toOptimizedBase(originalSrc: string, optimizedPrefix: string) {
  const src = ensureLeadingSlash(originalSrc);
  const mapped = src.startsWith("/images/")
    ? src.replace(/^\/images/, optimizedPrefix)
    : `${optimizedPrefix}${src}`;
  return stripExt(mapped);
}

export default function SmartImage({
  src,
  alt = "",
  widths = DEFAULT_WIDTHS,
  optimizedPrefix = "/images-optimized",
  disableOptimize = false,
  loading,
  decoding,
  fetchPriority,
  sizes,
  ...rest
}: SmartImageProps) {
  const resolvedLoading = loading ?? "lazy";
  const resolvedDecoding = decoding ?? "async";

  if (disableOptimize) {
    return (
      <img
        src={src}
        alt={alt}
        loading={resolvedLoading}
        decoding={resolvedDecoding}
        fetchPriority={fetchPriority}
        {...rest}
      />
    );
  }

  const base = toOptimizedBase(src, optimizedPrefix);
  const useSources = widths.length > 0;
  const srcSet = (format: "avif" | "webp") =>
    widths.map((w) => `${base}-${w}.${format} ${w}w`).join(", ");

  return (
    <picture>
      {useSources && (
        <>
          <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes ?? "100vw"} />
          <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes ?? "100vw"} />
        </>
      )}
      <img
        src={`${base}.jpg`}
        alt={alt}
        loading={resolvedLoading}
        decoding={resolvedDecoding}
        fetchPriority={fetchPriority}
        {...rest}
      />
    </picture>
  );
}
