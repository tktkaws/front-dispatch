"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react"
import { useState, useRef, useEffect } from "react";
import MenuModal from "./MenuModal";

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
      <aside className="">
          <div className="hidden md:block md:fixed md:top-0 md:right-0 m-8" ref={themeRef}>
            <button onClick={() => setIsThemeOpen(!isThemeOpen)} className="p-2  bg-[#1E1E1E] text-[#E8E8E8] shadow-md">CONFIG</button>
            {isThemeOpen && (
              <div className="absolute right-0 mt-2 bg-[#1E1E1E] text-[#E8E8E8]  p-4 shadow-md">
                <p className="text-sm border-b">/ THEME</p>
                <div className="flex gap-8 my-4">
                  <button className="text-sm">LIGHT</button>
                  <button className="text-sm">DARK</button>
                  <button className="text-sm">SYSTEM</button>
                </div>
              </div>
            )}
          </div>
        <div className="md:hidden fixed bottom-0 right-0 m-8">
        <motion.button
          variants={variants}
          initial="hidden"
          animate={isHidden ? "hidden" : "visible"}
          transition={{ duration: 0.3 }}
          className="p-2 bg-[#1E1E1E] text-[#E8E8E8] shadow-md"
          onClick={openModal}
        >
          MENU
        </motion.button>
      </div>
        </aside>
      <AnimatePresence>
        {isModalOpen && <MenuModal onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}