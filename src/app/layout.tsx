import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ScrollToTop } from "../components/scroll-to-top";

export const metadata: Metadata = {
  title: "Blog do João Pedro",
  description: "Blog pessoal do https://x.com/Joao_pedrorf",
};

const montserrat = Montserrat({
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
      <body className={`${montserrat.className} min-h-full p-4`}>
        <header className="max-w-prose mx-auto mb-8">
          <nav className="flex items-center justify-between">
            <Link className="flex flex-col no-underline" href="/">
              <span className="font-bold">João Pedro</span>
              Engenheiro de software
            </Link>
            <div className="items-center flex gap-4">
              
              <Link href="/">Home</Link>
              <Link href="/projetos">Projetos</Link>
              <Link href="/artigos">Artigos</Link>
              <Link href="/sobre">Sobre</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-prose">{children}<ScrollToTop /></main>
      </body>
    </html>
  );
}
