export type Book = {
  id: number;
  title: string;
  slug: string;
  author: string;
  level: "beginner" | "intermediate" | "advanced";
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="rounded-xl border border-border bg-white p-5">
      <h2 className="font-serif text-xl font-semibold">{book.title}</h2>
      <p className="mt-1 text-sm text-foreground/70">{book.author}</p>
      <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
        {book.level}
      </span>
    </article>
  );
}
