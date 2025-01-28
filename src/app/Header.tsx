"use client"
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(isThemeSetToDark());

  useEffect(() => {
    if (isThemeSetToDark()) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <header className="max-w-prose mx-auto mb-8">
      <nav className="flex items-center justify-between">
        <Link className="flex flex-col no-underline" href="/">
          <span className="font-bold">Caio Henrique</span>
          Software Engineer
        </Link>
        <div className="items-center flex gap-4">
          {/* <button><Sun className="size-5" /></button> */}
          <Link href="/">Home</Link>
          <Link href="/projects">Projetos</Link>
          <Link href="/articles">Artigos</Link>
          <Link href="/about">Sobre mim</Link>
          <button onClick={toggleTheme}>
            {isDarkMode ? (
              <Moon className="size-5" />
            ) : (
              <Sun className="size-5" />
            )}
          </button>
        </div>
      </nav>
    </header>

  );
};

function isThemeSetToDark() {
  return localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
}

export default Header;