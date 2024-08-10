import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function Project() {
    return (
        <article>
        <div className="mt-10 flex justify-between flex-col gap-4 md:items-center md:flex-row">
          <h2 className="m-0">A minigame to learn TailwindCSS</h2>
          <div className="flex items-center gap-4">
            <div className="ring-1 ring-zinc-950 px-2 py-1">
              TypeScript
            </div>
            <div className="ring-1 ring-zinc-950 px-2 py-1">
              TailwindCSS
            </div>
            <div className="ring-1 ring-zinc-950 px-2 py-1">
              Next.js
            </div>
          </div>
        </div>
        <a
          href="https://css2wind.com"
          target="_blank"
          className="group block overflow-hidden my-6 relative ring-1 ring-zinc-950"
        >
          <span className="z-10 absolute flex items-center transition-all gap-2 top-2 right-2 opacity-0 group-hover:opacity-100 text-zinc-100">
            Click to visit website <ArrowUpRight className="size-5" />
          </span>
          <Image
            className="size-full group-hover:scale-105 transition-all"
            src="/projects/css2wind.png"
            width={9999}
            height={250}
            alt="merchant"
          />
        </a>
        <p>
          A website to teach people what TailwindCSS is and isn&apos;t. The
          main feature is a minigame: there are eight CSS properties that you
          must translate to the equivalent TailwindCSS utility. It also has:{" "}
        </p>
        <ul>
          <li>
            <span className="font-bold">Resources:</span> a page that details
            the recommended tooling to maximize productivity and
            maintainability while using TailwindCSS. It mentions libraries
            such as{" "}
            <a href="#" target="_blank">
              prettier-plugin-tailwindcss
            </a>{" "}
            and{" "}
            <a href="#" target="_blank">
              shadcn/ui
            </a>
            .
          </li>
          <li>
            <span className="font-bold">Frequently Asked Questions:</span> a
            page that addresses common beginner questions about TailwindCSS.
            It also exposes misconceptions about the framework, such as
            recurring comparisons to Bootstrap.
          </li>
          <li>
            <span className="font-bold">Tutorial:</span> a page with a
            comprehensive, step-by-step guide that teaches the user how to
            play the minigame.
          </li>
        </ul>
        <div className="items-center flex gap-4">
          <a
            className="items-center flex gap-2"
            href="https://css2wind.com"
            target="_blank"
          >
            Visit website
            <ArrowUpRight className="size-5" />
          </a>
          <a
            className="items-center flex gap-2"
            href="https://github.com/LukeberryPi/css2wind"
            target="_blank"
          >
            View code
            <ArrowUpRight className="size-5" />
          </a>
        </div>
      </article>
    )
}