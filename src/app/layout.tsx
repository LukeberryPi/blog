import type { Metadata } from "next";
import { Karla } from "next/font/google";
import Link from "next/link";
import "./globals.css";
// import { Sun } from "lucide-react";
import { ScrollToTop } from "../components/scroll-to-top";

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
        <header className="max-w-prose mx-auto mb-8">
          <nav className="flex items-center justify-between">
            <Link className="flex flex-col no-underline" href="/">
              <span className="font-bold">Caio Henrique</span>
              Software Engineer
            </Link>
            <div className="items-center flex gap-4">
              {/* <button><Sun className="size-5" /></button> */}
              <Link href="/">Home</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/articles">Articles</Link>
              <Link href="/about">About</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-prose">{children}<ScrollToTop /></main>
      </body>
    </html>
  );
}
