"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react";
import MenuModal from "./MenuModal";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Aside() {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingUp = latest < lastY;
    
    if (isScrollingUp && latest > 0) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
    setLastY(latest);
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setIsThemeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themeRef]);

  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <aside className="font-mono">
          <div className="hidden md:block md:fixed md:top-0 md:right-0 m-8" ref={themeRef}>
            <button onClick={() => setIsThemeOpen(!isThemeOpen)} className="p-2 bg-[var(--background)] text-[var(--foreground)] border border-[var(--foreground)] shadow-sm">Config</button>
            {isThemeOpen && (
              <div className="absolute right-0 mt-2 bg-[var(--background)] text-[var(--foreground)] border p-4 border-[var(--foreground)] shadow-sm">
                <p className="font-mono text-sm border-b">/ Theme</p>
                <ThemeSwitcher />
              </div>
            )}
          </div>
        <div className="md:hidden fixed bottom-0 right-0 m-8">
        <motion.button
          variants={variants}
          initial="hidden"
          animate={isHidden ? "hidden" : "visible"}
          transition={{ duration: 0.3 }}
          className="p-2 bg-[var(--background)] text-[var(--foreground)] border border-[var(--foreground)] shadow-md"
          onClick={openModal}
        >
          Menu
        </motion.button>
      </div>
        </aside>
      <AnimatePresence>
        {isModalOpen && <MenuModal onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
