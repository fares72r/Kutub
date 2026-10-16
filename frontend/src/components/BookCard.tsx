export type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  level: "beginner" | "intermediate" | "advanced";
  cover: {
    url: string;
    alternativeText: string | null;
    formats?: { small?: { url: string } };
  } | null;
};

export default function BookCard({ book }: { book: Book }) {
  const coverPath = book.cover?.formats?.small?.url ?? book.cover?.url;
  const coverSrc = coverPath ? `${process.env.STRAPI_URL}${coverPath}` : null;

  return (
    <article className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="aspect-[3/4] bg-primary/10">
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

      <div className="p-5">
        <h2 className="font-serif text-xl font-semibold">{book.title}</h2>
        <p className="mt-1 text-sm text-foreground/70">{book.author}</p>
        <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
          {book.level}
        </span>
      </div>
    </article>
  );
}
