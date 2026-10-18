export default function RatingBreakdown({
  reviews,
}: {
  reviews: { rating: number }[];
}) {
  const total = reviews.length;

  return (
    <div className="mt-4 space-y-2" aria-label="Rating distribution">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = reviews.filter((r) => r.rating === star).length;
        const percent = total > 0 ? (count / total) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-3 text-sm">
            <span className="w-14 text-foreground/70">
              {star} {star === 1 ? "star" : "stars"}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-amber-500"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-6 text-right text-foreground/70">{count}</span>
          </div>
        );
      })}
    </div>
  );
}
