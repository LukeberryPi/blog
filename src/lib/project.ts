type Funcionality = {
  title: string;
  description: string;
};

// export type Project = {
//     title: string;
//     techs: string[];
//     externalLink: string;
//     description: string;
//     funcionalities: Funcionality[];
//     image: string;
//     codeLink: string;
// }

export class Project {
  constructor(
    public title: string,
    public techs: string[],
    public externalLink: string,
    public description: string,
    public funcionalities: Funcionality[],
    public image: string,
    public codeLink: string
  ) {}
}
// <article>
//           <div className="mt-10 flex justify-between flex-col gap-4 md:items-center md:flex-row">
//             <h2 className="m-0">An anti-procrastination to-do list</h2>
//             <div className="flex items-center gap-4">
//               <div className="ring-1 ring-zinc-950 px-2 py-1">
//                 React
//               </div>
//               <div className="ring-1 ring-zinc-950 px-2 py-1">
//                 TailwindCSS
//               </div>
//               <div className="ring-1 ring-zinc-950 px-2 py-1">
//                 Vite
//               </div>
//             </div>
//           </div>
//           <a
//             href="https://phived.com"
//             className="group block overflow-hidden my-6 relative ring-1 ring-zinc-950"
//             target="_blank"
//           >
//             <span className="z-10 absolute flex items-center gap-2 top-2 right-2 opacity-0 transition-all group-hover:opacity-100">
//               Click to visit website <ArrowUpRight className="size-5" />
//             </span>
//             <Image
//               className="size-full group-hover:scale-105 transition-all"
//               src="/projects/phived.png"
//               width={9999}
//               height={250}
//               alt="merchant"
//             />
//           </a>
//           <p>
//             A website to help you stop procrastinating. It is a to-do list with
//             one premise: you can&apos;t have more than five tasks at the same
//             time. If you want to add more tasks, you have to complete one of the
//             previous tasks. It is beautiful, efficient and privacy-first (no
//             information is stored). It also has:
//           </p>
//           <ul>
//             <li>
//               <span className="font-bold">Daily tasks: </span>a page to list
//               five things you want to do everyday. Everyday, you can restore
//               these tasks to do them again. My five daily tasks are currently:
//               do skin care, take creatine, work out, do a duolingo lesson, and
//               solve 5 chess puzzles.
//             </li>
//             <li>
//               <span className="font-bold">Progessive Web App (PWA): </span>
//               download phived on any mobilde device for free, so that you can
//               access your tasks from any device.
//             </li>
//           </ul>
//           <div className="items-center flex gap-4">
//             <a
//               className="items-center flex gap-2"
//               href="https://phived.com"
//               target="_blank"
//             >
//               Visit website
//               <ArrowUpRight className="size-5" />
//             </a>
//             <a
//               className="items-center flex gap-2"
//               href="https://github.com/LukeberryPi/phived"
//               target="_blank"
//             >
//               View code
//               <ArrowUpRight className="size-5" />
//             </a>
//           </div>
//         </article>
const css2wind = new Project(
    "A minigame to learn TailwindCSS",
    ["TypeScript", "TailwindCSS", "Next.js"],
    "https://css2wind.com",
    "A website to teach people what TailwindCSS is and isn&apos;t. The main feature is a minigame: there are eight CSS properties that you must translate to the equivalent TailwindCSS utility. It also has:",
    [
      {
        title: "Resources",
        description:
          "a page that details the recommended tooling to maximize productivity and maintainability while using TailwindCSS. It mentions libraries such as prettier-plugin-tailwindcss and shadcn/ui.",
      },
      {
        title: "Frequently Asked Questions",
        description:
          "a page that addresses common beginner questions about TailwindCSS. It also exposes misconceptions about the framework, such as",
      },
    ],
    "/projects/css2wind.png",
    "https://github.com/LukeberryPi/css2wind"
  )

const phived = new Project(
    "An anti-procrastination to-do list",
    ["React", "TailwindCSS", "Vite"],
    "https://phived.com",
    "A website to help you stop procrastinating. It is a to-do list with one premise: you can't have more than five tasks at the same time. If you want to add more tasks, you have to complete one of the previous tasks. It is beautiful, efficient and privacy-first (no information is stored). It also has:",
    [
      {
        title: "Daily tasks",
        description:
          "a page to list five things you want to do everyday. Everyday, you can restore these tasks to do them again. My five daily tasks are currently: do skin care, take creatine, work out, do a duolingo lesson, and solve 5 chess puzzles.",
      },
      {
        title: "Progessive Web App (PWA)",
        description:
          "download phived on any mobilde device for free, so that you can access your tasks from any device.",
      },
    ],
    "/projects/phived.png",
    "https://github.com/LukeberryPi/phived"
)

const projects: Project[] = [
    css2wind, phived
];
