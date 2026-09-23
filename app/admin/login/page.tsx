import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { hasDb } from "@/lib/db";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");
  return (
    <main className="flex min-h-screen items-center justify-center bg-forest p-6">
      <div className="w-full max-w-[420px] border-t-2 border-gold bg-ivory p-10">
        <Image src="/assets/logo-h.png" alt="Insight Advora LLP" width={1275} height={220} className="h-12 w-auto" priority />
        <h1 className="mt-8 text-[30px]">Admin sign in</h1>
        <span aria-hidden className="mt-4 block h-px w-[62px] bg-gold" />
        {!hasDb && (
          <p className="mt-6 border border-danger/40 bg-danger/[0.06] p-4 text-[13px] text-danger">
            DATABASE_URL is not configured. See the README for setup.
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
