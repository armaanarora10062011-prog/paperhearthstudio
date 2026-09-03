export type Prospect = {
  id: string;
  company: string;
  website: string;
  industry: string;
  location: string;
  size: string;
  description: string;
  contactName?: string;
  contactRole?: string;
  contactEmail?: string;
  observation: string;
  problem: string;
};

export const INDUSTRIES = [
  "SaaS / Software",
  "E-commerce / Retail",
  "Hospitality / Restaurants",
  "Professional Services",
  "Healthcare / Wellness",
  "Manufacturing",
  "Real Estate",
  "Education",
  "Logistics / Supply Chain",
  "Fintech / Finance",
];

export const LOCATIONS = [
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Chicago, IL",
  "Boston, MA",
  "Denver, CO",
  "Toronto, Canada",
  "London, UK",
  "Berlin, Germany",
];

export const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
];

export const PROSPECTS: Prospect[] = [
  {
    id: "p1",
    company: "Northwind Roasters",
    website: "northwindroasters.co",
    industry: "E-commerce / Retail",
    location: "Austin, TX",
    size: "11-50",
    description:
      "Specialty coffee roaster with a growing DTC subscription business and three flagship cafes.",
    contactName: "Marisol Tran",
    contactRole: "Head of Growth",
    contactEmail: "marisol@northwindroasters.co",
    observation:
      "Their site loads a single product page in ~3.8s on mobile and their subscription checkout drops ~28% of users between cart and payment.",
    problem:
      "Slow product pages and a leaky checkout are capping subscription growth, even with strong organic traffic from coffee enthusiasts.",
  },
  {
    id: "p2",
    company: "Helix Logistics",
    website: "helixlogistics.io",
    industry: "Logistics / Supply Chain",
    location: "Chicago, IL",
    size: "51-200",
    description:
      "Mid-market freight broker connecting regional shippers with carrier capacity across the Midwest.",
    contactName: "Devon Akande",
    contactRole: "VP of Operations",
    contactEmail: "devon@helixlogistics.io",
    observation:
      "Carrier onboarding is handled through email + PDFs, and their ops team manually reconciles invoices against TMS records twice a week.",
    problem:
      "Manual onboarding and invoice reconciliation are eating ~30% of ops capacity and creating margin leakage on every load.",
  },
  {
    id: "p3",
    company: "Lumen & Lark",
    website: "lumenlark.studio",
    industry: "Professional Services",
    location: "New York, NY",
    size: "11-50",
    description:
      "Independent branding and web design studio serving B2B SaaS founders in their first two years.",
    contactName: "Priya Subramanian",
    contactRole: "Founder & Creative Director",
    contactEmail: "priya@lumenlark.studio",
    observation:
      "Their inbound form converts at ~1.2% and they have no structured lead scoring, so warm leads sit in a shared inbox for 2-3 days.",
    problem:
      "Slow lead response and weak qualification mean studio principals spend hours on calls that rarely close.",
  },
  {
    id: "p4",
    company: "Verdant Health Co.",
    website: "verdanthealth.co",
    industry: "Healthcare / Wellness",
    location: "Denver, CO",
    size: "11-50",
    description:
      "Telehealth and at-home wellness provider focused on preventative care plans for working professionals.",
    contactName: "Dr. Owen Reyes",
    contactRole: "COO",
    contactEmail: "owen@verdanthealth.co",
    observation:
      "Patient onboarding takes 4+ steps and the activation rate within 7 days sits at 22%.",
    problem:
      "Friction-heavy onboarding is leaving paying patients inactive, which directly suppresses LTV and retention metrics.",
  },
  {
    id: "p5",
    company: "Atlas Forge Manufacturing",
    website: "atlasforge.com",
    industry: "Manufacturing",
    location: "Boston, MA",
    size: "201-500",
    description:
      "Precision metal parts supplier for aerospace and medical-device OEMs, with three regional plants.",
    contactName: "Hannah Brookman",
    contactRole: "Director of Sales Enablement",
    contactEmail: "hannah@atlasforge.com",
    observation:
      "Their RFP response process is manual and they lose deals to faster competitors despite stronger technical specs.",
    problem:
      "Slow, inconsistent RFP responses are costing them winnable deals in a procurement cycle that rewards speed.",
  },
  {
    id: "p6",
    company: "Quill Real Estate",
    website: "quillrealty.com",
    industry: "Real Estate",
    location: "Seattle, WA",
    size: "11-50",
    description:
      "Boutique residential brokerage specializing in first-time buyers across the greater Seattle metro.",
    contactName: "Marcus Velazquez",
    contactRole: "Managing Broker",
    contactEmail: "marcus@quillrealty.com",
    observation:
      "Lead-to-tour conversion is around 9% and agents are juggling leads across texts, email, and a legacy CRM.",
    problem:
      "Fragmented lead handling means high-intent buyers fall through the cracks and tours go under-booked.",
  },
  {
    id: "p7",
    company: "Sable Bay Hospitality",
    website: "sablebayhotels.com",
    industry: "Hospitality / Restaurants",
    location: "San Francisco, CA",
    size: "51-200",
    description:
      "Independent boutique hotel group with four properties on the West Coast and a small events team.",
    contactName: "Elena Park",
    contactRole: "Director of Marketing",
    contactEmail: "elena@sablebayhotels.com",
    observation:
      "Direct booking share is only ~18% of total bookings, with most traffic routed back through OTAs at 18-22% commission.",
    problem:
      "Low direct-booking share is quietly draining 5-7 points of margin off every reservation.",
  },
  {
    id: "p8",
    company: "Brightline Education",
    website: "brightlineedu.org",
    industry: "Education",
    location: "Toronto, Canada",
    size: "11-50",
    description:
      "Online learning platform for high-school students preparing for STEM competitions and university admissions.",
    contactName: "Rohan Mehta",
    contactRole: "Head of Product",
    contactEmail: "rohan@brightlineedu.org",
    observation:
      "Free-trial activation is strong (64%) but trial-to-paid conversion sits at ~7%, mostly because the trial content is too generic.",
    problem:
      "A non-personalized trial experience hides the product's actual value and leaves motivated students churning before they convert.",
  },
  {
    id: "p9",
    company: "Harborlight Capital",
    website: "harborlightcap.com",
    industry: "Fintech / Finance",
    location: "New York, NY",
    size: "51-200",
    description:
      "Boutique wealth-management firm serving founders and early retirees with $2M-$20M in liquid assets.",
    contactName: "Nora Whitfield",
    contactRole: "Head of Client Experience",
    contactEmail: "nora@harborlightcap.com",
    observation:
      "Onboarding for new clients takes an average of 19 days and requires four touchpoints across three teams.",
    problem:
      "Long, fragmented onboarding delays first investment, kills early enthusiasm, and pressures referral momentum.",
  },
  {
    id: "p10",
    company: "Latticework Software",
    website: "latticework.dev",
    industry: "SaaS / Software",
    location: "Berlin, Germany",
    size: "11-50",
    description:
      "Developer tool for designing and governing internal APIs, used by mid-sized engineering teams in Europe.",
    contactName: "Jonas Keller",
    contactRole: "Co-founder & CEO",
    contactEmail: "jonas@latticework.dev",
    observation:
      "Their docs site receives ~40% of product signups but the navigation funnels users to generic landing pages.",
    problem:
      "Docs-to-product handoff is leaking high-intent developer traffic, which is the most expensive audience to replace.",
  },
  {
    id: "p11",
    company: "Cedar & Stone Goods",
    website: "cedarandstone.shop",
    industry: "E-commerce / Retail",
    location: "Denver, CO",
    size: "1-10",
    description:
      "Handmade home goods brand selling direct to consumer through Shopify and two seasonal pop-ups.",
    contactName: "Imogen Hartley",
    contactRole: "Founder",
    contactEmail: "imogen@cedarandstone.shop",
    observation:
      "Email drives ~46% of revenue but flows are static; post-purchase upsell sits at only 3%.",
    problem:
      "Untapped email automation is leaving a significant share of revenue on the table, especially with first-time buyers.",
  },
  {
    id: "p12",
    company: "Nimbus Forecasting",
    website: "nimbusforecast.ai",
    industry: "SaaS / Software",
    location: "London, UK",
    size: "201-500",
    description:
      "AI-driven demand forecasting platform for grocery and CPG brands across the UK and EU.",
    contactName: "Olu Adetayo",
    contactRole: "VP of Customer Success",
    contactEmail: "olu@nimbusforecast.ai",
    observation:
      "Onboarding a new customer takes ~6 weeks; the first 30 days are heavy on engineering tickets.",
    problem:
      "Slow time-to-value is stretching payback periods and creating churn risk before customers see ROI.",
  },
];
