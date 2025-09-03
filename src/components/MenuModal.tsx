"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

type MenuModalProps = {
  onClose: () => void;
};

export default function MenuModal({ onClose }: MenuModalProps) {
  const pathname = usePathname();
  const isAboutPage = pathname.includes("/about");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[var(--background)] text-[var(--foreground)] border border-[var(--foreground)] p-4 w-[80%]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the modal
      >
        <div className="font-mono pt-4">
          <h1 className="text-2xl leading-none">
            <Link href="/" scroll={false}>
              [Front Dispatch]
            </Link>
          </h1>
          <nav>
            <ul className="mt-8 grid gap-y-4">
              <li>
                <Link
                  href="/"
                  scroll={false}
                  className={!isAboutPage ? "underline" : "hover:underline"}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={isAboutPage ? "underline" : "hover:underline"}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <p className="font-mono text-sm border-b mt-8">/ Theme</p>
          <ThemeSwitcher />
        </div>
        <button
          onClick={onClose}
          className="mt-8 border border-[var(--foreground)] p-2 leading-none h-fit w-fit"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
