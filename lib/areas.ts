/** Maps a service slug to the matching `leads.area_of_interest` value. */
export function serviceArea(slug: string): string {
  const map: Record<string, string> = {
    "operational-excellence": "Operational Excellence",
    "business-growth-transformation": "Business Growth",
    "ma-corporate-transactions": "M&A / Transactions",
    "ehs-advisory": "EHS",
    "esg-sustainability": "ESG & Sustainability",
    "strategy-corporate-advisory": "Strategy & Advisory",
  };
  return map[slug] ?? "Other";
}
