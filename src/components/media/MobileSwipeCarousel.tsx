import React from "react";
import SmartImage from "./SmartImage";

export type CarouselItem =
  | { id: string; alt?: string; src: string }
  | { id: string; alt?: string; imageBase: string };

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: "c1", src: "/images/home/jpg/IMG_0020.jpeg", alt: "" },
  { id: "c2", src: "/images/home/jpg/IMG_0045.jpeg", alt: "" },
  { id: "c3", src: "/images/home/jpg/IMG_3945.jpeg", alt: "" },
  { id: "c4", src: "/images/home/jpg/IMG_3980.jpeg", alt: "" },
  { id: "c5", src: "/images/home/jpg/IMG_4087.jpeg", alt: "" },
  { id: "c6", src: "/images/home/jpg/IMG_4277.jpeg", alt: "" },
  { id: "c7", src: "/images/home/jpg/IMG_4671.jpeg", alt: "" },
  { id: "c8", src: "/images/home/jpg/IMG_4923.jpeg", alt: "" },
  { id: "c9", src: "/images/home/jpg/IMG_5864.jpeg", alt: "" },
  { id: "c10", src: "/images/home/jpg/IMG_6260.jpeg", alt: "" },
  { id: "c11", src: "/images/home/jpg/IMG_6321.jpeg", alt: "" },
  { id: "c12", src: "/images/home/jpg/IMG_6371.jpeg", alt: "" },
 // { id: "c13", src: "/images/home/jpg/IMG_6373.jpg", alt: "" },
  { id: "c14", src: "/images/home/jpg/IMG_6461.jpeg", alt: "" },
  { id: "c15", src: "/images/home/jpg/IMG_6464.jpeg", alt: "" },
  { id: "c16", src: "/images/home/jpg/IMG_7237.jpeg", alt: "" },
  { id: "c17", src: "/images/home/jpg/IMG_7241.jpeg", alt: "" },
  { id: "c18", src: "/images/home/jpg/IMG_7242.jpeg", alt: "" },
  { id: "c19", src: "/images/home/jpg/IMG_7243.jpeg", alt: "" },
  { id: "c20", src: "/images/home/jpg/IMG_7244.jpeg", alt: "" },
  { id: "c21", src: "/images/home/jpg/curio-dining.jpg", alt: "" },
  { id: "c22", src: "/images/home/jpg/the-moon-close.jpeg", alt: "" },
  { id: "c23", src: "/images/home/jpg/the-moon-far.jpeg", alt: "" },
  { id: "c24", src: "/images/home/jpg/tomy-model-screenshot.png", alt: "" },
  { id: "c25", src: "/images/home/jpg/tomy-model-screenshot02.png", alt: "" },
];

export default function MobileSwipeCarousel({
  items = DEFAULT_ITEMS,
}: {
  items?: CarouselItem[];
}) {
  return (
    <section className="mobile-swipe" aria-label="Featured work">
      <div className="mobile-swipe__track">
        {items.map((item, index) => {
          const resolvedSrc = "src" in item ? item.src : item.imageBase;

          return (
            <div key={item.id} className="mobile-swipe__slide">
              <SmartImage
                className="mobile-swipe__img"
                src={resolvedSrc}
                alt={item.alt ?? ""}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                widths={[480, 768, 1024]}
                sizes="(max-width: 719px) 70vw, 600px"
              />
            </div>
          );
        })}
      </div>

      {/* Always show 3 dots — middle is active */}
      <div className="mobile-swipe__dots" aria-hidden="true">
        <span className="mobile-swipe__dot" />
        <span className="mobile-swipe__dot is-active" />
        <span className="mobile-swipe__dot" />
      </div>
    </section>
  );
}