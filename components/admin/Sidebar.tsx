"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Item = { href: string; label: string; adminOnly?: boolean };
const groups: { title: string; items: Item[] }[] = [
  { title: "Overview", items: [{ href: "/admin", label: "Dashboard" }] },
  {
    title: "Content",
    items: [
      { href: "/admin/articles", label: "Articles" },
      { href: "/admin/team", label: "Team" },
      { href: "/admin/services", label: "Services" },
      { href: "/admin/industries", label: "Industries" },
      { href: "/admin/resources", label: "Resources" },
    ],
  },
  {
    title: "Taxonomy",
    items: [
      { href: "/admin/categories", label: "Categories" },
      { href: "/admin/content-types", label: "Content Types" },
      { href: "/admin/authors", label: "Authors" },
      { href: "/admin/tags", label: "Tags" },
      { href: "/admin/team-categories", label: "Team Categories" },
    ],
  },
  {
    title: "Audience",
    items: [
      { href: "/admin/enquiries", label: "Enquiries", adminOnly: true },
      { href: "/admin/subscribers", label: "Subscribers", adminOnly: true },
    ],
  },
  {
    title: "Site",
    items: [
      { href: "/admin/media", label: "Media Library" },
      { href: "/admin/seo", label: "SEO Settings" },
      { href: "/admin/settings", label: "Website Settings", adminOnly: true },
      { href: "/admin/users", label: "Users", adminOnly: true },
    ],
  },
];

export function Sidebar({ role }: { role: "admin" | "editor" }) {
  const path = usePathname();
  const active = (href: string) => (href === "/admin" ? path === "/admin" : path === href || path.startsWith(`${href}/`));
  return (
    <nav aria-label="Admin" className="space-y-7">
      {groups.map((g) => {
        const items = g.items.filter((i) => !i.adminOnly || role === "admin");
        if (!items.length) return null;
        return (
          <div key={g.title}>
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light/80">{g.title}</p>
            <ul className="mt-2 space-y-px">
              {items.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    aria-current={active(i.href) ? "page" : undefined}
                    className={cn(
                      "block border-l-2 px-3 py-2 text-[13.5px] transition-colors",
                      active(i.href) ? "border-gold bg-ivory/[0.06] text-ivory" : "border-transparent text-ivory/70 hover:text-gold-pale",
                    )}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
