import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GitBranch, ShieldCheck, Store } from "lucide-react";

export const metadata: Metadata = {
  title: "StarScout Extension | Arthur Nunes",
  description:
    "Browser extension and backend API for showing StarScout-derived suspected non-legit star signals on public GitHub repositories.",
};

export default function StarScoutExtensionPage() {
  return (
    <article>
      <header className="mt-4 space-y-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Project / browser extension
        </p>
        <h1 className="text-5xl leading-tight max-sm:text-4xl">
          StarScout Extension
        </h1>
        <p>
          Browser extension and backend API for showing StarScout-derived
          suspected non-legit star signals on public GitHub repository pages.
        </p>
        <p>
          The extension adds a <code>StarScout</code> badge near GitHub&apos;s native
          repository star count and opens a details popover with aggregate
          metrics and attribution.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <img
            alt="StarScout desktop badge with aggregate star integrity signal"
            src="/projects/starscout-extension/starscout-badge-desktop.png"
          />
        </div>
        <div>
          <img
            alt="StarScout badge on a narrower GitHub layout"
            src="/projects/starscout-extension/starscout-badge-mobile.png"
          />
        </div>
      </section>

      <section className="space-y-3">
        <a
          href="https://chromewebstore.google.com/detail/starscout-see-suspected-n/ddnenpmampfmhlndeebggeoaehjmdmnb"
          target="_blank"
          className="group flex items-center justify-between rounded p-4 ring-1 ring-zinc-400 transition-transform sm:hover:bg-zinc-100 dark:ring-zinc-500 sm:dark:hover:bg-zinc-800"
        >
          <span className="flex items-center gap-3">
            <Store strokeWidth={1.4} className="size-5" /> Chrome Web Store page
          </span>
          <ArrowUpRight
            strokeWidth={1.4}
            className="size-5 transition-transform sm:group-hover:rotate-45"
          />
        </a>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="https://github.com/arthurnunesc/starscout-extension"
            target="_blank"
            className="group flex items-center justify-between rounded p-4 ring-1 ring-zinc-400 transition-transform sm:hover:bg-zinc-100 dark:ring-zinc-500 sm:dark:hover:bg-zinc-800"
          >
            <span className="flex items-center gap-3">
              <GitBranch strokeWidth={1.4} className="size-5" /> View code
            </span>
            <ArrowUpRight
              strokeWidth={1.4}
              className="size-5 transition-transform sm:group-hover:rotate-45"
            />
          </a>
          <Link
            href="/projects/starscout-extension/privacy"
            className="group flex items-center justify-between rounded p-4 ring-1 ring-zinc-400 transition-transform sm:hover:bg-zinc-100 dark:ring-zinc-500 sm:dark:hover:bg-zinc-800"
          >
            <span className="flex items-center gap-3">
              <ShieldCheck strokeWidth={1.4} className="size-5" /> Privacy policy
            </span>
            <ArrowUpRight
              strokeWidth={1.4}
              className="size-5 transition-transform sm:group-hover:rotate-45"
            />
          </Link>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Results are bounded by the StarScout dataset cutoff, currently{" "}
          <code>2025-01-01</code>.
        </p>
      </section>

      <section>
        <h2>Usage</h2>
        <ol>
          <li>
            Install StarScout from the{" "}
            <a
              href="https://chromewebstore.google.com/detail/starscout-see-suspected-n/ddnenpmampfmhlndeebggeoaehjmdmnb"
              target="_blank"
            >
              Chrome Web Store
            </a>
            .
          </li>
          <li>
            Open a public GitHub repository page and look for the{" "}
            <code>StarScout</code> badge near GitHub&apos;s native star control.
          </li>
        </ol>
      </section>

      <section>
        <h2>What it does</h2>
        <ul>
          <li>
            Detects <strong>public</strong> GitHub repository pages.
          </li>
          <li>Sends only a recognized public owner/repo identifier to the API.</li>
          <li>Shows aggregate suspected non-legit star metrics when available.</li>
          <li>Shows a neutral not-analyzed state when the dataset has no row.</li>
        </ul>
      </section>

      <section>
        <h2>What it does NOT do</h2>
        <ul>
          <li>Prove that stars are fake.</li>
          <li>Prove that remaining stars are legitimate.</li>
          <li>Claim that users or repositories are fake.</li>
          <li>Expose actor-level stargazer identities.</li>
          <li>Treat results as definitive evidence.</li>
        </ul>
      </section>

      <section>
        <h2>What the popover shows</h2>
        <ul>
          <li>Current GitHub stars when available.</li>
          <li>Suspected non-legit stars.</li>
          <li>Estimated legitimate stars.</li>
          <li>Low-activity, lockstep, and overlap breakdowns.</li>
          <li>Dataset cutoff date and attribution.</li>
        </ul>
      </section>

      <section>
        <h2>Privacy posture</h2>
        <p>
          The extension does not collect GitHub credentials, GitHub account
          identity, extension-specific user IDs, or private repository names or
          contents.
        </p>
        <p>
          See the <Link href="/projects/starscout-extension/privacy">privacy policy</Link>{" "}
          for the full details.
        </p>
      </section>

      <section>
        <h2>Attribution</h2>
        <p>
          This project uses StarScout-derived data and methodology. StarScout is
          an academic research project by Hao He, Haoqin Yang, Philipp
          Burckhardt, Alexandros Kapravelos, Bogdan Vasilescu, and Christian
          Kaestner.
        </p>
        <ul>
          <li>
            StarScout repository: {" "}
            <a href="https://github.com/hehao98/StarScout" target="_blank">
              github.com/hehao98/StarScout
            </a>
          </li>
          <li>
            Zenodo replication package DOI: {" "}
            <a href="https://doi.org/10.5281/zenodo.17009694" target="_blank">
              10.5281/zenodo.17009694
            </a>
          </li>
          <li>
            Paper: Six Million (Suspected) Fake Stars on GitHub: A Growing
            Spiral of Popularity Contests, Spam, and Malware. ICSE 2026.
          </li>
        </ul>
      </section>
    </article>
  );
}
