"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isAboutPage = pathname.includes("/about");

  return (
    <header className="ml-4 md:ml-8 md:fixed md:top-0 md:w-[240px] xl:w-[320px] z-10  font-redhat bg-[#F9F9F9] pt-8 md:pt-8">
      <h1 className="text-4xl leading-none font-bold">
        <Link href="/">
          FRONT
          <br />
          DISPATCH
        </Link>
      </h1>
      <nav>
        <ul className="mt-8 grid gap-y-4">
          <li>
            <Link href="/" className={!isAboutPage ? "font-bold underline" : "hover:underline"}>
              BLOG
            </Link>
          </li>
          <li>
            <Link href="/about" className={isAboutPage ? "font-bold underline" : "hover:underline"}>
              ABOUT
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
