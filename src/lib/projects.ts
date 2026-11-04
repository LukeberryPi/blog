export type Project = {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  githubUrl?: string;
  technologies: string;
};

export const projects: Project[] = [
  {
    name: "tuble",
    description:
      "A daily London Tube game. Seven prompts, thirty seconds each: name a station that fits. The fewer people who gave your answer, the more you score. Everyone says Oxford Circus, so don't.",
    url: "https://tuble.win",
    imageUrl: "/projects/tuble.png",
    githubUrl: "https://github.com/LukeberryPi/tuble",
    technologies: `<div class="flex items-center gap-x-3"><span class="rounded-full bg-[#00D8FE] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">React</span><span class="rounded-full bg-gradient-to-r from-[#926AFE] to-[#49C7FF] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-none dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Vite</span><span class="rounded-full bg-[#F38020] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Cloudflare</span></div>`,
  },
  {
    name: "unreleasd",
    description:
      "Alerts for unreleased music. DJs post the clip where they heard an unreleased track, everyone watches it, and the buy links land the day it drops. No more begging for a track ID in the comments.",
    url: "https://unreleasd.com",
    imageUrl: "/projects/unreleasd.png",
    technologies: `<div class="flex items-center gap-x-3"><span class="rounded-full bg-black px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">TanStack Start</span><span class="rounded-full bg-[#4630EB] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Expo</span><span class="rounded-full bg-[#F38020] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Cloudflare</span></div>`,
  },
  {
    name: "freeblur",
    description:
      "Blur faces, names and anything else you'd rather not share. Everything happens in your browser, so your images never get uploaded anywhere. Free, no sign-up.",
    url: "https://www.freeblur.com",
    imageUrl: "/projects/freeblur.png",
    technologies: `<div class="flex items-center gap-x-3"><span class="rounded-full bg-black px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Next.js</span><span class="rounded-full bg-[#38BDF9] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">TailwindCSS</span><span class="rounded-full bg-[#F38020] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Cloudflare</span></div>`,
  },
  {
    name: "DJ Scan",
    description:
      "A Mac app that checks your tracks and your USB stick against the decks at your gig. It catches fake 320s, dead air and files the CDJs won't read, then formats the stick the way they need it. No more surprises in the booth.",
    url: "https://dj-scan.com",
    imageUrl: "/projects/dj-scan.png",
    technologies: `<div class="flex items-center gap-x-3"><span class="rounded-full bg-[#2B2E3A] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Electron</span><span class="rounded-full bg-[#00D8FE] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">React</span><span class="rounded-full bg-[#FF5D01] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Astro</span></div>`,
  },
  {
    name: "css2wind",
    description:
      "Learn TailwindCSS by playing a minigame: there are eight CSS properties that you must translate to the equivalent TailwindCSS utility. Bet you can't get 8/8.",
    url: "https://css2wind.com",
    imageUrl: "/projects/css2wind.png",
    githubUrl: "https://github.com/LukeberryPi/css2wind",
    technologies: `<div class="flex items-center gap-x-3"><span class="rounded-full bg-[#007ACC] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">TypeScript</span><span class="rounded-full bg-[#38BDF9] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">TailwindCSS</span><span class="rounded-full bg-black px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-zinc-200 dark:ring-1 dark:ring-zinc-500">Next.js</span></div>`,
  },
  {
    name: "King's Cross Cinema Schedule",
    description:
      "A simpler way to visualize the movies in the Everyman in the Canal 2025 in London. I watched Mean Girls and it was amazing.",
    url: "https://kings-cross-cinema-schedule-2025.vercel.app/",
    imageUrl: "/projects/cinema-schedule.png",
    githubUrl: "https://github.com/LukeberryPi/kings-cross-cinema-website",
    technologies: `<div class="flex items-center gap-x-3"><span class="rounded-full bg-[#FF5D01] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">Astro</span><span class="rounded-full bg-[#38BDF9] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">Tailwind</span><span class="rounded-full bg-black px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-none dark:ring-1 dark:ring-zinc-500">Vercel</span></div>`,
  },
  {
    name: "phived",
    description:
      "Stop procrastinating by dealing with five tasks at a time. If you want to add more tasks you need to resolve a previous one. Surprisingly effective.",
    url: "https://phived.com",
    imageUrl: "/projects/phived.png",
    technologies: `<div class="flex items-center gap-x-3"><span class="rounded-full bg-[#00D8FE] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">React</span><span class="rounded-full bg-[#38BDF9] px-2.5 py-0.5 text-sm text-zinc-950 dark:bg-inherit dark:text-inherit dark:ring-1 dark:ring-zinc-500">TailwindCSS</span><span class="rounded-full bg-gradient-to-r from-[#926AFE] to-[#49C7FF] px-2.5 py-0.5 text-sm text-zinc-100 dark:bg-none dark:ring-1 dark:ring-zinc-500">Vite</span></div>`,
  },
];
