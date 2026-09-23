import Link from "next/link";
import { Header } from "@/components/site/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex min-h-[70vh] items-center bg-ivory">
        <div className="container-site py-24 text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="h-page mt-6">
            Page <em className="font-normal italic text-charcoal">Not Found.</em>
          </h1>
          <span aria-hidden className="mx-auto mt-7 block h-px w-[62px] bg-gold" />
          <p className="body-copy mx-auto mt-8 max-w-[520px]">The page you are looking for may have moved or no longer exists.</p>
          <Link href="/" className="mt-10 inline-flex items-center gap-3 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-forest underline decoration-gold underline-offset-8 hover:text-gold-ink">
            Return Home <span aria-hidden className="h-px w-[18px] bg-current" />
          </Link>
        </div>
      </main>
    </>
  );
}
