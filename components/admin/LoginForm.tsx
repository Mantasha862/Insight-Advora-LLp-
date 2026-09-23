"use client";

import { submitWithoutReset } from "@/lib/forms";
import { login } from "@/app/admin/actions";
import { Flash, SubmitButton, useAdminAction } from "@/components/admin/ui";

export function LoginForm() {
  const [state, action, pending] = useAdminAction(login);
  return (
    <form onSubmit={submitWithoutReset(action)} className="mt-8 space-y-5">
      <Flash state={state} />
      <div>
        <label htmlFor="email" className="field-label">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required className="field" />
      </div>
      <div>
        <label htmlFor="password" className="field-label">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
      </div>
      <SubmitButton pending={pending} className="w-full justify-center py-3.5">
        Sign in
      </SubmitButton>
    </form>
  );
}
