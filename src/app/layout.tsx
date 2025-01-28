import type { Metadata } from "next";
import { Karla } from "next/font/google";
import Link from "next/link";
import "./globals.css";
// import { Sun } from "lucide-react";
import { ScrollToTop } from "../components/scroll-to-top";
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";
import Header from "./Header";
export const metadata: Metadata = {
  title: "Caihe's Blog",
  description: "Caihe's Blog",
};

const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen">
      <body className={`${karla.className} min-h-full p-4`}>
        <Analytics />
        <Script id="theme-toggle" strategy="afterInteractive">
          {`document.documentElement.classList.toggle("dark", localStorage.theme ===
        "dark" || (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches))`}
        </Script>
        <Header />
        <main className="mx-auto max-w-prose">{children}<ScrollToTop /></main>
      </body>
    </html>
  );
}
