import Link from "next/link";

export const metadata = {
  title: "About | Kutub",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/" className="text-sm text-primary hover:underline">
        ← Back to books
      </Link>

      <h1 className="mt-6 font-serif text-4xl font-semibold">About Kutub</h1>

      <p className="mt-4 leading-relaxed">
        Kutub is a curated guide to programming books. It helps developers find
        the right book for their level, from beginner to advanced, and read
        honest reviews from other readers.
      </p>

      <p className="mt-4 leading-relaxed">
        Built with Next.js, TypeScript, and Strapi as a learning project.
      </p>
    </main>
  );
}
