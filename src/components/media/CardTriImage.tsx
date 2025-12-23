// src/components/media/CardTriImage.tsx
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
            <img
              src={img.src}
              alt={img.alt ?? ""}
              loading="lazy"
              draggable="false"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}