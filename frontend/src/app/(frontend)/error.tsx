"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import { useEffect } from "react";

// Route-level error UI. Never renders error.message / stack to visitors;
// only the opaque digest is shown so it can be matched to server logs.
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="border-b border-saffron-100 bg-gradient-to-br from-saffron-50 via-cream to-sewablue-50">
      <div className="container-page py-16 text-center md:py-24">
        <h1 lang="hi" className="text-3xl font-bold leading-snug tracking-tight text-ink md:text-4xl">
          कुछ गड़बड़ हो गई
        </h1>
        <p className="mt-2 text-base text-ink-soft">Something went wrong</p>
        <p lang="hi" className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
          कृपया कुछ समय बाद पुनः प्रयास करें। · Please try again in a moment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={() => retry()}
            lang="hi"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-saffron-400 to-saffron-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-saffron-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-saffron-500/35 active:translate-y-0"
          >
            पुनः प्रयास करें · Try again
          </button>
          <Link
            href="/"
            lang="hi"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-sewablue-500 bg-white px-7 py-3.5 text-base font-semibold text-sewablue-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-sewablue-500 hover:text-white hover:shadow-lg hover:shadow-sewablue-500/25 active:translate-y-0"
          >
            होम पेज · Home
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-ink-soft/70">Ref: {error.digest}</p>
        )}
      </div>
    </section>
  );
}
