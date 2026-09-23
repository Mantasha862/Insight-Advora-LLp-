import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { getCurrentUser } from "@/lib/auth";
import { adminSetupProblems } from "@/lib/admin/health";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");
  const problems = await adminSetupProblems();
  return (
    <main className="flex min-h-screen items-center justify-center bg-forest p-6">
      <div className="w-full max-w-[420px] border-t-2 border-gold bg-ivory p-10">
        <Image src="/assets/logo-h.png" alt="Insight Advora LLP" width={1275} height={220} className="h-12 w-auto" priority />
        <h1 className="mt-8 text-[30px]">Admin sign in</h1>
        <span aria-hidden className="mt-4 block h-px w-[62px] bg-gold" />
        {problems.length > 0 && (
          <div role="alert" className="mt-6 border border-danger/40 bg-danger/[0.06] p-4 text-[13px] leading-relaxed text-danger">
            <p className="font-semibold">The admin panel is not ready yet:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
