type Funcionality = {
  title: string;
  description: string;
};
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
