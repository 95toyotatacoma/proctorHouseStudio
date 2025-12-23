// src/components/media/PhotoBlock.tsx
type Photo = { src: string; alt?: string };

type PhotoBlockProps = {
  photos: Photo[];
  columns?: 1 | 2 | 3;
};

export default function PhotoBlock({ photos, columns = 2 }: PhotoBlockProps) {
  const colsClass =
    columns === 1
      ? "photo-block photo-block--1"
      : columns === 3
      ? "photo-block photo-block--3"
      : "photo-block photo-block--2";

  return (
    <section className={colsClass} aria-label="Photo block">
      {photos.map((p, i) => (
        <figure key={i} className="photo-block__item">
          {/* ✅ wrapper is what fixes SVG corner clipping */}
          <div className="photo-block__frame">
            <img
              className="photo-block__img"
              src={p.src}
              alt={p.alt ?? ""}
              loading="lazy"
              draggable="false"
            />
          </div>
        </figure>
      ))}
    </section>
  );
}