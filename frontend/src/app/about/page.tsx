export const metadata = {
  title: "About",
  description: "What Kutub is and how it was built.",
};

const stack = [
  { name: "Next.js", role: "Frontend, routing and Server Actions" },
  { name: "TypeScript", role: "Type safety across the app" },
  { name: "Tailwind CSS", role: "Styling with a small design system" },
  { name: "Strapi 5", role: "Content management and REST API" },
  { name: "Zod", role: "Validation of submitted reviews" },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-serif text-4xl font-semibold">About Kutub</h1>

      <p className="mt-4 text-lg leading-relaxed text-foreground/80">
        Kutub is a curated guide to programming books. It helps developers find
        the right book for their level, from beginner to advanced, and read
        honest reviews from other readers.
      </p>

      <h2 className="mt-12 font-serif text-2xl font-semibold">How it works</h2>
      <ul className="mt-4 space-y-3 leading-relaxed">
        <li>
          Browse the collection, or filter by category and level, or search by
          title and author.
        </li>
        <li>Open a book to see its details and what readers think.</li>
        <li>
          Leave your own review. New reviews are checked before they appear on
          the site.
        </li>
      </ul>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Built with</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {stack.map((item) => (
          <li
            key={item.name}
            className="rounded-xl border border-border bg-surface p-4"
          >
            <p className="font-medium">{item.name}</p>
            <p className="mt-1 text-sm text-foreground/70">{item.role}</p>
          </li>
        ))}
      </ul>

      <p className="mt-12 text-foreground/70">
        The source code is available on{" "}
        <a
          href="https://github.com/fares72r/Kutub"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          GitHub
        </a>
        .
      </p>
    </main>
  );
}
