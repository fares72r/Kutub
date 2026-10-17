import BookCard, { type Book } from "@/components/BookCard";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/books?populate=*`);
  const json = await res.json();
  const books: Book[] = json.data;

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h1 className="max-w-2xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
            Find the right programming book for your level.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-foreground/70">
            A curated collection of books for developers, from first steps to
            advanced systems, with honest reviews from other readers.
          </p>
          <a
            href="#books"
            className="mt-8 inline-block rounded-lg bg-primary px-5 py-2.5 font-medium text-white"
          >
            Browse books
          </a>
        </div>
      </section>

      <section id="books" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-serif text-2xl font-semibold">
          All books ({books.length})
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>
    </main>
  );
}
