import Link from "next/link";
import BookCard, { type Book } from "@/components/BookCard";
import { getSavedSlugs, MAX_SAVED } from "@/lib/saved";

export const metadata = { title: "Saved books" };

export default async function SavedPage() {
  const slugs = await getSavedSlugs();
  let books: Book[] = [];

  if (slugs.length > 0) {
    const params = new URLSearchParams();
    params.set("populate", "*");
    params.set("pagination[limit]", String(MAX_SAVED));
    slugs.forEach((s, i) => params.set(`filters[slug][$in][${i}]`, s));

    const res = await fetch(`${process.env.STRAPI_URL}/api/books?${params}`);
    const fetched: Book[] = res.ok ? (await res.json()).data : [];

    books = slugs
      .map((s) => fetched.find((b) => b.slug === s))
      .filter((b): b is Book => Boolean(b));
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-serif text-4xl font-semibold">
        Saved books ({books.length})
      </h1>

      {books.length === 0 ? (
        <div className="mt-6">
          <p className="text-foreground/70">
            You have not saved any books yet.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground"
          >
            Browse books
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
