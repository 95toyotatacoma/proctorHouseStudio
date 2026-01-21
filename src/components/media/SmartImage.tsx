import React, { useMemo, useState } from "react";

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

const DEFAULT_WIDTHS = [480, 768, 1024];

function stripExt(path: string) {
  return path.replace(/\.(jpe?g|png|webp|avif)$/i, "");
}

function ensureLeadingSlash(p: string) {
  return p.startsWith("/") ? p : `/${p}`;
}

function getExt(path: string) {
  const m = path.match(/\.(jpe?g|png|webp|avif)$/i);
  return m ? `.${m[1].toLowerCase()}` : "";
}

function toOptimizedBase(originalSrc: string, optimizedPrefix: string) {
  const src = ensureLeadingSlash(originalSrc);

  const mapped = src.startsWith("/images/")
    ? src.replace(/^\/images/, optimizedPrefix)
    : `${optimizedPrefix}${src}`;

  return stripExt(mapped);
}

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
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
  onError,
  ...rest
}: SmartImageProps) {
  const resolvedLoading = loading ?? "lazy";
  const resolvedDecoding = decoding ?? "async";

  // If user explicitly bypasses optimization
  if (disableOptimize) {
    return (
      <img
        src={src}
        alt={alt}
        loading={resolvedLoading}
        decoding={resolvedDecoding}
        fetchPriority={fetchPriority}
        onError={onError}
        {...rest}
      />
    );
  }

  const base = useMemo(() => toOptimizedBase(src, optimizedPrefix), [src, optimizedPrefix]);
  const origExt = useMemo(() => getExt(src), [src]);

  // ✅ Robust fallback list (optimized first, then original)
  const fallbackCandidates = useMemo(() => {
    // try the same ext as the original first (normalized to lowercase)
    // then common fallbacks your pipeline likely emitted
    const candidates = [
      origExt ? `${base}${origExt}` : null,
      `${base}.jpg`,
      `${base}.jpeg`,
      `${base}.png`,
      src, // ultimate fallback to the original asset
    ].filter(Boolean) as string[];

    return uniq(candidates);
  }, [base, origExt, src]);

  const [fallbackIndex, setFallbackIndex] = useState(0);
  const imgSrc = fallbackCandidates[Math.min(fallbackIndex, fallbackCandidates.length - 1)];

  const useSources = widths.length > 0;
  const srcSet = (format: "avif" | "webp") =>
    widths.map((w) => `${base}-${w}.${format} ${w}w`).join(", ");

  const handleImgError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    // keep bubbling to caller if they passed onError
    onError?.(e);

    // try next fallback candidate
    setFallbackIndex((i) => {
      const next = i + 1;
      return next < fallbackCandidates.length ? next : i;
    });
  };

  return (
    <picture>
      {useSources && (
        <>
          <source
            type="image/avif"
            srcSet={srcSet("avif")}
            sizes={sizes ?? "100vw"}
          />
          <source
            type="image/webp"
            srcSet={srcSet("webp")}
            sizes={sizes ?? "100vw"}
          />
        </>
      )}

      <img
        src={imgSrc}
        alt={alt}
        loading={resolvedLoading}
        decoding={resolvedDecoding}
        fetchPriority={fetchPriority}
        onError={handleImgError}
        {...rest}
      />
    </picture>
  );
}