export type BioBlock =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; items: string[] };

/**
 * Team bios are plain text so they stay editable in the admin panel. The first paragraph is the
 * lead (shown beside the photo and on cards). After it: "## Title" starts a section, "- item"
 * lines make a bullet list, and any other paragraph is body text.
 */
export function parseBio(bio?: string | null): { lead: string; blocks: BioBlock[] } {
  const parts = (bio ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const lead = parts.shift() ?? "";
  const blocks: BioBlock[] = parts.map((p) => {
    if (p.startsWith("## ")) return { kind: "heading", text: p.slice(3).trim() };
    if (p.split("\n").every((l) => l.trim().startsWith("- "))) return { kind: "list", items: p.split("\n").map((l) => l.trim().slice(2).trim()) };
    return { kind: "paragraph", text: p };
  });
  return { lead, blocks };
}
