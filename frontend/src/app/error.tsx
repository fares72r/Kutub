"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  function handleRetry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-serif text-2xl font-semibold">
        Something went wrong
      </h1>
      <p className="mt-2 text-foreground/70">
        We could not load this page. Please try again.
      </p>
      <button
        onClick={handleRetry}
        className="mt-6 rounded-lg bg-primary px-4 py-2 font-medium text-white"
      >
        Try again
      </button>
    </main>
  );
}
