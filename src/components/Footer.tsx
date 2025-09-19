import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--foreground)] mt-8 w-full font-mono text-sm text-[var(--foreground)] col-span-full">
      <div className="mx-auto px-4 py-4 md:py-8">
        <div className="flex justify-end items-center space-x-2">
          <p>
            This site was developed by{" "}
            <Link
              href="https://github.com/tktkaws/front-dispatch"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHubリポジトリを開く"
              className="hover:underline"
            >
              ttt
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
