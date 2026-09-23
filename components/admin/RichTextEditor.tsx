"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Tiptap editor producing clean semantic HTML, mirrored into a hidden input for form submission. */
export function RichTextEditor({ name, defaultValue, invalid }: { name: string; defaultValue: string; invalid?: boolean }) {
  const [html, setHtml] = useState(defaultValue);
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] }, link: false }),
      Link.configure({ openOnClick: false, autolink: true, protocols: ["mailto", "tel"] }),
      Image,
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: defaultValue,
    editorProps: { attributes: { class: "prose-article !max-w-none min-h-[360px] p-5 focus:outline-none" } },
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  const btn = (label: string, onClick: () => void, active = false, title?: string) => (
    <button
      type="button"
      title={title ?? label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn("min-w-8 border border-transparent px-2 py-1 text-[12px] font-semibold text-forest hover:border-hairline-strong", active && "border-gold bg-gold/15")}
    >
      {label}
    </button>
  );

  return (
    <div className={cn("border bg-white", invalid ? "border-danger" : "border-hairline-strong")}>
      <input type="hidden" name={name} value={html} />
      {editor && (
        <div className="sticky top-0 z-10 flex flex-wrap gap-1 border-b border-hairline bg-ivory-2 p-2">
          {btn("H2", () => editor.chain().focus().toggleHeading({ level: 2 }).run(), editor.isActive("heading", { level: 2 }))}
          {btn("H3", () => editor.chain().focus().toggleHeading({ level: 3 }).run(), editor.isActive("heading", { level: 3 }))}
          {btn("B", () => editor.chain().focus().toggleBold().run(), editor.isActive("bold"), "Bold")}
          {btn("I", () => editor.chain().focus().toggleItalic().run(), editor.isActive("italic"), "Italic")}
          {btn("• List", () => editor.chain().focus().toggleBulletList().run(), editor.isActive("bulletList"))}
          {btn("1. List", () => editor.chain().focus().toggleOrderedList().run(), editor.isActive("orderedList"))}
          {btn("Quote", () => editor.chain().focus().toggleBlockquote().run(), editor.isActive("blockquote"))}
          {btn("Link", () => {
            const prev = editor.getAttributes("link").href as string | undefined;
            const url = window.prompt("Link URL (leave empty to remove)", prev ?? "https://");
            if (url === null) return;
            if (!url) editor.chain().focus().unsetLink().run();
            else if (/^(https?:|mailto:|tel:|\/)/.test(url)) editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          }, editor.isActive("link"))}
          {btn("Image", () => {
            const src = window.prompt("Image URL (upload in Media Library first)");
            if (src && /^(https:|\/)/.test(src)) editor.chain().focus().setImage({ src, alt: window.prompt("Alt text") ?? "" }).run();
          })}
          {btn("Table", () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run())}
          {editor.isActive("table") && (
            <>
              {btn("+Row", () => editor.chain().focus().addRowAfter().run())}
              {btn("+Col", () => editor.chain().focus().addColumnAfter().run())}
              {btn("−Table", () => editor.chain().focus().deleteTable().run())}
            </>
          )}
          {btn("↶", () => editor.chain().focus().undo().run(), false, "Undo")}
          {btn("↷", () => editor.chain().focus().redo().run(), false, "Redo")}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
