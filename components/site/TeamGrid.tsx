"use client";

import { useState } from "react";
import type { TeamCategoryItem, TeamMemberItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TeamCard } from "@/components/site/Cards";

export function TeamGrid({ members, categories }: { members: TeamMemberItem[]; categories: TeamCategoryItem[] }) {
  const [active, setActive] = useState("all");
  const tabs = [{ slug: "all", name: "All" }, ...categories];
  const count = (slug: string) => (slug === "all" ? members.length : members.filter((m) => m.category === slug).length);
  const shown = active === "all" ? members : members.filter((m) => m.category === active);

  return (
    <>
      <div role="tablist" aria-label="Team categories" className="flex flex-wrap gap-2 border-b border-hairline pb-6">
        {tabs.map((t) => (
          <button
            key={t.slug}
            role="tab"
            aria-selected={active === t.slug}
            aria-controls="team-grid"
            onClick={() => setActive(t.slug)}
            className={cn(
              "border px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-colors",
              active === t.slug ? "border-forest bg-forest text-ivory" : "border-hairline-strong text-body-2 hover:border-gold hover:text-gold-ink",
            )}
          >
            {t.name} <span className={active === t.slug ? "text-gold-pale" : "text-gold-ink"}>({count(t.slug)})</span>
          </button>
        ))}
      </div>
      <div id="team-grid" role="tabpanel" className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((m) => (
          <TeamCard key={m.slug} member={m} />
        ))}
        {shown.length === 0 && <p className="body-copy">Profiles in this category will be added soon.</p>}
      </div>
    </>
  );
}
