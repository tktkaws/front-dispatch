import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-8 w-full text-sm">
        <div className="mx-auto px-4 py-8">
          <div className="flex justify-end items-center space-x-4">
            <Link href="https://github.com/tktkaws" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src="/icons8-github.svg" alt="GitHub icon" width="24" height="24" />
            </Link>
            <p>&copy; FRONT DISPATCH. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}