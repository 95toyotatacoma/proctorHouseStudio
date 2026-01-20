// src/components/navigation/NavRail.tsx
type NavRailProps = {
  isNavOpen?: boolean;
  onToggle?: () => void;
  classNameExtra?: string;
};

export default function NavRail({
  isNavOpen = false,
  onToggle,
  classNameExtra = "",
}: NavRailProps) {
  // ✅ Use a positive class name: open means open
  const railClassName = `nav-rail ${isNavOpen ? "is-open" : "is-closed"} ${classNameExtra}`.trim();

  return (
    <aside className={railClassName} aria-expanded={isNavOpen}>
      <button
        type="button"
        className="icon-button nav-rail__toggle"
        aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
      >
      <img
        src={isNavOpen ? "/icons/icon-btn-closeOut.svg" : "/icons/nav-rail-icon-btn.svg"}
        alt=""
        aria-hidden="true"
        className="nav-rail__icon"
      />
      </button>

      {/* ✅ Mobile/desktop brand row (CSS will decide how it looks) */}
      <div className="nav-rail__brand" aria-hidden="true">
        <span className="nav-rail__brand-proctor">Proctor</span>
        <span className="nav-rail__brand-house">House Studio</span>
      </div>

      {/* Keep avatar for desktop only (mobile CSS hides it) */}
      <div className="nav-rail__avatar" aria-hidden="true">
        <img src="/images/nav/jpg/rock.jpeg" alt="" aria-hidden="true" />
      </div>
    </aside>
  );
}