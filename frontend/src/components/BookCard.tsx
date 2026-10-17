import Link from "next/link";
import StarRating from "@/components/StarRating";

export type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  level: "beginner" | "intermediate" | "advanced";
  category: { name: string } | null;
  reviews: { rating: number }[];
  cover: {
    url: string;
    alternativeText: string | null;
    formats?: { small?: { url: string } };
  } | null;
};

const levelStyles = {
  beginner: "bg-emerald-50 text-emerald-800",
  intermediate: "bg-amber-50 text-amber-800",
  advanced: "bg-rose-50 text-rose-800",
};

export default function BookCard({ book }: { book: Book }) {
  const coverPath = book.cover?.formats?.small?.url ?? book.cover?.url;
  const coverSrc = coverPath ? `${process.env.STRAPI_URL}${coverPath}` : null;
  const reviewCount = book.reviews.length;
  const averageRating =
    reviewCount > 0
      ? book.reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;
  return (
    <Link
      href={`/books/${book.slug}`}
      className="block overflow-hidden rounded-xl border border-border bg-white transition hover:border-primary"
    >
      <div className="aspect-[2/3] bg-primary/10">
        {coverSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverSrc}
            alt={book.cover?.alternativeText ?? book.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className={`flex h-full flex-col justify-between p-5 ${levelStyles[book.level]}`}
          >
            <span className="text-xs font-medium uppercase tracking-wide opacity-70">
              {book.category?.name}
            </span>
            <span className="font-serif text-2xl font-semibold leading-tight">
              {book.title}
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="font-serif text-xl font-semibold">{book.title}</h2>
        <p className="mt-1 text-sm text-foreground/70">{book.author}</p>
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          {reviewCount > 0 ? (
            <>
              <StarRating rating={averageRating} />
              <span className="font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-foreground/60">({reviewCount})</span>
            </>
          ) : (
            <span className="text-foreground/50">No reviews yet</span>
          )}
        </div>
        <span
          className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${levelStyles[book.level]}`}
        >
          {book.level}
        </span>
      </div>
    </Link>
  );
}
