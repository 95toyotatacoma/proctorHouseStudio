import { useEffect, useMemo, useRef, useState } from "react";
import CarouselCard from "./CarouselCard";
import { CAROUSEL_MANIFEST } from "./carouselManifest";

type FolderKey = keyof typeof CAROUSEL_MANIFEST;

type CarouselRailProps = {
  folderKey: FolderKey;
  alt?: string;
  ariaLabel?: string;
};

function PlayIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M16 12.8
           Q16 12 16.8 12.5
           L28 19.2
           Q29 19.8 28 20.4
           L16.8 27.5
           Q16 28 16 27.2
           Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
      <path
        d="M16 13v14M24 13v14"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CarouselRail({
  folderKey,
  alt = "Proctor House Studio carousel feature",
  ariaLabel = "Life at the studio",
}: CarouselRailProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // ✅ Global persist across the whole site (Home ↔ Tomy2000, etc.)
  const STORAGE_KEY = "phs_carousel_paused_v1";

  // ✅ Hydrate immediately (prevents flicker on navigation/mount)
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  });

  // ✅ Persist whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, isPaused ? "1" : "0");
  }, [isPaused]);

  const files = CAROUSEL_MANIFEST[folderKey];

  const carouselImages = useMemo(
    () =>
      files.map((fileName) => ({
        src: `/images/${folderKey}/jpg/${fileName}`,
        alt,
      })),
    [files, folderKey, alt]
  );

  const loopImages = useMemo(
    () => [...carouselImages, ...carouselImages],
    [carouselImages]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setDistance = () => {
      const distance = track.scrollHeight / 2;
      track.style.setProperty("--carousel-loop-distance", `${distance}px`);
    };

    setDistance();

    const imgs = Array.from(track.querySelectorAll("img"));
    let remaining = imgs.length;

    const onDone = () => {
      remaining -= 1;
      if (remaining <= 0) setDistance();
    };

    imgs.forEach((img) => {
      if (img.complete) onDone();
      else {
        img.addEventListener("load", onDone, { once: true });
        img.addEventListener("error", onDone, { once: true });
      }
    });

    window.addEventListener("resize", setDistance);
    return () => window.removeEventListener("resize", setDistance);
  }, [loopImages.length]);

  const togglePaused = () => setIsPaused((p) => !p);

  return (
    <aside
      className={`carousel-rail ${isPaused ? "is-paused" : ""}`}
      aria-label={ariaLabel}
    >
      <button
        type="button"
        className="carousel-rail__toggle"
        onClick={togglePaused}
        aria-label={isPaused ? "Play carousel animation" : "Pause carousel animation"}
        aria-pressed={isPaused}
        title={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? <PlayIcon /> : <PauseIcon />}
      </button>

      <div
        className={`carousel-rail__track ${isPaused ? "is-paused" : ""}`}
        ref={trackRef}
      >
        {loopImages.map((image, index) => (
          <CarouselCard
            key={`${image.src}-${index}`}
            imageSrc={image.src}
            alt={image.alt}
          />
        ))}
      </div>
    </aside>
  );
}