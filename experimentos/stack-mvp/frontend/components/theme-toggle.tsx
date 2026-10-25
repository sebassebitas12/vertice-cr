"use client";
import { useEffect } from "react";
export default function ThemeToggle() {
  useEffect(() => {
    const saved = localStorage.getItem("vertice-theme");
    if (saved === "light" || saved === "dark") document.documentElement.dataset.theme = saved;
  }, []);
  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const nextTheme = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem("vertice-theme", nextTheme);
  }
  return <button className="mode-toggle" type="button" onClick={toggleTheme} aria-label="Cambiar entre tema oscuro y claro" title="Cambiar tema" />;
}
