// src/components/navigation/MainNav.tsx
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import type { NavItem } from "./navConfig";
import { navItems } from "./navConfig";

type MainNavProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function MainNav({ isOpen = true, onClose }: MainNavProps) {
  const navClassName = isOpen ? "nav-main" : "nav-main nav-main--closed";

  // Close the nav automatically once the user scrolls down a bit
  useEffect(() => {
    if (!onClose) return; // nothing to do if parent didn't pass a closer
    if (typeof window === "undefined") return;

    const SCROLL_THRESHOLD = 80; // px – tweak if you want

    const handleScroll = () => {
      if (!isOpen) return;
      if (window.scrollY > SCROLL_THRESHOLD) {
        onClose();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen, onClose]);

  return (
    <div className={navClassName}>
      <div className="nav-main__header">
        <button
          type="button"
          className="icon-button nav-main__icon-button"
          onClick={onClose}
        >
          <span className="icon-close" aria-hidden="true" />
          <span className="sr-only">Close navigation</span>
        </button>
      </div>

      <ul className="nav-main__list">
        {navItems.map((item: NavItem) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive
                  ? "nav-main__link nav-main__link--active"
                  : "nav-main__link"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="nav-main__footer">
        <div className="nav-main__image-strip">
          <img
            src="/images/nav/jpg/rock.jpeg"
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}