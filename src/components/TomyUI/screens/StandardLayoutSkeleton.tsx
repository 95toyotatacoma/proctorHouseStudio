/* =========================
   StandardLayoutSkeleton.tsx
   ========================= */
import React from "react";
import { MainDisplay } from "../../TomyUI/components/MainDisplay";
import { MainDisplayDialogue } from "../../TomyUI/components/MainDisplayDialogue";
import { MainControlPanel } from "../../TomyUI/components/MainControlPanel";

export default function StandardLayoutSkeleton({
  label = "TOMY-panel-UI-day",
}: {
  label?: string;
}) {
  return (
    <section className="tomy-screen" aria-label="Tomy standard layout screen">
      <div className="tomy-screen__label">{label}</div>

      <div className="tomy-screen-frame" role="img" aria-label="Standard layout stage">
        <div className="tomy-layout tomy-day">
          {/* LEFT: main display + dialogue */}
          <div className="tomy-layout__left" aria-label="Main display column">
            <MainDisplay />

            <MainDisplayDialogue
              ariaLabel="Tomy greeting"
              variant="titleSubtext"
              title="Hello,"
              subtext="I am Tomy."
            />
          </div>

          {/* RIGHT: main control panel */}
          <aside className="tomy-layout__right tomy-controls" aria-label="Main control panel">
            <MainControlPanel />
          </aside>
        </div>
      </div>
    </section>
  );
}