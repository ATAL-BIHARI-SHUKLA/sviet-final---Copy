export const ABOUT_DROPDOWN_ITEMS = [
  { label: "Overview", href: "/about" },
  { label: "Accreditations & Approvals", href: "/about/accreditations" },
  { label: "Awards, Rankings & Ratings", href: "/about/awards-recognitions" },
  { label: "Leadership", href: "/about/leadership" },
] as const;

export type AboutDropdownItem = (typeof ABOUT_DROPDOWN_ITEMS)[number];
