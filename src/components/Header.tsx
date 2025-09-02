"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAboutPage = pathname.includes("/about");

  return (
    <header className="ml-4 md:ml-8 md:fixed md:top-0 md:w-[240px] xl:w-[320px] z-10 font-mono bg-[var(--background)] text-[var(--foreground)] py-8 md:py-8">
      <h1 className="text-2xl leading-none">
        <Link href="/" scroll={false}>
          [Front Dispatch]
        </Link>
      </h1>
      <nav>
        <ul className="mt-8 grid gap-y-4">
          <li>
            <Link href="/" scroll={false} className={!isAboutPage ? "underline" : "hover:underline"}>
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about" className={isAboutPage ? "underline" : "hover:underline"}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
