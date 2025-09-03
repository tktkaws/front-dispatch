import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--foreground)] mt-8 w-full font-mono text-sm text-[var(--foreground)] col-span-full">
        <div className="mx-auto px-4 py-8">
          <div className="flex justify-end items-center space-x-4">
            <Link href="https://github.com/tktkaws/front-dispatch" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Image
                src="/icons8-github.svg"
                alt="GitHub icon"
                width={24}
                height={24}
                className="dark:invert"
              />
            </Link>
            <p>&copy; Front Dispatch. <br className="sm:hidden" />All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}
