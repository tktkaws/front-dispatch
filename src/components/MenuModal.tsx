"use client";

import { motion } from "motion/react";
import Link from "next/link";

type MenuModalProps = {
  onClose: () => void;
};

export default function MenuModal({ onClose }: MenuModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#F9F9F9] p-4 w-[80%]"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the modal
      >
        <div className="font-redhat pt-8">
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
                <Link href="/" className="font-bold">
                  BLOG
                </Link>
              </li>
              <li>
                <Link href="/about" className="">
                  ABOUT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          <p className="font-mono text-sm border-b mt-8">/ Theme</p>
          <div className="flex gap-8 my-4">
            <button className="font-mono text-sm">LIGHT</button>
            <button className="font-mono text-sm">DARK</button>
            <button className="font-mono text-sm">SYSTEM</button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 p-2   bg-[#E8E8E8] text-[#1E1E1E]"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
}
