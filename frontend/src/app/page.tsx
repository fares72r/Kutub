import BookCard, { type Book } from "@/components/BookCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/books?populate=*`);
  const json = await res.json();
  const books: Book[] = json.data;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-serif text-4xl font-semibold">Kutub</h1>
      <p className="mt-2 text-foreground/70">
        A curated guide to programming books.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </main>
  );
}
