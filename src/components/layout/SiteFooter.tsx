// src/components/layout/SiteFooter.tsx
import { NavLink } from "react-router-dom";
import type { FooterCta } from "../../content/footerCtas";

type SiteFooterProps = {
  /** Single CTA (preferred going forward) */
  cta?: FooterCta;

  /** Legacy / optional multi-CTA support */
  ctas?: FooterCta[];
};


const DEFAULT_CTA: FooterCta = {
  heading: "Explore our work",
  label: "Work with us →",
  to: "/contact",
};

const column1 = [
  { label: "Tomy 2000", to: "/tomy-2000" },
  { label: "The Book", to: "/book" },
  { label: "Life Cards", to: "/life-cards" },
];

export default function SiteFooter({ cta, ctas }: SiteFooterProps) {
  // ✅ Normalize CTA input so footer never breaks
  const resolvedCtas: FooterCta[] =
    ctas && ctas.length > 0
      ? ctas
      : cta
      ? [cta]
      : [DEFAULT_CTA];

  return (
    <footer className="site-footer">
      {/* ───────────────── CTA STRIP (TOP) ───────────────── */}
      <section className="site-footer__cta">
        <div className="site-footer__cta-inner">
          {resolvedCtas.map((ctaItem) => (
            <div key={ctaItem.heading} className="site-footer__cta-block">
              <p className="site-footer__cta-heading">
                {ctaItem.heading}
                <span aria-hidden="true"> →</span>
              </p>

              {/* Optional link if you want it back later */}
              {/* 
              <NavLink to={ctaItem.to} className="site-footer__cta-link">
                {ctaItem.label}
              </NavLink>
              */}
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────── ORANGE FOOTER (ALWAYS PRESENT) ───────────────── */}
      <section className="site-footer__main">
        <div className="site-footer__inner">
          {/* Brand column */}
          <div className="site-footer__brand">
            <p className="site-footer__brand-proctor">Proctor</p>
            <p className="site-footer__brand-house">House Studio</p>

            <div className="site-footer__brand-meta">
              <div className="site-footer__brand-social">
                <button
                  className="site-footer__icon-button"
                  aria-label="Instagram"
                >
                  <img
                    className="site-footer__icon"
                    src="/icons/instagram.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </button>

                <button
                  className="site-footer__icon-button"
                  aria-label="YouTube"
                >
                  <img
                    className="site-footer__icon"
                    src="/icons/youtube.svg"
                    alt=""
                    aria-hidden="true"
                  />
                </button>
              </div>

              <p className="site-footer__brand-location">Houston, TX</p>
            </div>
          </div>

          {/* Footer nav */}
          <nav
            className="site-footer__nav"
            aria-label="Footer navigation"
          >
            <div className="site-footer__nav-column">
              {column1.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="site-footer__nav-link"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </section>
    </footer>
  );
}