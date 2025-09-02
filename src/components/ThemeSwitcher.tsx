"use client";

import { useTheme } from "next-themes";

type ThemeSwitcherProps = {
  orientation?: "row" | "col";
  size?: "sm" | "md";
};

export default function ThemeSwitcher({ orientation = "row", size = "sm" }: ThemeSwitcherProps) {
  const { setTheme, theme, systemTheme } = useTheme();
  const stack = orientation === "row" ? "flex gap-8" : "grid gap-2";
  const textSize = size === "sm" ? "text-sm" : "text-base";
  const baseBtn = `font-mono ${textSize} underline-offset-4 hover:underline`;
  const isActive = (name: "light" | "dark" | "system") => theme === name ? " underline" : "";

  return (
    <div className={`${stack} my-2`}>
      <button onClick={() => setTheme("light")} className={baseBtn + isActive("light")}>Light</button>
      <button onClick={() => setTheme("dark")} className={baseBtn + isActive("dark")}>Dark</button>
      <button onClick={() => setTheme("system")} className={baseBtn + isActive("system")}>System</button>
      <p className="sr-only">theme: {theme} system: {String(systemTheme)}</p>
    </div>
  );
}
