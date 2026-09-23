import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireUser } from "@/lib/auth";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="bg-forest text-ivory lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex items-center gap-3 border-b border-ivory/10 px-5 py-5">
          <Image src="/assets/monogram-alpha.png" alt="" width={582} height={471} className="h-9 w-auto" />
          <div>
            <p className="font-serif text-[17px] leading-none tracking-[0.08em]">INSIGHT ADVORA</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gold-light">Admin</p>
          </div>
        </div>
        <details className="group lg:hidden">
          <summary className="cursor-pointer list-none px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-gold-pale">Menu</summary>
          <div className="px-2 pb-5">
            <Sidebar role={user.role} />
          </div>
        </details>
        <div className="hidden px-2 py-6 lg:block">
          <Sidebar role={user.role} />
        </div>
      </aside>
      <div className="min-w-0">
        <header className="flex items-center justify-between gap-4 border-b border-hairline bg-ivory px-6 py-3">
          <Link href="/" target="_blank" className="text-[12px] text-body-2 hover:text-gold-ink">
            View website ↗
          </Link>
          <div className="flex items-center gap-4 text-[12.5px] text-body-2">
            <span>
              {user.name || user.email} · <span className="uppercase tracking-[0.08em] text-gold-ink">{user.role}</span>
            </span>
            <form action={logout}>
              <button className="font-semibold uppercase tracking-[0.08em] text-forest hover:text-gold-ink">Sign out</button>
            </form>
          </div>
        </header>
        <main id="main" className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
