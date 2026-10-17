export default function Loading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="h-10 w-40 animate-pulse rounded-lg bg-border" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="aspect-[3/4] animate-pulse rounded-xl bg-border"
          />
        ))}
      </div>
    </main>
  );
}
