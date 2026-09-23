"use client";

import { submitWithoutReset } from "@/lib/forms";
import { useActionState, useState } from "react";
import { requestResource, submitEnquiry, subscribe, type FormState } from "@/app/actions";
import { areasOfInterest } from "@/content/site";
import { cn } from "@/lib/utils";

const initial: FormState = { status: "idle" };

function Spinner() {
  return <span aria-hidden className="h-4 w-4 animate-spin rounded-full border border-current border-t-transparent" />;
}

function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Field({
  label,
  name,
  error,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="text-gold-ink"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-[13px] text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

const submitCls =
  "inline-flex items-center justify-center gap-3 border border-forest bg-forest px-8 py-[18px] text-[12px] font-semibold uppercase tracking-[0.1em] text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-forest disabled:cursor-wait disabled:opacity-70";

export function ContactForm({ defaultArea, fallbackEmail }: { defaultArea?: string; fallbackEmail?: string | null }) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const [len, setLen] = useState(0);
  const fe = state.fieldErrors ?? {};
  const area = areasOfInterest.includes(defaultArea as (typeof areasOfInterest)[number]) ? defaultArea : "";

  if (state.status === "success")
    return (
      <div role="status" className="border border-gold bg-gold/[0.08] p-10">
        <p className="eyebrow">Enquiry Received</p>
        <p className="mt-5 font-serif text-[30px] leading-tight text-forest">Thank you — your enquiry has been received.</p>
        <p className="body-copy mt-4">A member of our team will be in touch.</p>
      </div>
    );

  return (
    <form onSubmit={submitWithoutReset(action)} noValidate className="relative grid gap-6 sm:grid-cols-2" aria-describedby={state.status === "error" ? "form-error" : undefined}>
      <Honeypot />
      <input type="hidden" name="page_url" value="/contact" />
      <Field label="Name" name="name" required error={fe.name}>
        <input id="name" name="name" required minLength={2} maxLength={120} autoComplete="name" className="field" aria-invalid={!!fe.name} aria-describedby={fe.name ? "name-error" : undefined} />
      </Field>
      <Field label="Company" name="company">
        <input id="company" name="company" maxLength={160} autoComplete="organization" className="field" />
      </Field>
      <Field label="Designation" name="designation">
        <input id="designation" name="designation" maxLength={120} autoComplete="organization-title" className="field" />
      </Field>
      <Field label="Email" name="email" required error={fe.email}>
        <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" className="field" aria-invalid={!!fe.email} aria-describedby={fe.email ? "email-error" : undefined} />
      </Field>
      <Field label="Phone" name="phone" error={fe.phone}>
        <input id="phone" name="phone" type="tel" maxLength={32} autoComplete="tel" className="field" />
      </Field>
      <Field label="Area of Interest" name="area_of_interest">
        <select id="area_of_interest" name="area_of_interest" defaultValue={area || "Other"} className="field appearance-none bg-[length:10px] bg-[right_16px_center] bg-no-repeat" style={{ backgroundImage: "linear-gradient(45deg,transparent 50%,#B58A3A 50%),linear-gradient(135deg,#B58A3A 50%,transparent 50%)", backgroundSize: "5px 5px, 5px 5px", backgroundPosition: "calc(100% - 20px) 50%, calc(100% - 15px) 50%" }}>
          {areasOfInterest.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-2">
        <Field label="Message" name="message" error={fe.message}>
          <textarea id="message" name="message" rows={6} maxLength={4000} className="field resize-y" onChange={(e) => setLen(e.target.value.length)} />
        </Field>
        <p className="mt-2 text-right text-[12px] text-body-2">{len} / 4000</p>
      </div>
      {state.status === "error" && (
        <div id="form-error" role="alert" className="border border-danger/40 bg-danger/[0.06] p-5 text-[14px] text-danger sm:col-span-2">
          {state.message} {fallbackEmail && !/^\s*\[/.test(fallbackEmail) ? <>You can also email us at <a className="underline" href={`mailto:${fallbackEmail}`}>{fallbackEmail}</a>.</> : "Please try again later."}
        </div>
      )}
      <div className="sm:col-span-2">
        <button type="submit" disabled={pending} className={submitCls}>
          {pending ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            <>
              Send Enquiry <span aria-hidden className="h-px w-4 bg-current" />
            </>
          )}
        </button>
        <p className="mt-4 text-[12.5px] text-body-2">
          By submitting, you agree to our <a href="/privacy-policy" className="underline underline-offset-4">Privacy Policy</a>.
        </p>
      </div>
    </form>
  );
}

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribe, initial);
  if (state.status === "success")
    return (
      <p role="status" className="border border-gold-light/60 p-6 font-serif text-[22px] text-gold-pale">
        Thank you for subscribing.
      </p>
    );
  return (
    <form onSubmit={submitWithoutReset(action)} noValidate className="relative flex flex-col gap-4 sm:flex-row">
      <Honeypot />
      <label htmlFor="nl-email" className="sr-only">
        Email address
      </label>
      <input
        id="nl-email"
        name="email"
        type="email"
        required
        placeholder="Your email address"
        autoComplete="email"
        className="flex-1 border border-ivory/25 bg-transparent px-5 py-4 text-[15px] text-ivory placeholder:text-ivory/50 focus:border-gold-light focus:outline-none"
      />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-3 border border-gold-light bg-gold-light px-8 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-forest transition-all hover:bg-transparent hover:text-gold-pale disabled:opacity-70"
      >
        {pending ? <Spinner /> : "Subscribe"}
      </button>
      {state.status === "error" && (
        <p role="alert" className="text-[13px] text-gold-pale sm:absolute sm:-bottom-7">
          {state.message}
        </p>
      )}
    </form>
  );
}

export function ResourceRequest({ slug, title, onClose }: { slug: string; title: string; onClose: () => void }) {
  const [state, action, pending] = useActionState(requestResource, initial);
  const fe = state.fieldErrors ?? {};
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="rr-title" className="fixed inset-0 z-[70] flex items-end justify-center bg-forest/60 p-4 sm:items-center" onClick={onClose}>
      <div className="w-full max-w-[520px] bg-ivory p-8 md:p-10" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">Request Resource</p>
            <h2 id="rr-title" className="mt-4 text-[28px] leading-tight">{title}</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="text-[26px] leading-none text-body-2 hover:text-forest">
            ×
          </button>
        </div>
        {state.status === "success" ? (
          <div role="status" className="mt-8 border border-gold bg-gold/[0.08] p-6">
            <p className="font-serif text-[22px] text-forest">Thank you — your request has been received.</p>
            {state.fileUrl ? (
              <a href={state.fileUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[12.5px] font-semibold uppercase tracking-[0.1em] text-gold-ink underline underline-offset-8">
                Download
              </a>
            ) : (
              <p className="card-copy mt-3">We will share this resource with you by email.</p>
            )}
          </div>
        ) : (
          <form onSubmit={submitWithoutReset(action)} noValidate className="relative mt-8 grid gap-5">
            <Honeypot />
            <input type="hidden" name="resource" value={slug} />
            <Field label="Name" name="rr-name" required error={fe.name}>
              <input id="rr-name" name="name" required className="field" autoComplete="name" />
            </Field>
            <Field label="Email" name="rr-email" required error={fe.email}>
              <input id="rr-email" name="email" type="email" required className="field" autoComplete="email" />
            </Field>
            <Field label="Company" name="rr-company">
              <input id="rr-company" name="company" className="field" autoComplete="organization" />
            </Field>
            {state.status === "error" && (
              <p role="alert" className={cn("text-[13px] text-danger")}>
                {state.message}
              </p>
            )}
            <button type="submit" disabled={pending} className={submitCls}>
              {pending ? <Spinner /> : <>Request Access <span aria-hidden className="h-px w-4 bg-current" /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
