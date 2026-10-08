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
  // In the "All" view the last category (Associates) starts its own row, so it is not mixed into a partly filled advisory row.
  const lastSlug = categories.at(-1)?.slug;
  const groups =
    active === "all" && lastSlug && categories.length > 1
      ? [shown.filter((m) => m.category !== lastSlug), shown.filter((m) => m.category === lastSlug)].filter((g) => g.length > 0)
      : [shown];

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
      <div id="team-grid" role="tabpanel" className="mt-10 space-y-6">
        {groups.map((g, i) => (
          <div key={i} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {g.map((m) => (
              <TeamCard key={m.slug} member={m} />
            ))}
          </div>
        ))}
        {shown.length === 0 && <p className="body-copy">Profiles in this category will be added soon.</p>}
      </div>
    </>
  );
}
