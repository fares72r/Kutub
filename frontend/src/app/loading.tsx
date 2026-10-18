function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="aspect-[2/3] animate-pulse bg-border" />
      <div className="space-y-2 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-border" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-border" />
        <div className="h-6 w-20 animate-pulse rounded-full bg-border" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="h-12 w-full max-w-2xl animate-pulse rounded-lg bg-border" />
          <div className="mt-4 h-6 w-full max-w-xl animate-pulse rounded bg-border" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="h-8 w-48 animate-pulse rounded bg-border" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
