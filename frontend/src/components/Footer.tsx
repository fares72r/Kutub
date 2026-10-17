import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-serif font-semibold text-primary">Kutub</span> ·
          A curated guide to programming books.
        </p>
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-primary">
            Books
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <a
            href="https://github.com/fares72r/Kutub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
