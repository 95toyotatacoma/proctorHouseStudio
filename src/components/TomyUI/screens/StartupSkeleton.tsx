/* =========================
   StartupSkeleton.tsx
   ========================= */

export function StartupSkeleton({
  label = "TOMY-startup-UI",
}: {
  label?: string;
}) {
  return (
    <section className="tomy-screen" aria-label="Tomy startup screen">
      <div className="tomy-screen__label">{label}</div>

      <div className="tomy-screen-frame" role="img" aria-label="Startup stage">
        <div className="tomy-startup">
          {/* 1) Name */}
          <div className="tomy-startup__name" aria-label="Tomy name">
            <span className="tomy-startup__word">Tomy</span>
            <span className="tomy-startup__year">2000</span>
          </div>

          {/* 2) Progress */}
          <div className="tomy-startup__progress" aria-label="Startup progress">
            <div className="tomy-progress">
              <div className="tomy-progress__fill" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}