"use client";

import { submitWithoutReset } from "@/lib/forms";
import { useRef, useState } from "react";
import { createUser, saveSettings, savePageSeo, updateUser, uploadMedia, type AdminFormState } from "@/app/admin/actions";
import { Flash, SubmitButton, useAdminAction } from "@/components/admin/ui";

const input = "field !py-2.5 !text-[14px]";

function F({ label, name, error, children, help }: { label: string; name: string; error?: string; children: React.ReactNode; help?: string }) {
  return (
    <div>
      <label htmlFor={name} className="field-label !mb-1.5">{label}</label>
      {children}
      {help && <p className="mt-1 text-[12px] text-body-2">{help}</p>}
      {error && <p className="mt-1 text-[12.5px] text-danger">{error}</p>}
    </div>
  );
}

export type SettingsValues = Record<string, string | number | boolean | null>;

export function SettingsForm({ values }: { values: SettingsValues }) {
  const [state, action, pending] = useAdminAction(saveSettings);
  const fe = state.fieldErrors ?? {};
  const v = (k: string) => (values[k] == null ? "" : String(values[k]));
  const text = (k: string, label: string, help?: string, area = false) => (
    <F label={label} name={k} error={fe[k]} help={help}>
      {area ? <textarea id={k} name={k} defaultValue={v(k)} rows={3} className={input} /> : <input id={k} name={k} defaultValue={v(k)} className={input} />}
    </F>
  );
  return (
    <form onSubmit={submitWithoutReset(action)} className="max-w-[860px] space-y-8">
      <Flash state={state} />
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-[22px] text-forest">Firm</legend>
        {text("firmName", "Firm name")}
        {text("tagline", "Tagline")}
        {text("logo", "Logo URL", "Optional override; defaults to /assets/logo-h.png")}
        {text("copyrightYear", "Copyright year")}
        <div className="sm:col-span-2">{text("footerText", "Footer text", undefined, true)}</div>
      </fieldset>
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-[22px] text-forest">Contact</legend>
        {text("email", "Email")}
        {text("phone", "Phone")}
        <div className="sm:col-span-2">{text("address", "Address", undefined, true)}</div>
        {text("officeHours", "Office hours")}
        {text("linkedin", "LinkedIn URL")}
        <div className="sm:col-span-2">{text("mapEmbedUrl", "Google Maps embed URL", "Google Maps → Share → Embed a map → copy the src URL.")}</div>
      </fieldset>
      <fieldset className="grid gap-5 sm:grid-cols-2">
        <legend className="mb-4 font-serif text-[22px] text-forest">Analytics & features</legend>
        {text("gaId", "Google Analytics 4 ID", "Loaded only when set.")}
        {text("gtmId", "Google Tag Manager ID", "Loaded only when set.")}
        <label className="flex items-center gap-3 text-[14px] text-forest">
          <input type="checkbox" name="careersActive" defaultChecked={Boolean(values.careersActive)} className="h-4 w-4 accent-[#B58A3A]" />
          Show &ldquo;Build the Future With Us&rdquo; careers section
        </label>
      </fieldset>
      <SubmitButton pending={pending}>Save settings</SubmitButton>
    </form>
  );
}

export function SeoForm({ paths, initial }: { paths: string[]; initial?: { path: string; title?: string | null; description?: string | null; ogImage?: string | null; canonical?: string | null } }) {
  const [state, action, pending] = useAdminAction(savePageSeo);
  return (
    <form onSubmit={submitWithoutReset(action)} className="space-y-4 border border-hairline bg-ivory-2 p-5">
      <Flash state={state} />
      <F label="Page path" name="path">
        <input id="path" name="path" list="seo-paths" defaultValue={initial?.path ?? ""} placeholder="/services" className={input} required />
        <datalist id="seo-paths">{paths.map((p) => <option key={p} value={p} />)}</datalist>
      </F>
      <F label="Title" name="title"><input id="title" name="title" maxLength={160} defaultValue={initial?.title ?? ""} className={input} /></F>
      <F label="Description" name="description"><textarea id="description" name="description" maxLength={320} rows={3} defaultValue={initial?.description ?? ""} className={input} /></F>
      <F label="OG image URL" name="ogImage"><input id="ogImage" name="ogImage" defaultValue={initial?.ogImage ?? ""} className={input} /></F>
      <F label="Canonical URL" name="canonical" help="Defaults to https://www.insightadvora.com + path."><input id="canonical" name="canonical" defaultValue={initial?.canonical ?? ""} className={input} /></F>
      <SubmitButton pending={pending}>Save SEO</SubmitButton>
    </form>
  );
}

export function UploadForm() {
  const [state, action, pending] = useAdminAction(async (p: AdminFormState, fd: FormData) => {
    const r = await uploadMedia(p, fd);
    if (r.status === "success") formRef.current?.reset();
    return r;
  });
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form ref={formRef} onSubmit={submitWithoutReset(action)} className="flex flex-wrap items-end gap-4 border border-hairline bg-ivory-2 p-5">
      <div className="w-full"><Flash state={state} /></div>
      <F label="File (≤10 MB)" name="file"><input id="file" name="file" type="file" required accept="image/*,application/pdf" className="text-[13px]" /></F>
      <F label="Bucket" name="bucket">
        <select id="bucket" name="bucket" className={`${input} !w-40`}>
          {["general", "team", "services", "knowledge"].map((b) => <option key={b}>{b}</option>)}
        </select>
      </F>
      <F label="Alt text" name="alt"><input id="alt" name="alt" className={`${input} !w-64`} /></F>
      <SubmitButton pending={pending}>Upload</SubmitButton>
    </form>
  );
}

export function CopyUrl({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-gold-ink hover:underline"
    >
      {done ? "Copied" : "Copy URL"}
    </button>
  );
}

export function NewUserForm() {
  const [state, action, pending] = useAdminAction(createUser);
  return (
    <form onSubmit={submitWithoutReset(action)} className="grid gap-4 border border-hairline bg-ivory-2 p-5 sm:grid-cols-2">
      <div className="sm:col-span-2"><Flash state={state} /></div>
      <F label="Email" name="nu-email"><input id="nu-email" name="email" type="email" required className={input} /></F>
      <F label="Name" name="nu-name"><input id="nu-name" name="name" className={input} /></F>
      <F label="Role" name="nu-role">
        <select id="nu-role" name="role" className={input}><option value="editor">Editor</option><option value="admin">Admin</option></select>
      </F>
      <F label="Temporary password" name="nu-password" help="At least 12 characters."><input id="nu-password" name="password" type="password" minLength={12} required autoComplete="new-password" className={input} /></F>
      <div><SubmitButton pending={pending}>Create user</SubmitButton></div>
    </form>
  );
}

export function EditUserForm({ id, role, active }: { id: string; role: string; active: boolean }) {
  const [state, action, pending] = useAdminAction(updateUser.bind(null, id));
  return (
    <form onSubmit={submitWithoutReset(action)} className="flex flex-wrap items-center gap-3">
      <select name="role" defaultValue={role} className={`${input} !w-28 !py-1.5`} aria-label="Role"><option value="editor">Editor</option><option value="admin">Admin</option></select>
      <label className="flex items-center gap-2 text-[13px]"><input type="checkbox" name="active" defaultChecked={active} className="accent-[#B58A3A]" /> Active</label>
      <input name="password" type="password" placeholder="New password (optional)" autoComplete="new-password" className={`${input} !w-56 !py-1.5`} />
      <SubmitButton pending={pending} className="!py-1.5">Update</SubmitButton>
      {state.status !== "idle" && <span className={state.status === "error" ? "text-[12px] text-danger" : "text-[12px] text-gold-ink"}>{state.message}</span>}
    </form>
  );
}
