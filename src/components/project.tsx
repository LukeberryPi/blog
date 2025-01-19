import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Project } from "../lib/project";
export function ProjectView(project: Project) {
  return (
    <article>
      <div className="mt-10 flex justify-between flex-col gap-4 md:items-center md:flex-row">
        <h2 className="m-0">{project.title}</h2>
        <div className="flex items-center gap-4">
          {project.techs.map((tech, index) => (
            <div key={index} className="ring-1 ring-zinc-950 px-2 py-1 dark:ring-zinc-300">
              {tech}
            </div>
          ))}
        </div>
      </div>
      <a
        href={project.externalLink}
        target="_blank"
        className="group block overflow-hidden my-6 relative ring-1 ring-zinc-950"
      >
        <span className="z-10 absolute flex items-center gap-2 top-2 right-2 opacity-0 transition-all dark:text-zinc-950 group-hover:opacity-100">
          Click to visit website <ArrowUpRight className="size-5" />
        </span>
        <Image
          className="size-full group-hover:scale-105 transition-all"
          src={project.image}
          width={9999}
          height={250}
          alt="merchant"
        />
      </a>
      <p>
        {project.description}
      </p>
      <ul>
        {project.funcionalities.map((funcionality, index) => (
          <li key={index}>
            <span className="font-bold">{funcionality.title}:</span> {funcionality.description}
          </li>
        ))}
      </ul>
      <div className="items-center flex gap-4">
        <a
          className="items-center flex gap-2"
          href={project.externalLink}
          target="_blank"
        >
          Visit website
          <ArrowUpRight className="size-5" />
        </a>
        <a
          className="items-center flex gap-2"
          href={project.codeLink}
          target="_blank"
        >
          View code
          <ArrowUpRight className="size-5" />
        </a>
      </div>
    </article>
  )
}