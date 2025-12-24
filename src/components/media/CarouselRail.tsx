import { useEffect, useMemo, useRef } from "react";
import CarouselCard from "./CarouselCard";
import { CAROUSEL_MANIFEST } from "./carouselManifest";

type FolderKey = keyof typeof CAROUSEL_MANIFEST;

type CarouselRailProps = {
  folderKey: FolderKey;
  alt?: string;
  ariaLabel?: string;
};

export default function CarouselRail({
  folderKey,
  alt = "Proctor House Studio carousel feature",
  ariaLabel = "Life at the studio",
}: CarouselRailProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const files = CAROUSEL_MANIFEST[folderKey];

  const carouselImages = useMemo(
    () =>
      files.map((fileName) => ({
        src: `/images/${folderKey}/jpg/${fileName}`,
        alt,
      })),
    [files, folderKey, alt]
  );

  // Duplicate for seamless loop
  const loopImages = useMemo(
    () => [...carouselImages, ...carouselImages],
    [carouselImages]
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const setDistance = () => {
      // Track has 2x items; loop distance = half the scrollHeight
      const distance = track.scrollHeight / 2;
      track.style.setProperty("--carousel-loop-distance", `${distance}px`);
    };

    // Set once now
    setDistance();

    // Recompute after images load (important)
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

    // Recompute on resize
    window.addEventListener("resize", setDistance);
    return () => window.removeEventListener("resize", setDistance);
  }, [loopImages.length]);

  return (
    <aside className="carousel-rail" aria-label={ariaLabel}>
      <div className="carousel-rail__track" ref={trackRef}>
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