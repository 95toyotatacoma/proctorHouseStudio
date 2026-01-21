// src/components/media/CarouselCard.tsx
import SmartImage from "./SmartImage";

type CarouselCardProps = {
  imageSrc: string;
  alt?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export default function CarouselCard({
  imageSrc,
  alt = "Proctor House Studio feature",
  loading = "lazy",
  fetchPriority = "auto",
}: CarouselCardProps) {
  return (
    <div className="carousel-card">
      <div className="carousel-card__media">
        <SmartImage
          src={imageSrc}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/fallbacks/carousel-fallback.jpeg";
          }}
        />
      </div>
    </div>
  );
}
