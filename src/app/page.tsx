import {
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiSpotify,
  SiTwitter,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface LinkT {
  description: string;
  url: string;
  Icon?: ReactNode;
}
const BskyLogo = () => {
  return (
    <svg fill="none" viewBox="0 0 64 57" width="24">
      <path
        className="fill-zinc-950 dark:fill-zinc-200"
        d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"
      ></path>
    </svg>
  );
};

const externalLinks = [
  {
    description: "LinkedIn",
    url: "https://www.linkedin.com/in/caio-henrique-oliveira-batista-74608b23b/",
    Icon: <SiLinkedin />,
  },
  {
    description: "GitHub",
    url: "https://github.com/caiohvectora",
    Icon: <SiGithub />,
  },
  {
    description: "Bluesky",
    url: "https://bsky.app/profile/caihevector.bsky.social",
    Icon: <BskyLogo />,
  },
] as LinkT[];

const ExternalLink = (link: LinkT) => {
  return (
    <a
      key={link.description}
      href={link.url}
      target="_blank"
      className="flex items-center justify-between ring-1 ring-zinc-950 dark:ring-zinc-200 p-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
    >
      <span className="flex items-center gap-4">
        {link.Icon} {link.description}
      </span>
      <ArrowUpRight className="size-5" />
    </a>
  );
};

const internalLinks = [
  {
    description: "Veja meus projetos",
    url: "/projects",
  },
  {
    description: "Leia meus artigos",
    url: "/articles",
  },
  {
    description: "Sobre mim",
    url: "/about",
  },
];

const InternalLink = (link: LinkT) => {
  return (
    <Link className="group flex items-center gap-2" href={link.url}>
      {link.description}
      <ArrowRight className="size-5 group-hover:tranzinc-x-1 transition-all" />
    </Link>
  );
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      {externalLinks.map((link: LinkT) => (
        <ExternalLink
          key={link.description}
          description={link.description}
          url={link.url}
          Icon={link.Icon}
        />
      ))}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4">
          {internalLinks.map((link: LinkT) => (
            <InternalLink
              key={link.description}
              description={link.description}
              url={link.url}
            />
          ))}
        </div>
        <div className="flex gap-2 flex-col">
          <a
            href="/caihe-cv.pdf"
            download="caihe-cv.pdf"
            className="bg-zinc-900 dark:bg-zinc-200 p-4 text-zinc-100 dark:text-zinc-900 flex flex-col sm:flex-row items-center gap-3 hover:bg-zinc-700 dark:hover:bg-zinc-400 transition-all"
          >
            Baixe meu CV
            <Download className="size-5" />
          </a>
          {/* <span className="text-zinc-500">It&apos;s only one page.</span> */}
        </div>
      </div>
    </div>
  );
}
