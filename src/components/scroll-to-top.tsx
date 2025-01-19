"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      className="fixed z-10 right-8 bottom-8 p-2 bg-zinc-50 dark:bg-zinc-900 ring-zinc-950 dark:ring-zinc-300 ring-1"
      onClick={() => {
        window.scrollTo({
          top: 0,
        });
      }}
    >
      <ArrowUp className="size-5" />
    </button>
  );
};
