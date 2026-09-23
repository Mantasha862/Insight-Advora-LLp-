"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="flex min-h-[80vh] items-center bg-ivory">
      <div className="container-site py-24 text-center">
        <p className="eyebrow justify-center">500</p>
        <h1 className="h-page mt-6">
          Something <em className="font-normal italic text-charcoal">Went Wrong.</em>
        </h1>
        <span aria-hidden className="mx-auto mt-7 block h-px w-[62px] bg-gold" />
        <p className="body-copy mx-auto mt-8 max-w-[520px]">An unexpected error occurred. Please try again.</p>
        <div className="mt-10 flex justify-center gap-8">
          <button onClick={reset} className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-forest underline decoration-gold underline-offset-8">
            Try Again
          </button>
          <Link href="/" className="text-[12.5px] font-semibold uppercase tracking-[0.1em] text-forest underline decoration-gold underline-offset-8">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
