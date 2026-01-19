// src/pages/Projects/Tomy2000Page.tsx
import { useEffect, useState } from "react";
import NavRail from "../../components/navigation/NavRail";
import CarouselRail from "../../components/media/CarouselRail";
import StudioTextCard from "../../components/studio/StudioTextCard";
import CardTriImage from "../../components/media/CardTriImage";
import PhotoBlock from "../../components/media/PhotoBlock";
import StandardLayoutSkeleton from "../../components/TomyUI/screens/StandardLayoutSkeleton";
import { StartupSkeleton } 
  from "../../components/TomyUI/screens/StartupSkeleton";

export default function Tomy2000Page() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 220; // same vibe as Home
      setIsCompact(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triImages = [
    { src: "/images/tomy/tri-images/full.jpeg", alt: "Tomy 2000 full view" },
    { src: "/images/tomy/tri-images/side.jpeg", alt: "Tomy 2000 side view" },
    { src: "/images/tomy/tri-images/guts.jpeg", alt: "Tomy 2000 interior" },
  ];

  // ✅ Use Home’s compact class name so existing animations keep working
  const shellClass = isCompact ? "home-shell home-shell--compact" : "home-shell";

  return (
    <main className={shellClass}>
      {/* navigation rail */}
      <nav className="tomy2000-page__navigation" aria-label="Primary navigation">
        <NavRail isOpen={isNavOpen} onToggle={() => setIsNavOpen((v) => !v)} />
      </nav>

      {/* ───────── SECTION 1: HERO ONLY (beige bg + right rail) ───────── */}
      <section className="home-hero-section">
        <div className="home-inner">
          <section className="home-shell__frame">
            <section className="home-hero">
              {/* ✅ mirror Home’s structure so hero animation rules apply */}
              <div className="home-hero__inner">
                {/* ✅ project header stack: title + tri images with jumbo rhythm */}
                <header className="project-header project-header--enter stack-jumbo" aria-label="Project header">
                  <h1 className="home-inline-logo__proctor">Tomy 2000</h1>

                  <section
                    className="tomy2000-page__card-triImage"
                    aria-label="Tri-image card"
                  >
                    <CardTriImage images={triImages} />
                  </section>
                </header>
              </div>
            </section>

            <aside className="home-rail-wrapper" aria-label="Image carousel rail">
              <CarouselRail folderKey="tomy" />
            </aside>
          </section>
        </div>
      </section>

      {/* ───────── SECTION 2: STICKY TITLE STRIP + BROWN CONTENT ───────── */}
      <section className="home-divider-group">
        <div className="home-inner">
          {/* ✅ sticky strip uses same class + animation behavior as Home */}
          <div className={`home-inline-logo ${isCompact ? "shadow-active" : ""}`}>
            <div className="home-inline-logo__row">
              <div className="home-inline-logo__text">
                <span className="home-inline-logo__proctor">Tomy 2000</span>
              </div>
            </div>
          </div>

          {/* brown content area */}
          <section className="home-content-section">
            <div className="home-content-inner stack-jumbo">




              <StudioTextCard title="A Retrofuturist Robot Reimagined">
                <p>
                We’re breathing new life into a nostalgic icon. The Tomy Project is a modern reinvention of the classic 1980s Omnibot 2000—restored, rebuilt, and reimagined with modern technology. Blending 3D design, robotics, and creative storytelling, this hands-on project explores the intersection of past and future, transforming vintage charm into interactive innovation and a whole lot of learning!
                </p>
              </StudioTextCard>


<section className="project-media-block">
  <div className="tomy-embed">
    <StartupSkeleton label="TOMY-startup-UI" />
  </div>

  <div className="tomy-embed">
    <StandardLayoutSkeleton label="TOMY-panel-UI-day" />
  </div>
</section>

              <StudioTextCard title="Tomy’s Interface">
                <p>We designed Tomy’s UI to reflect a deeply intuitive, playful, and functionally robust system that mirrors the personality and intelligence of the robot himself. Each panel and control was crafted to represent states of being—thinking, hearing, and speaking—not merely as utility feedback, but as expressions of presence and companionship.</p>
              </StudioTextCard>

              <StudioTextCard title="">
                <p>His “speaking” moments are animated with vocal-like pulses and accompanied by contextual dialogue, giving users a transparent conversation experience. The “hearing” state is subtly acknowledged through UI indicators and audio cues. A dazzling listening chamber pulses as the user speaks to him. Tomy’s “thinking” animations are dynamic waveforms, designed to evoke cognitive processing while maintaining an elegant, ambient quality.</p>
              </StudioTextCard>

                <StudioTextCard title="">
                <p>We introduced features such as real-time power diagnostics, personality preferences, motion calibration guides, and data privacy settings, all visually unified by a dark skeuomorphic palette with tactile cues. It ensures that interacting with Tomy feels less like managing a machine and more like collaborating with a capable, tactile assistant.</p>
              </StudioTextCard>


</div> {/* end of home-content-inner */}          </section>
        </div>
      </section>
    </main>
  );
}
