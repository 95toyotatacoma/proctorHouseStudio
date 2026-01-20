// src/components/layout/Layout.tsx
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNav from "../navigation/MainNav";
import NavRail from "../navigation/NavRail";
import SiteFooter from "./SiteFooter";
import { DEFAULT_FOOTER_CTA, FOOTER_CTA_BY_ROUTE } from "../../content/footerCtas";

const NAV_DEMO_KEY = "phs_nav_demo_seen_v1";
const isMobile = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(max-width: 719px)").matches;

type RailAnim = "" | "nav-rail--entering" | "nav-rail--exiting";

export type LayoutOutletContext = {
  isNavOpen: boolean;
  railAnimClass: RailAnim;
  log: (msg: string, data?: any) => void;
};

export default function Layout() {
  const { pathname } = useLocation();
  const t0 = useRef<number>(typeof performance !== "undefined" ? performance.now() : 0);
  const log = (msg: string, data?: any) => {
    const dt =
      (typeof performance !== "undefined" ? performance.now() : 0) - t0.current;
    // eslint-disable-next-line no-console
    console.log(`[nav ${dt.toFixed(0)}ms] ${msg}`, data ?? "");
  };
  // ✅ Scroll to top on route change (SPA behavior)
useEffect(() => {
  if (typeof window === "undefined") return;

  // If you want instant jump:
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  // If you want smooth:
  // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  log("route change", { pathname });
}, [pathname]);

  // ✅ Decide initial state BEFORE first paint to avoid flicker
  const [isNavOpen, setIsNavOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false; // SSR safety
    const hasSeenDemo = window.localStorage.getItem(NAV_DEMO_KEY) === "1";
    return !hasSeenDemo; // first-time: open; returning: closed
  });
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
  if (isMobile()) return; // ✅ no rail enter/exit animation on mobile

  clearRailAnimTimer();
  setRailAnimClass(nextNavOpen ? "nav-rail--exiting" : "nav-rail--entering");
  log("rail anim", { nextNavOpen });

  railAnimTimerRef.current = window.setTimeout(() => {
    setRailAnimClass("");
    railAnimTimerRef.current = null;
    log("rail anim reset");
  }, 560);
};

  // ✅ Run demo timer ONLY for first-time visitors (no “open then close” for returning)
 useEffect(() => {
  if (typeof window === "undefined") return;

  if (isMobile()) {
    // ✅ mobile: skip demo auto-open/close behavior
    persistDemoSeen(); // optional: treat mobile as "seen" so it never runs later
    log("demo skipped on mobile");
    return;
  }

  const hasSeenDemo = window.localStorage.getItem(NAV_DEMO_KEY) === "1";
  log("demo: hasSeenDemo?", hasSeenDemo);

  if (hasSeenDemo) {
    log("demo already seen");
    return;
  }

  log("demo: opening nav");
  triggerRailAnim(true);

  log("demo: scheduling auto-close 6000ms");
  autoCloseTimerRef.current = window.setTimeout(() => {
    log("demo: auto-close firing");
    setIsNavOpen(false);
    triggerRailAnim(false);
    persistDemoSeen();
    autoCloseTimerRef.current = null;
    log("demo auto-close");
  }, 6000);

  return () => {
    clearAutoCloseTimer();
    clearRailAnimTimer();
    log("demo cleanup");
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const closeNav = () => {
    log("closeNav()");
    setIsNavOpen(false);
    triggerRailAnim(false);
    cancelDemoTimerAndPersist();
    log("close nav");
  };

  const toggleNav = () => {
    log("toggleNav()");
    setIsNavOpen((prev) => {
      const next = !prev;
      triggerRailAnim(next);
      log("toggle nav", { prev, next });
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
      classNameExtra={isMobile() ? "" : railAnimClass}
    />

      <main className="section">
        <div className="section__inner">
          <Outlet context={{ isNavOpen, railAnimClass, log }} />
        </div>
      </main>

      <SiteFooter cta={matchedCta} />
    </div>
  );
}
