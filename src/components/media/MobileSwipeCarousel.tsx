import React from "react";

type CarouselItem = {
  id: string;
  src: string;
  alt?: string;
};

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: "c1", src: "/images/home/jpg/curio-dining.jpg", alt: "" },
  { id: "c2", src: "/images/home/jpg/the-moon-close.jpeg", alt: "" },
  { id: "c3", src: "/images/home/jpg/the-moon-far.jpeg", alt: "" },
  { id: "c4", src: "/images/home/jpg/IMG_7241.jpeg", alt: "" },
];

export default function MobileSwipeCarousel({
  items = DEFAULT_ITEMS,
}: {
  items?: CarouselItem[];
}) {
  return (
    <section className="mobile-swipe" aria-label="Featured work">
      <div className="mobile-swipe__track">
        {items.map((item) => (
          <div key={item.id} className="mobile-swipe__slide">
            <img
              className="mobile-swipe__img"
              src={item.src}
              alt={item.alt ?? ""}
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div className="mobile-swipe__dots" aria-hidden="true">
        {items.map((item) => (
          <span key={item.id} className="mobile-swipe__dot" />
        ))}
      </div>
    </section>
  );
}
