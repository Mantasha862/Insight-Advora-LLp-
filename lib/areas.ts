/** Maps a service slug to the matching `leads.area_of_interest` value. */
export function serviceArea(slug: string): string {
  const map: Record<string, string> = {
    "strategy-advisory": "Strategy & Advisory",
    "operational-excellence": "Operational Excellence",
    "business-growth": "Business Growth",
    "mergers-acquisitions": "M&A / Transactions",
    ehs: "EHS",
    "esg-sustainability": "ESG & Sustainability",
  };
  return map[slug] ?? "Other";
}
