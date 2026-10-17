import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link
          href="/"
          className="font-serif text-3xl font-semibold text-primary"
        >
          Kutub
        </Link>
        <Link
          href="/about"
          className="text-base font-medium hover:text-primary"
        >
          About
        </Link>
      </nav>
    </header>
  );
}