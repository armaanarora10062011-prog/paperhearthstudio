// Central place for editable studio configuration.
// Update this single value to change the contact address used across the site.
export const CONTACT_EMAIL = "team@paperhearth.studio";

export function mailto(subject?: string) {
  const base = `mailto:${CONTACT_EMAIL}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

export const SOCIALS = {
  linkedin: "",
  instagram: "",
};

export const NAV_ITEMS = [
  { id: "what-we-are", index: "01", label: "WHAT WE ARE" },
  { id: "services", index: "02", label: "WHAT WE BUILD" },
  { id: "process", index: "03", label: "PROCESS" },
  { id: "pricing", index: "04", label: "PRICING" },
  { id: "about", index: "05", label: "ABOUT" },
] as const;
