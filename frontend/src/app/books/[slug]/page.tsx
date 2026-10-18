import Link from "next/link";
import { notFound } from "next/navigation";
import type { Book } from "@/components/BookCard";
import ReviewForm from "@/components/ReviewForm";
import StarRating from "@/components/StarRating";
import { getAverageRating } from "@/lib/ratings";

type Review = {
  id: number;
  reviewerName: string;
  rating: number;
  comment: string;
};

type BookDetails = Omit<Book, "reviews"> & {
  documentId: string;
  description: string;
  category: { name: string } | null;
  reviews: Review[];
};

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await fetch(
    `${process.env.STRAPI_URL}/api/books?filters[slug][$eq]=${slug}&populate=*`,
  );
  const json = await res.json();
  const book: BookDetails | undefined = json.data[0];

  if (!book) {
    notFound();
  }

  const reviewCount = book.reviews.length;
  const averageRating = getAverageRating(book.reviews);

  const coverPath = book.cover?.formats?.small?.url ?? book.cover?.url;
  const coverSrc = coverPath ? `${process.env.STRAPI_URL}${coverPath}` : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Back to books
      </Link>

      <div className="mt-6 grid gap-8 sm:grid-cols-[240px_1fr]">
        <div className="aspect-[3/4] overflow-hidden rounded-xl border border-border bg-primary/10">
          {coverSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverSrc}
              alt={book.cover?.alternativeText ?? book.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-4 text-center font-serif text-lg text-primary">
              {book.title}
            </div>
          )}
        </div>

        <div>
          <h1 className="font-serif text-3xl font-semibold">{book.title}</h1>
          <p className="mt-1 text-foreground/70">{book.author}</p>
          <div className="mt-3 flex items-center gap-2 text-sm">
            {reviewCount > 0 ? (
              <>
                <StarRating rating={averageRating} />
                <span className="font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-foreground/60">
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </>
            ) : (
              <span className="text-foreground/60">No reviews yet</span>
            )}
          </div>

          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
              {book.level}
            </span>
            {book.category && (
              <span className="rounded-full border border-border px-3 py-1 text-xs">
                {book.category.name}
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed">{book.description}</p>

          <section className="mt-10">
            <h2 className="font-serif text-2xl font-semibold">
              Reviews ({book.reviews.length})
            </h2>

            {book.reviews.length === 0 ? (
              <p className="mt-3 text-foreground/70">
                No reviews yet. Be the first to review this book.
              </p>
            ) : (
              <ul className="mt-4 space-y-4">
                {book.reviews.map((review) => (
                  <li
                    key={review.id}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{review.reviewerName}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <ReviewForm bookDocumentId={book.documentId} slug={slug} />
          </section>
        </div>
      </div>
    </main>
  );
}
