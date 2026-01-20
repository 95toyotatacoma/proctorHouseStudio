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
  // When the main nav is OPEN, the rail should be hidden/offscreen
  const railClassName = `nav-rail ${
    isNavOpen ? "nav-rail--closed" : ""
  } ${classNameExtra}`.trim();

  return (
    <aside
      className={railClassName}
      onClick={() => {
        // If the main nav is CLOSED, clicking the rail should OPEN it
        if (!isNavOpen) onToggle?.();
      }}
      aria-expanded={isNavOpen}
    >
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
          src="/icons/nav-rail-icon-btn.svg"
          alt=""
          aria-hidden="true"
          className="nav-rail__icon"
        />
      </button>

      <div className="nav-rail__avatar">
        <img src="/images/nav/jpg/rock.jpeg" alt="" aria-hidden="true" />
      </div>
    </aside>
  );
}