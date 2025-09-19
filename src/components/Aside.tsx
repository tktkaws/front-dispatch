"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import MenuModal from "./MenuModal";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Aside() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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

  // ヘッダーの可視状態を監視し、見えなくなったらモバイルメニューを表示
  useEffect(() => {
    const header = document.getElementById("global-header");
    if (!header) {
      // ヘッダーが見つからない場合は常に表示
      setShowMobileMenu(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // ヘッダーが可視でないときに表示
        setShowMobileMenu(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    observer.observe(header);

    return () => observer.disconnect();
  }, []);


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
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              key="mobile-menu-button"
              className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 transform"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.2 }}
           >
              <button
                className="p-2 bg-[var(--background)] text-[var(--foreground)] border border-[var(--foreground)] shadow-md"
                onClick={openModal}
              >
                Menu
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        </aside>
      <AnimatePresence>
        {isModalOpen && <MenuModal onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
