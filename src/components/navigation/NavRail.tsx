// src/components/navigation/NavRail.tsx
type NavRailProps = {
  isOpen?: boolean;
  onToggle?: () => void;
};

export default function NavRail({ isOpen = false, onToggle }: NavRailProps) {
  const railClassName = `nav-rail ${isOpen ? "is-open" : "nav-rail--closed"}`;

  return (
    <aside
      className={railClassName}
      onClick={() => {
        console.log("NavRail clicked:", { isOpen, hasOnToggle: !!onToggle });
        if (!isOpen) onToggle?.();
      }}
      aria-expanded={isOpen}
    >
      <button
        type="button"
        className="icon-button nav-rail__toggle"
        aria-label="Open navigation"
        onClick={(e) => {
          e.stopPropagation();
          console.log("Burger clicked:", { isOpen, hasOnToggle: !!onToggle });
          onToggle?.();
        }}
      >
        <img
          src="/icons/icon-btn-hamburger.svg"
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