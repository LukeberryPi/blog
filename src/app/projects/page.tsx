import { GitBranch, Globe } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  githubUrl: string;
  url?: string;
  technologies: ReactNode;
}

const projects: Project[] = [
  {
    name: "Friendship Garden",
    description:
      "A web app to keep track of when you last spoke with your friends. Add contacts, log interactions, and never let too much time pass without reaching out.",
    imageUrl: "/projects/friendship-garden.png",
    imageAlt: "Friendship Garden interface",
    imageWidth: 836,
    imageHeight: 464,
    githubUrl: "https://github.com/arthurnunesc/friendship-garden",
    url: "https://friendship-garden.arthurnun.es",
    technologies: (
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#00D8FE] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">
          React
        </span>
        <span className="rounded-full bg-[#007ACC] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          TypeScript
        </span>
        <span className="rounded-full bg-[#646CFF] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          Vite
        </span>
        <span className="rounded-full bg-[#6EAA3E] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          Vitest
        </span>
      </div>
    ),
  },
  {
    name: "StarScout Extension",
    description:
      "Browser extension and backend API for showing StarScout-derived suspected non-legit star signals on public GitHub repository pages.",
    imageUrl: "/projects/starscout-extension.png",
    imageAlt: "StarScout badge showing a suspected stars percentage on GitHub",
    imageWidth: 1788,
    imageHeight: 1012,
    githubUrl: "https://github.com/arthurnunesc/starscout-extension",
    url: "/projects/starscout-extension",
    technologies: (
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#007ACC] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          TypeScript
        </span>
        <span className="rounded-full bg-[#00D8FE] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">
          React
        </span>
        <span className="rounded-full bg-[#7C3AED] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          WXT
        </span>
        <span className="rounded-full bg-[#009688] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          FastAPI
        </span>
        <span className="rounded-full bg-[#336791] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          PostgreSQL
        </span>
      </div>
    ),
  },
  {
    name: "Darkest Companion",
    description:
      "A Darkest Dungeon companion for planning expeditions: provisions, curios and location tips.",
    imageUrl: "/projects/darkest-companion.png",
    imageAlt: "Darkest Companion expedition planner interface",
    imageWidth: 2692,
    imageHeight: 1200,
    githubUrl: "https://github.com/arthurnunesc/darkest-companion",
    url: "https://darkest-companion.arthurnun.es",
    technologies: (
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-[#FF3E00] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          SvelteKit
        </span>
        <span className="rounded-full bg-[#646CFF] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          Vite
        </span>
        <span className="rounded-full bg-[#FF3E00] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          Svelte 5
        </span>
        <span className="rounded-full bg-[#06B6D4] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">
          Tailwind
        </span>
      </div>
    ),
  },
];

function ProjectCard({
  name,
  description,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  githubUrl,
  url,
  technologies,
}: Project) {
  return (
    <div className="flex-col divide-y divide-zinc-400 dark:divide-zinc-500 overflow-hidden rounded ring-1 dark:zinc-500 dark:ring-zinc-500 ring-zinc-400">
      <div className="flex flex-col items-start gap-4 p-4">
        <h2 className="text-2xl leading-tight">{name}</h2>
        {technologies}
      </div>
      <div>
        <p className="p-4">{description}</p>
      </div>
      <Image src={imageUrl} width={imageWidth} height={imageHeight} alt={imageAlt} />
      <div className="flex w-full justify-between divide-x divide-zinc-400 dark:divide-zinc-500">
        {url && (
          <a
            href={url}
            target={url.startsWith("http") ? "_blank" : undefined}
            className="flex grow items-center justify-center gap-2 py-4 transition-transform sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
          >
            <Globe strokeWidth={1.4} className="size-5" /> Visit website
          </a>
        )}
        <a
          href={githubUrl}
          target="_blank"
          className="flex grow items-center justify-center gap-2 py-4 transition-transform sm:hover:bg-zinc-100 sm:dark:hover:bg-zinc-800"
        >
          <GitBranch strokeWidth={1.4} className="size-5" /> View code
        </a>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <h1 className="mb-16 mt-4 text-center text-5xl max-sm:text-4xl">
        Projects
      </h1>
      <div className="space-y-20">
        {projects.map((project) => (
          <ProjectCard key={project.githubUrl} {...project} />
        ))}
      </div>
    </>
  );
}
