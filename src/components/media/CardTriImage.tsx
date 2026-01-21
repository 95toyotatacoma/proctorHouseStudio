// src/components/media/CardTriImage.tsx
import SmartImage from "./SmartImage";

type CardTriImageProps = {
  images: {
    src: string;
    alt?: string;
  }[];
};

export default function CardTriImage({ images }: CardTriImageProps) {
  return (
    <section className="card-tri-image" aria-label="Three image card">
      <div className="card-tri-image__row">
        {images.slice(0, 3).map((img, index) => (
          <figure
            key={index}
            className="card-tri-image__item"
          >
            <SmartImage
              src={img.src}
              alt={img.alt ?? ""}
              draggable={false}
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
