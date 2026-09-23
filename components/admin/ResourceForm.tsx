"use client";

import { submitWithoutReset } from "@/lib/forms";
import Link from "next/link";
import { useActionState } from "react";
import type { AdminFormState } from "@/app/admin/actions";
import { Flash, initialAdminState, SubmitButton } from "@/components/admin/ui";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { STATUSES, type Field, type ResourceDef } from "@/lib/admin/resources";
import { cn } from "@/lib/utils";

type Row = Record<string, unknown> | null;
type Options = Record<string, { id: string; label: string }[]>;

function toText(f: Field, v: unknown): string {
  if (v == null) return "";
  if (f.type === "list" && Array.isArray(v)) return v.join("\n");
  if (f.type === "faq" && Array.isArray(v)) return (v as { q: string; a: string }[]).map((x) => `${x.q}\n${x.a}`).join("\n\n");
  if (f.type === "date") return new Date(v as string).toISOString().slice(0, 10);
  return String(v);
}

export function ResourceForm({
  def,
  row,
  options,
  action,
  saved,
}: {
  def: ResourceDef;
  row: Row;
  options: Options;
  action: (prev: AdminFormState, fd: FormData) => Promise<AdminFormState>;
  saved?: boolean;
}) {
  const [state, formAction, pending] = useActionState<AdminFormState, FormData>(action, saved ? { status: "success", message: "Saved." } : initialAdminState);
  const fe = state.fieldErrors ?? {};
  const main = def.fields.filter((f) => !f.side);
  const side = def.fields.filter((f) => f.side);

  const render = (f: Field) => {
    const v = row?.[f.name];
    const id = `f-${f.name}`;
    const err = fe[f.name];
    const cls = cn("field !py-2.5 !text-[14px]", err && "!border-danger");
    let input: React.ReactNode;
    switch (f.type) {
      case "textarea":
        input = <textarea id={id} name={f.name} defaultValue={toText(f, v)} rows={f.name === "bio" || f.name === "context" ? 8 : 4} maxLength={f.max} className={cls} />;
        break;
      case "list":
      case "faq":
        input = <textarea id={id} name={f.name} defaultValue={toText(f, v)} rows={f.type === "faq" ? 10 : 6} className={cn(cls, "font-mono !text-[13px]")} />;
        break;
      case "richtext":
        input = <RichTextEditor name={f.name} defaultValue={toText(f, v)} invalid={!!err} />;
        break;
      case "number":
        input = <input id={id} name={f.name} type="number" defaultValue={toText(f, v) || "0"} className={cls} />;
        break;
      case "date":
        input = <input id={id} name={f.name} type="date" defaultValue={toText(f, v)} className={cls} />;
        break;
      case "boolean":
        return (
          <label key={f.name} className="flex items-center gap-3 text-[13.5px] text-forest">
            <input type="checkbox" name={f.name} defaultChecked={Boolean(v)} className="h-4 w-4 accent-[#B58A3A]" />
            {f.label}
          </label>
        );
      case "select":
        input = (
          <select id={id} name={f.name} defaultValue={toText(f, v)} className={cls}>
            {f.options?.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        );
        break;
      case "relation":
        input = (
          <select id={id} name={f.name} defaultValue={toText(f, v)} className={cls}>
            <option value="">— None —</option>
            {(options[f.source ?? ""] ?? []).map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        );
        break;
      case "m2m": {
        const selected = new Set(Array.isArray(v) ? (v as string[]) : []);
        const opts = options[f.source ?? ""] ?? [];
        input = (
          <fieldset className="max-h-48 space-y-1.5 overflow-y-auto border border-hairline-strong bg-white p-3">
            <legend className="sr-only">{f.label}</legend>
            {opts.length === 0 && <p className="text-[12px] text-body-2">No options yet.</p>}
            {opts.map((o) => (
              <label key={o.id} className="flex items-center gap-2 text-[13px]">
                <input type="checkbox" name={f.name} value={o.id} defaultChecked={selected.has(o.id)} className="accent-[#B58A3A]" />
                {o.label}
              </label>
            ))}
          </fieldset>
        );
        break;
      }
      case "image":
        input = (
          <div className="space-y-2">
            <input id={id} name={f.name} defaultValue={toText(f, v)} placeholder="https://…" className={cls} />
            {typeof v === "string" && /\.(png|jpe?g|webp|gif|svg)(\?|$)/i.test(v) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={v} alt="" className="h-24 w-auto border border-hairline object-cover" />
            )}
            <Link href="/admin/media" target="_blank" className="text-[12px] text-gold-ink underline">
              Open media library ↗
            </Link>
          </div>
        );
        break;
      default:
        input = <input id={id} name={f.name} defaultValue={toText(f, v)} maxLength={f.max} className={cls} />;
    }
    return (
      <div key={f.name}>
        {f.type !== "m2m" ? (
          <label htmlFor={id} className="field-label !mb-1.5">
            {f.label}
            {f.required && <span className="text-gold-ink"> *</span>}
          </label>
        ) : (
          <p className="field-label !mb-1.5">{f.label}</p>
        )}
        {input}
        {f.help && <p className="mt-1 text-[12px] text-body-2">{f.help}</p>}
        {err && <p className="mt-1 text-[12.5px] text-danger">{err}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={submitWithoutReset(formAction)} className="grid gap-8 xl:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Flash state={state} />
        {main.map(render)}
      </div>
      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className="space-y-4 border border-hairline bg-ivory-2 p-5">
          {def.hasStatus && (
            <div>
              <label htmlFor="f-status" className="field-label !mb-1.5">Status</label>
              <select id="f-status" name="status" defaultValue={String(row?.status ?? "draft")} className="field !py-2.5 !text-[14px]">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s[0].toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <SubmitButton pending={pending} className="w-full justify-center" />
        </div>
        <div className="space-y-5 border border-hairline p-5">{side.map(render)}</div>
      </aside>
    </form>
  );
}
