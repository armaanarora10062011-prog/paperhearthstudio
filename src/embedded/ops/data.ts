export type Period = {
  label: string;
  start: string;
  end: string;
  comparedTo: string;
};

export type MetricCard = {
  label: string;
  value: string;
  unit?: string;
  delta: number;
  sub?: string;
};

export type PageRow = {
  path: string;
  views: number;
  delta: number;
};

export type SourceRow = {
  source: string;
  share: number; // 0-100
  change: number;
};

export type DailyPoint = {
  day: string;
  visits: number;
  leads: number;
};

export const period: Period = {
  label: "March 2026",
  start: "Mar 1, 2026",
  end: "Mar 31, 2026",
  comparedTo: "Feb 2026",
};

export const metrics: MetricCard[] = [
  {
    label: "Website Visits",
    value: "48,217",
    delta: 12.4,
    sub: "vs. 42,892 last month",
  },
  {
    label: "Leads",
    value: "1,184",
    delta: 18.7,
    sub: "vs. 997 last month",
  },
  {
    label: "Conversion Rate",
    value: "2.46",
    unit: "%",
    delta: 0.31,
    sub: "+0.31 pts vs. last month",
  },
  {
    label: "Avg. Session",
    value: "2:41",
    delta: -4.2,
    sub: "vs. 2:48 last month",
  },
];

// 30 days of visits/leads, Mar 1 - Mar 31
export const daily: DailyPoint[] = [
  { day: "1", visits: 1240, leads: 22 },
  { day: "2", visits: 1380, leads: 28 },
  { day: "3", visits: 1510, leads: 31 },
  { day: "4", visits: 1460, leads: 27 },
  { day: "5", visits: 1620, leads: 34 },
  { day: "6", visits: 1390, leads: 24 },
  { day: "7", visits: 1110, leads: 18 },
  { day: "8", visits: 1480, leads: 30 },
  { day: "9", visits: 1650, leads: 36 },
  { day: "10", visits: 1720, leads: 39 },
  { day: "11", visits: 1680, leads: 37 },
  { day: "12", visits: 1810, leads: 44 },
  { day: "13", visits: 1740, leads: 41 },
  { day: "14", visits: 1290, leads: 22 },
  { day: "15", visits: 1560, leads: 33 },
  { day: "16", visits: 1880, leads: 47 },
  { day: "17", visits: 1940, leads: 51 },
  { day: "18", visits: 2010, leads: 56 },
  { day: "19", visits: 1870, leads: 48 },
  { day: "20", visits: 1750, leads: 42 },
  { day: "21", visits: 1320, leads: 24 },
  { day: "22", visits: 1610, leads: 36 },
  { day: "23", visits: 1920, leads: 49 },
  { day: "24", visits: 2050, leads: 58 },
  { day: "25", visits: 2110, leads: 62 },
  { day: "26", visits: 1980, leads: 54 },
  { day: "27", visits: 1830, leads: 47 },
  { day: "28", visits: 1690, leads: 41 },
  { day: "29", visits: 1450, leads: 32 },
  { day: "30", visits: 1620, leads: 38 },
  { day: "31", visits: 1780, leads: 45 },
];

export const topPages: PageRow[] = [
  { path: "/services/brand-identity", views: 6840, delta: 22.1 },
  { path: "/work/harbor-co", views: 5210, delta: 14.8 },
  { path: "/journal/design-systems-2026", views: 4380, delta: 31.5 },
  { path: "/services/web-design", views: 3960, delta: 8.2 },
  { path: "/about", views: 3120, delta: -2.4 },
  { path: "/contact", views: 2780, delta: 11.7 },
];

export const trafficSources: SourceRow[] = [
  { source: "Organic Search", share: 42.1, change: 6.3 },
  { source: "Direct", share: 24.8, change: 1.2 },
  { source: "Referral", share: 14.6, change: 18.4 },
  { source: "Social", share: 11.2, change: -3.1 },
  { source: "Email", share: 5.4, change: 9.7 },
  { source: "Paid", share: 1.9, change: -1.5 },
];

export const client = {
  name: "Northline Studio",
  contact: "Eliza Whitmore",
  email: "northline@example.com",
};

export const previousPeriod = {
  visits: 42892,
  leads: 997,
  conversion: 2.15,
  session: "2:48",
};
