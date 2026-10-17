import Link from "next/link";

export type Category = { id: number; name: string; slug: string };

const fieldClass = "rounded-lg border border-border bg-white px-3 py-2 text-sm";

export default function SearchFilters({
  categories,
  q,
  level,
  category,
}: {
  categories: Category[];
  q?: string;
  level?: string;
  category?: string;
}) {
  const hasFilters = Boolean(q || level || category);

  return (
    <form
      action="/#books"
      method="get"
      className="mt-6 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="search"
        name="q"
        defaultValue={q}
        placeholder="Search by title or author"
        aria-label="Search books"
        className={`${fieldClass} sm:flex-1`}
      />

      <select
        name="category"
        defaultValue={category ?? ""}
        aria-label="Category"
        className={fieldClass}
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        name="level"
        defaultValue={level ?? ""}
        aria-label="Level"
        className={fieldClass}
      >
        <option value="">All levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white"
      >
        Search
      </button>

      {hasFilters && (
        <Link
          href="/#books"
          className="self-center text-sm text-primary hover:underline"
        >
          Clear
        </Link>
      )}
    </form>
  );
}
