// src/pages/Projects/Tomy2000Page.tsx
import { useEffect, useMemo, useState } from "react";
import CarouselRail from "../../components/media/CarouselRail";
import StudioTextCard from "../../components/studio/StudioTextCard";
import CardTriImage from "../../components/media/CardTriImage";
import StandardLayoutSkeleton from "../../components/TomyUI/screens/StandardLayoutSkeleton";
import { StartupSkeleton } from "../../components/TomyUI/screens/StartupSkeleton";
import MobileSwipeCarousel from "../../components/media/MobileSwipeCarousel";

type ProjectBg = "dividers" | "very-back";

export default function Tomy2000Page() {
  const [isCompact, setIsCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ page theme toggle (use this on other projects)
  const bg: ProjectBg = "very-back"; // change to "dividers" when you want the other background

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 719px)");
    const applyMobile = () => setIsMobile(mq.matches);

    applyMobile();
    mq.addEventListener?.("change", applyMobile);
    return () => mq.removeEventListener?.("change", applyMobile);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const threshold = 220;
      setIsCompact(window.scrollY > threshold);
    };

    handleScroll();

    // ✅ don’t run “compact” behavior on mobile (keeps layout stable)
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  const triImages = useMemo(
    () => [
      { src: "/images/tomy/tri-images/full.jpeg", alt: "Tomy 2000 full view" },
      { src: "/images/tomy/tri-images/side.jpeg", alt: "Tomy 2000 side view" },
      { src: "/images/tomy/tri-images/guts.jpeg", alt: "Tomy 2000 interior" },
    ],
    []
  );

  const projectSwipeItems = useMemo(
    () => [
      { id: "t1", src: "/images/tomy/jpg/IMG_6635.jpeg", alt: "" },
      { id: "t2", src: "/images/tomy/jpg/IMG_6652.jpeg", alt: "" },
      { id: "t3", src: "/images/tomy/jpg/IMG_6676.jpeg", alt: "" },
      { id: "t4", src: "/images/tomy/jpg/IMG_6680.jpeg", alt: "" },
      { id: "t5", src: "/images/tomy/jpg/IMG_6686.jpeg", alt: "" },
      { id: "t6", src: "/images/tomy/jpg/IMG_6690.jpeg", alt: "" },
      { id: "t7", src: "/images/tomy/jpg/IMG_6713.jpeg", alt: "" },
      { id: "t8", src: "/images/tomy/jpg/IMG_6717.jpeg", alt: "" },
      { id: "t9", src: "/images/tomy/jpg/IMG_6726.jpeg", alt: "" },
      { id: "t10", src: "/images/tomy/jpg/IMG_6743.jpeg", alt: "" },
      { id: "t11", src: "/images/tomy/jpg/IMG_6752.jpeg", alt: "" },
      { id: "t12", src: "/images/tomy/jpg/IMG_6764.jpeg", alt: "" },
      { id: "t13", src: "/images/tomy/jpg/IMG_6769.jpeg", alt: "" },
      { id: "t14", src: "/images/tomy/jpg/IMG_6787.jpeg", alt: "" },
      { id: "t15", src: "/images/tomy/jpg/IMG_6794.jpeg", alt: "" },
      { id: "t16", src: "/images/tomy/jpg/IMG_6814.jpeg", alt: "" },
      { id: "t17", src: "/images/tomy/jpg/IMG_6827.jpeg", alt: "" },
      { id: "t18", src: "/images/tomy/jpg/conceptA.png", alt: "" },
      { id: "t19", src: "/images/tomy/jpg/conceptB.png", alt: "" },
      { id: "t20", src: "/images/tomy/jpg/displayopening.jpeg", alt: "" },
      { id: "t21", src: "/images/tomy/jpg/displayribbon.jpeg", alt: "" },
      { id: "t22", src: "/images/tomy/jpg/fusionpart1.jpeg", alt: "" },
      { id: "t23", src: "/images/tomy/jpg/fustionpart2.jpeg", alt: "" },
      { id: "t24", src: "/images/tomy/jpg/mb-close.jpeg", alt: "" },
      { id: "t25", src: "/images/tomy/jpg/motherboard-original.jpeg", alt: "" },
      { id: "t26", src: "/images/tomy/jpg/opencavity.jpeg", alt: "" },
      { id: "t27", src: "/images/tomy/jpg/powercables.jpeg", alt: "" },
    ],
    []
  );

  const shellClass = [
    "home-shell",
    "project-shell",
    "tomy-shell",
    isCompact ? "home-shell--compact" : "",
    bg === "very-back" ? "project-shell--very-back" : "project-shell--dividers",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={shellClass}>
      {/* SECTION 1: HERO */}
      <section className="home-hero-section">
        <div className="home-inner">
          <section className="home-shell__frame">
            <section className="home-hero">
              <div className="home-hero__inner">
                <header
                  className="project-header project-header--enter stack-jumbo"
                  aria-label="Project header"
                >
                  <h1 className="home-inline-logo__proctor">Tomy 2000</h1>

                  <section className="project-tri" aria-label="Tri-image card">
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

      {/* SECTION 2: INLINE STRIP + MOBILE SWIPE + CONTENT */}
      <section className="home-divider-group">
        <div className="home-inner">
          <div className={`home-inline-logo project-inline-logo ${isCompact ? "shadow-active" : ""}`}>
            <div className="home-inline-logo__row">
              <div className="home-inline-logo__text">
                <span className="home-inline-logo__proctor">Tomy 2000</span>
              </div>
            </div>
          </div>

          {/* ✅ ONLY on mobile */}
          {isMobile && (
            <div className="project-mobile-swipe">
              <MobileSwipeCarousel items={projectSwipeItems} />
            </div>
          )}

          <section
            className={[
              "home-content-section",
              bg === "very-back" ? "home-content-section--very-back" : "home-content-section--dividers",
            ].join(" ")}
          >
            <div className="home-content-inner stack-jumbo project-content-inner">
              <StudioTextCard title="A Retrofuturist Robot Reimagined">
                <p>
                  We’re breathing new life into a nostalgic icon. The Tomy Project is a modern reinvention of the classic 1980s Omnibot 2000—restored, rebuilt, and
                  reimagined with modern technology.
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
                <p>
                  We designed Tomy’s UI to reflect a deeply intuitive, playful, and functionally robust system that mirrors the personality and intelligence of the robot
                  himself.
                </p>
              </StudioTextCard>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}