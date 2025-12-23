// src/pages/Home.tsx
import { useEffect, useState } from "react";
import IntroLogo from "../components/brand/IntroLogo";
import CarouselRail from "../components/media/CarouselRail";
import StudioTextCard from "../components/studio/StudioTextCard";
import StudioSectionCTA from "../components/studio/StudioSectionCTA";
import StudioCardChain from "../components/studio/StudioCardChain";
import HomeProjectsNav from "../components/navigation/HomeProjectsNav";

export default function Home() {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 220; // px – when hero starts to collapse
      setIsCompact(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shellClass = isCompact
    ? "home-shell home-shell--compact"
    : "home-shell";

  return (
    <main className={shellClass}>
      {/* ───────── SECTION 1: HERO ONLY (beige bg + right rail) ───────── */}
      <section className="home-hero-section">
        <div className="home-inner">
          <section className="home-shell__frame">
            <section className="home-hero">
              <div className="home-hero__inner">
                <IntroLogo />
              </div>
            </section>

            <aside className="home-rail-wrapper">
              <CarouselRail folderKey="home" />
            </aside>
          </section>
        </div>
      </section>

      {/* ───────── SECTION 2: INLINE LOGO + PROJECT NAV + BROWN CONTENT ───────── */}
      <section className="home-divider-group">
        <div className="home-inner">

          {/* sticky inline logo STRIP */}
          <div className={`home-inline-logo ${isCompact ? "shadow-active" : ""}`}>
            <div className="home-inline-logo__row">
              <div className="home-inline-logo__avatar">
                <img
                  src="/images/home/logo/2023-arizona.jpg"
                  alt=""
                  aria-hidden="true"
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

          {/* circular project nav row */}
          <div className="home-projects-nav-wrapper">
            <HomeProjectsNav />
          </div>

          {/* brown content area */}
          <section className="home-content-section">
            <div className="home-content-inner stack-jumbo">
              <StudioTextCard title="Where funky storytelling meets craft.">
                <p>
Proctor House Studio is a cross-disciplinary creative studio developing original intellectual property at the intersection of storytelling, technology, and design. From retrofuturistic robotics like Tomy 2000, to speculative science fiction epics like Lavegavon, to handcrafted life card experiences, we bring expressive, emotionally resonant products to life across mediums.
</p>
<br />
<p>
We imagine worlds, design their artifacts, and deliver experiences that feel both personal and timeless. Our mission is to create artful, soulful products that <strong>expand consciousness</strong>—on the page, in the home, and in the imagination.
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
