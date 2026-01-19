// src/components/layout/Layout.tsx
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNav from "../navigation/MainNav";
import NavRail from "../navigation/NavRail";
import SiteFooter from "./SiteFooter";
import { DEFAULT_FOOTER_CTA, FOOTER_CTA_BY_ROUTE } from "../../content/footerCtas";

const NAV_DEMO_KEY = "phs_nav_demo_seen_v1";

type RailAnim = "" | "nav-rail--entering" | "nav-rail--exiting";

export default function Layout() {
  const { pathname } = useLocation();
  // ✅ Scroll to top on route change (SPA behavior)
useEffect(() => {
  if (typeof window === "undefined") return;

  // If you want instant jump:
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  // If you want smooth:
  // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}, [pathname]);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [railAnimClass, setRailAnimClass] = useState<RailAnim>("");

  const autoCloseTimerRef = useRef<number | null>(null);
  const railAnimTimerRef = useRef<number | null>(null);

  // ✅ pick the longest matching prefix (most specific wins)
  const matchedCta =
    Object.entries(FOOTER_CTA_BY_ROUTE)
      .filter(([routePrefix]) => pathname.startsWith(routePrefix))
      .sort(([a], [b]) => b.length - a.length)[0]?.[1] ?? DEFAULT_FOOTER_CTA;

  const clearAutoCloseTimer = () => {
    if (autoCloseTimerRef.current) {
      window.clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  };

  const clearRailAnimTimer = () => {
    if (railAnimTimerRef.current) {
      window.clearTimeout(railAnimTimerRef.current);
      railAnimTimerRef.current = null;
    }
  };

  const persistDemoSeen = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(NAV_DEMO_KEY, "1");
    }
  };

  const cancelDemoTimerAndPersist = () => {
    persistDemoSeen();
    clearAutoCloseTimer();
  };

  const triggerRailAnim = (nextNavOpen: boolean) => {
    // nextNavOpen=true: panel opening, rail exits
    // nextNavOpen=false: panel closing, rail enters
    clearRailAnimTimer();
    setRailAnimClass(nextNavOpen ? "nav-rail--exiting" : "nav-rail--entering");

    railAnimTimerRef.current = window.setTimeout(() => {
      setRailAnimClass("");
      railAnimTimerRef.current = null;
    }, 560); // slightly longer than your 520ms rail animation
  };

  // ✅ DEMO: on first-ever visit, open nav and auto-collapse after 6s (only once)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenDemo = window.localStorage.getItem(NAV_DEMO_KEY) === "1";

    if (hasSeenDemo) {
      setIsNavOpen(false);
      return;
    }

    // First-time visitor: open nav (demo)
    setIsNavOpen(true);
    triggerRailAnim(true);

    autoCloseTimerRef.current = window.setTimeout(() => {
      setIsNavOpen(false);
      triggerRailAnim(false);
      persistDemoSeen();
      autoCloseTimerRef.current = null;
    }, 6000);

    return () => {
      clearAutoCloseTimer();
      clearRailAnimTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeNav = () => {
    setIsNavOpen(false);
    triggerRailAnim(false);
    cancelDemoTimerAndPersist();
  };

  const toggleNav = () => {
    setIsNavOpen((prev) => {
      const next = !prev;
      triggerRailAnim(next);
      return next;
    });
    cancelDemoTimerAndPersist();
  };

  const shellClass = `nav-shell ${isNavOpen ? "nav-shell--open" : "nav-shell--closed"}`;

  return (
    <div className={shellClass}>
      <MainNav isOpen={isNavOpen} onClose={closeNav} />

      <NavRail
        isNavOpen={isNavOpen}
        onToggle={toggleNav}
        classNameExtra={railAnimClass}
      />

      <main className="section">
        <div className="section__inner">
          <Outlet />
        </div>
      </main>

      <SiteFooter cta={matchedCta} />
    </div>
  );
}