"use client";

import { submitWithoutReset } from "@/lib/forms";
import type { AdminFormState } from "@/app/admin/actions";
import { Flash, SubmitButton, useAdminAction } from "@/components/admin/ui";

export function LeadForm({ action, status, notes }: { action: (p: AdminFormState, fd: FormData) => Promise<AdminFormState>; status: string; notes: string }) {
  const [state, formAction, pending] = useAdminAction(action);
  return (
    <form onSubmit={submitWithoutReset(formAction)} className="space-y-4 border border-hairline bg-ivory-2 p-5">
      <Flash state={state} />
      <div>
        <label htmlFor="status" className="field-label">Status</label>
        <select id="status" name="status" defaultValue={status} className="field !py-2.5">
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="in_progress">In progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div>
        <label htmlFor="internal_notes" className="field-label">Internal notes</label>
        <textarea id="internal_notes" name="internal_notes" defaultValue={notes} rows={8} maxLength={10000} className="field" />
      </div>
      <SubmitButton pending={pending} />
    </form>
  );
}
