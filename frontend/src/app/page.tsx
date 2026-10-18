import BookCard, { type Book } from "@/components/BookCard";
import SearchFilters, { type Category } from "@/components/SearchFilters";
import { getAverageRating } from "@/lib/ratings";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  level?: string;
  category?: string;
  sort?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { q, level, category, sort } = await searchParams;

  const params = new URLSearchParams();
  params.set("populate", "*");
  if (q) {
    params.set("filters[$or][0][title][$containsi]", q);
    params.set("filters[$or][1][author][$containsi]", q);
  }
  if (level) params.set("filters[level][$eq]", level);
  if (category) params.set("filters[category][slug][$eq]", category);

  const strapiSort: Record<string, string> = {
    newest: "createdAt:desc",
    title: "title:asc",
  };
  params.set("sort", strapiSort[sort ?? ""] ?? "createdAt:desc");

  const [booksRes, categoriesRes] = await Promise.all([
    fetch(`${process.env.STRAPI_URL}/api/books?${params}`),
    fetch(`${process.env.STRAPI_URL}/api/categories?sort=name`),
  ]);
  const fetched: Book[] = (await booksRes.json()).data;
  const books =
    sort === "rating"
      ? [...fetched].sort(
          (a, b) => getAverageRating(b.reviews) - getAverageRating(a.reviews),
        )
      : fetched;
  const categories: Category[] = (await categoriesRes.json()).data;

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
            className="mt-8 inline-block rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground"
          >
            Browse books
          </a>
        </div>
      </section>

      <section id="books" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-12">
        <h2 className="font-serif text-2xl font-semibold">
          All books ({books.length})
        </h2>
        <SearchFilters
          categories={categories}
          q={q}
          level={level}
          category={category}
          sort={sort}
        />

        {books.length === 0 ? (
          <p className="mt-6 text-foreground/70">
            No books match your search. Try different filters.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
