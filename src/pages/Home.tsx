// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import IntroLogo from "../components/brand/IntroLogo";
import CarouselRail from "../components/media/CarouselRail";
import StudioTextCard from "../components/studio/StudioTextCard";
import StudioSectionCTA from "../components/studio/StudioSectionCTA";
import StudioCardChain from "../components/studio/StudioCardChain";
import HomeProjectsNav from "../components/navigation/HomeProjectsNav";
import type { LayoutOutletContext } from "../components/layout/Layout";
import MobileSwipeCarousel from "../components/media/MobileSwipeCarousel";
import SmartImage from "../components/media/SmartImage";

export default function Home() {
  const { log, isNavOpen, railAnimClass } = useOutletContext<LayoutOutletContext>();
  const { pathname } = useLocation();
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [showCarouselRail, setShowCarouselRail] = useState<boolean>(true);
  const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 719px)").matches;

  useEffect(() => {
    log("mount: pathname", pathname);
  }, []);

  useEffect(() => {
    log("isNavOpen changed", { isNavOpen, railAnimClass });
  }, [isNavOpen, railAnimClass]);

//   useEffect(() => {
//     const updateRailVisibility = () => {
//       const isNarrow = window.matchMedia("(max-width: 900px)").matches;
// setShowCarouselRail(!isNarrow);
//     };

//     updateRailVisibility();
//     window.addEventListener("resize", updateRailVisibility);
//     return () => window.removeEventListener("resize", updateRailVisibility);
//   }, []);


useEffect(() => {
  if (typeof window === "undefined") return;

  const mq = window.matchMedia("(max-width: 719px)");

  const apply = () => {
    if (mq.matches) {
      setIsCompact(false);
      return;
    }
    const threshold = 80;
    setIsCompact(window.scrollY > threshold);
  };

  const onScroll = () => apply();

  apply();

  if (!mq.matches) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  mq.addEventListener?.("change", apply);

  return () => {
    window.removeEventListener("scroll", onScroll);
    mq.removeEventListener?.("change", apply);
  };
}, []);

  const shellClass = [
    "home-shell",
    isCompact ? "home-shell--compact" : "",
    showCarouselRail ? "home-shell--with-rail" : "home-shell--no-rail",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <main className={`${shellClass} with-rails`}>
      {/* HERO (desktop/tablet only) */}
      {!isMobile && (
      <section className="home-hero-section home-hero-section--desktop">
        <div className="home-inner with-rails">
          <section className="home-shell__frame">
            <section className="home-hero">
              <div className="home-hero__inner">
                {!isCompact && <IntroLogo />}
              </div>
            </section>

            {showCarouselRail && (
              <aside className="home-rail-wrapper">
                <CarouselRail folderKey="home" />
              </aside>
            )}
          </section>
        </div>
      </section>
      )}

      {/* MAIN CONTENT */}
      <section className="home-divider-group">
        <div className="home-inner">
          <div className={`home-inline-logo ${isCompact ? "shadow-active" : ""}`}>
            <div className="home-inline-logo__row">
              <div className="home-inline-logo__avatar">
                <SmartImage
                  src="/images/home/logo/2023-arizona.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <div className="home-inline-logo__text">
                <span className="home-inline-logo__proctor">Proctor</span>
                <span className="home-inline-logo__house-studio">
                  House Studio
                </span>
              </div>
            </div>
          </div>

          <div className="home-projects-nav-wrapper">
            <HomeProjectsNav />
          </div>
          {/* ✅ Mobile swipe carousel goes here */}
          {isMobile && <MobileSwipeCarousel />}
          <section className="home-content-section">
            <div className="home-content-inner stack-jumbo">
              <StudioTextCard title="Crafting experiential worlds through story, design, and technology.">
                <p>
                  Proctor House Studio is a cross-disciplinary creative studio
                  developing original intellectual property and experience-driven products at the intersection of storytelling, technology, and design. From retrofuturistic
                  robotics like Tomy 2000, to speculative science fiction epics
                  like Lavegavon, to handcrafted life card experiences, we bring
                  expressive, emotionally resonant products to life across
                  mediums.
                </p>
                <br />
                <p>
                  Each project is conceived, art-directed, and built end-to-end, combining creative vision with systems thinking and production-level rigor. We imagine worlds, design their artifacts, and deliver
                  experiences that feel both personal and timeless. <strong> Our mission is to create artful, soulful products and experiences that{" "}
                  expand consciousness</strong>—in what we write, in what we surround ourselves by, and in the mind.
                </p>
              </StudioTextCard>

              <StudioSectionCTA title="Who’s at the studio?" />
              <StudioCardChain />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
