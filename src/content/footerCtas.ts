export type FooterCta = {
  heading: string;
  label?: string;
  to?: string;
};

export const DEFAULT_FOOTER_CTA: FooterCta = {
  heading: "Explore our work",
  label: "Work with us →",
  to: "/contact",
};

export const FOOTER_CTA_BY_ROUTE: Record<string, FooterCta> = {
  "/tomy-2000": {
    heading: "Follow Tomy’s rebuild",
    label: "See the roadmap →",
    to: "/tomy-2000",
  },
  "/book": {
    heading: "Step into Lavegavon",
    label: "Read the lore →",
    to: "/book",
  },
  "/life-cards": {
    heading: "Discover the Life Cards",
    label: "Explore the deck →",
    to: "/life-cards",
  },
};