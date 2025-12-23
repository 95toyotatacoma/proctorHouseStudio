// src/components/layout/Layout.tsx
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNav from "../navigation/MainNav";
import NavRail from "../navigation/NavRail";
import SiteFooter from "./SiteFooter";
import { DEFAULT_FOOTER_CTA, FOOTER_CTA_BY_ROUTE } from "../../content/footerCtas";

export default function Layout() {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const { pathname } = useLocation();

  // ✅ pick the longest matching prefix (most specific wins)
  const matchedCta =
    Object.entries(FOOTER_CTA_BY_ROUTE)
      .filter(([routePrefix]) => pathname.startsWith(routePrefix))
      .sort(([a], [b]) => b.length - a.length)[0]?.[1] ?? DEFAULT_FOOTER_CTA;

  return (
    <div className="nav-shell">
      <MainNav isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />

      <NavRail
        isOpen={!isNavOpen}
        onToggle={() => setIsNavOpen((prev) => !prev)}
      />

      <main className="section">
        <div className="section__inner">
          <Outlet />
        </div>
      </main>

      {/* ✅ singular prop */}
      <SiteFooter cta={matchedCta} />
    </div>
  );
}