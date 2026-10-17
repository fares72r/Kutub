import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-primary"
        >
          Kutub
        </Link>
        <Link href="/about" className="text-sm hover:text-primary">
          About
        </Link>
      </nav>
    </header>
  );
}
