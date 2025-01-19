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

interface Link {
  description: string;
  url: string;
  Icon?: ReactNode;
}

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
    description: "X / Twitter",
    url: "https://x.com/CaioHenriqueOl3",
    Icon: <SiTwitter />,
  }
] as Link[];

const ExternalLink = (link: Link) => {
  return (
    <a
      key={link.description}
      href={link.url}
      target="_blank"
      className="flex items-center justify-between ring-1 ring-zinc-950 p-4 hover:bg-zinc-200 transition-all"
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

const InternalLink = (link: Link) => {
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
      {externalLinks.map((link: Link) => (
        <ExternalLink
          key={link.description}
          description={link.description}
          url={link.url}
          Icon={link.Icon}
        />
      ))}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4">
          {internalLinks.map((link: Link) => (
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
