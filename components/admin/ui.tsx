"use client";

import { useActionState, useEffect, useState } from "react";
import type { AdminFormState } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export const initialAdminState: AdminFormState = { status: "idle" };

export function useAdminAction(action: (prev: AdminFormState, fd: FormData) => Promise<AdminFormState>) {
  return useActionState(action, initialAdminState);
}

export function Flash({ state }: { state: AdminFormState }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => setVisible(true), [state]);
  if (state.status === "idle" || !visible || !state.message) return null;
  return (
    <div
      role={state.status === "error" ? "alert" : "status"}
      className={cn(
        "flex items-center justify-between gap-4 border px-4 py-3 text-[13.5px]",
        state.status === "error" ? "border-danger/40 bg-danger/[0.06] text-danger" : "border-gold bg-gold/[0.08] text-forest",
      )}
    >
      {state.message}
      <button type="button" onClick={() => setVisible(false)} aria-label="Dismiss" className="text-[18px] leading-none opacity-60 hover:opacity-100">
        ×
      </button>
    </div>
  );
}

export function SubmitButton({ pending, children = "Save", className }: { pending: boolean; children?: React.ReactNode; className?: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-forest transition-colors hover:bg-forest hover:text-ivory disabled:cursor-wait disabled:opacity-60",
        className,
      )}
    >
      {pending ? "Saving…" : children}
    </button>
  );
}

export function ConfirmButton({ action, label, confirm, className }: { action: () => Promise<void>; label: string; confirm: string; className?: string }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirm)) e.preventDefault();
      }}
    >
      <button type="submit" className={cn("text-[12px] font-semibold uppercase tracking-[0.08em] text-danger hover:underline", className)}>
        {label}
      </button>
    </form>
  );
}
