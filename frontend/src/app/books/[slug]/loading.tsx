export default function Loading() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="h-5 w-32 animate-pulse rounded bg-border" />
      <div className="mt-6 grid gap-8 sm:grid-cols-[240px_1fr]">
        <div className="aspect-[3/4] animate-pulse rounded-xl bg-border" />
        <div className="space-y-3">
          <div className="h-9 w-3/4 animate-pulse rounded bg-border" />
          <div className="h-5 w-1/2 animate-pulse rounded bg-border" />
          <div className="h-5 w-40 animate-pulse rounded bg-border" />
          <div className="h-24 w-full animate-pulse rounded bg-border" />
        </div>
      </div>
    </main>
  );
}
