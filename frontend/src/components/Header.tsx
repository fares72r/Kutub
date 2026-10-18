import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link
          href="/"
          className="font-serif text-3xl font-semibold text-primary"
        >
          Kutub
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/about"
            className="text-base font-medium hover:text-primary"
          >
            About
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
