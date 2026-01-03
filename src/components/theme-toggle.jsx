"use client"

import { useState, useEffect } from "react" // 1. Import useEffect
import { MoonIcon, SunIcon } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

export default function ThemeToggle() {
  // Use a function to initialize state from localStorage or default to "light"
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark"; // Default to dark on server-side
  });

  // 2. Use useEffect to update the theme on the HTML element and save it
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === "dark") {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Save preference for persistence (optional but recommended)
    localStorage.setItem("theme", theme);

  }, [theme]); // Run this effect whenever the 'theme' state changes

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div>
      <Toggle
        variant="outline"
        className="group size-8 rounded-full border-none text-muted-foreground shadow-none data-[state=on]:bg-transparent data-[state=on]:text-muted-foreground data-[state=on]:hover:bg-muted data-[state=on]:hover:text-foreground"
        pressed={theme === "dark"}
        onPressedChange={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>

        {/* Note: Remove group-data-[state=on]: and rely purely on the 'dark' class applied to <html> */}
        <MoonIcon
          size={16}
          // The MoonIcon should show when the theme state is 'dark' (i.e., 'pressed' is true)
          className={`shrink-0 transition-all ${theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          aria-hidden="true" />

        <SunIcon
          size={16}
          // The SunIcon should show when the theme state is 'light' (i.e., 'pressed' is false)
          className={`absolute shrink-0 transition-all ${theme === "light" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          aria-hidden="true" />
      </Toggle>
    </div>
  );
}