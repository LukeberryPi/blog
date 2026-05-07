import { GitBranch, Globe } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

interface Project {
  name: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  githubUrl: string;
  url?: string;
  technologies: ReactNode;
}

const projects: Project[] = [
  {
    name: "StarScout Extension",
    description:
      "Browser extension and backend API for showing StarScout-derived suspected non-legit star signals on public GitHub repository pages.",
    imageUrl: "/projects/starscout-extension.png",
    imageAlt: "StarScout badge showing a suspected stars percentage on GitHub",
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
];

function ProjectCard({
  name,
  description,
  imageUrl,
  imageAlt,
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
      <Image src={imageUrl} width={1788} height={1012} alt={imageAlt} />
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
