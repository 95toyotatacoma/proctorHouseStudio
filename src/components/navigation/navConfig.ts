// src/components/navigation/navConfig.ts

export type NavItem = {
  label: string;
  to: string;
};

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  //{ label: "Our Work", to: "/our-work" },
  { label: "Tomy 2000", to: "/projects/tomy-2000" },
  { label: "The Book", to: "/projects/the-book" },
  { label: "Life Cards", to: "/projects/life-cards" }
  //,
  // { label: "Our Lore", to: "/our-lore" },
  // { label: "The Shop", to: "/shop" },
];
