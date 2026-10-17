export default function StarRating({ rating }: { rating: number }) {
  const rounded = Math.round(rating);

  return (
    <span
      className="inline-flex text-amber-500"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rounded ? "" : "text-border"}>
          ★
        </span>
      ))}
    </span>
  );
}
