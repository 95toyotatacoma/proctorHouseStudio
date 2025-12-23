// src/components/media/CarouselCard.tsx

type CarouselCardProps = {
  imageSrc: string;
  alt?: string;
};

export default function CarouselCard({
  imageSrc,
  alt = "Proctor House Studio feature",
}: CarouselCardProps) {
  return (
    <div className="carousel-card">
      <div className="carousel-card__media">
        <img
          src={imageSrc}
          alt={alt}
          loading="eager"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/images/fallbacks/carousel-fallback.jpeg";
          }}
        />
      </div>
    </div>
  );
}