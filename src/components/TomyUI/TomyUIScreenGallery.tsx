import { ReactNode } from "react";
import { TomyFrame } from "./components/TomyFrame";
import "./styles/tomy-ui.css";

type ScreenItem = {
  id: string;
  title: string;
  node: ReactNode;
};

export default function TomyUIScreenGallery({ screens }: { screens: ScreenItem[] }) {
  return (
    <section className="tomy-ui-gallery" aria-label="Tomy UI gallery">
      {screens.map((s) => (
        <figure key={s.id} className="tomy-ui-gallery__item">
          <TomyFrame>{s.node}</TomyFrame>
          <figcaption className="tomy-ui-gallery__caption">{s.title}</figcaption>
        </figure>
      ))}
    </section>
  );
}