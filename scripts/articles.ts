// Writing helpers, run through package.json:
//   bun run new "My title"   start a draft and open it in your editor
//   bun run drafts           list drafts and anything left to fix
//   bun run ship <slug>      publish a draft: date it, commit it, push main

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ARTICLES_DIR = join(ROOT, "src", "articles");
const SITE_URL = "https://lukeberrypi.com";
const DEV_URL = "http://localhost:4321";
const DEFAULT_LOCATION = "London, United Kingdom";
const EDITOR_APP = process.env.BLOG_EDITOR ?? "Visual Studio Code";
const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

type Article = {
  slug: string;
  file: string; // relative to the repo root
  title: string;
  date: string;
  draft: boolean;
  source: string;
  words: number;
};

type Problem = { line: number; reason: string };

async function newDraft(args: string[]) {
  const title = args.join(" ").trim() || prompt("Title:")?.trim();
  if (!title) fail('Give it a title: bun run new "My title"');

  const slug = slugify(title);
  if (!slug) fail(`Couldn't turn "${title}" into a file name.`);

  const file = join("src", "articles", `${slug}.md`);
  if (existsSync(join(ROOT, file))) fail(`${file} already exists.`);

  await writeFile(
    join(ROOT, file),
    [
      "---",
      `title: ${JSON.stringify(title)}`,
      `date: "${today()}"`,
      "tags: []",
      `location: ${JSON.stringify(DEFAULT_LOCATION)}`,
      "draft: true",
      "---",
      "",
      "",
    ].join("\n"),
  );

  console.log(`Created ${file}`);
  console.log(`Preview: ${DEV_URL}/articles/${slug} (while bun dev runs)`);
  if (process.platform === "darwin") {
    spawnSync("open", ["-a", EDITOR_APP, join(ROOT, file)], {
      stdio: "ignore",
    });
  }
}

async function listDrafts() {
  const drafts = (await readArticles()).filter((article) => article.draft);
  if (drafts.length === 0) {
    console.log('No drafts. Start one with: bun run new "My title"');
    return;
  }
  printDrafts(drafts);
}

async function ship(args: string[]) {
  const force = args.includes("--force");
  // Takes a slug, part of one, or a file path from tab completion.
  const query = args
    .find((arg) => !arg.startsWith("--"))
    ?.replace(/^.*\//, "")
    .replace(/\.md$/, "")
    .toLowerCase();

  if (!query) {
    const drafts = (await readArticles()).filter((article) => article.draft);
    if (drafts.length) printDrafts(drafts);
    fail("Which one? bun run ship <slug> (part of the slug works too)");
  }

  const branch = git("branch", "--show-current").stdout;
  if (branch !== "main") {
    fail(
      `You're on "${branch}". The site deploys from main, so switch to it first.`,
    );
  }

  // Sync first, so drafts pushed from another machine are here too.
  const pull = git("pull", "--ff-only", "--no-rebase");
  if (!pull.ok) {
    fail(`Couldn't sync main with GitHub, so nothing changed:\n${pull.output}`);
  }
  console.log("✓ Synced main with GitHub");

  const articles = await readArticles();
  const published = articles.find(
    (article) => !article.draft && article.slug === query,
  );
  if (published) fail(`"${published.title}" is already published.`);

  const drafts = articles.filter((article) => article.draft);
  const exact = drafts.filter((draft) => draft.slug === query);
  const matches = exact.length
    ? exact
    : drafts.filter((draft) => draft.slug.includes(query));
  if (matches.length === 0) {
    fail(`No draft matches "${query}". See them with: bun run drafts`);
  }
  if (matches.length > 1) {
    const slugs = matches.map((draft) => `  ${draft.slug}`).join("\n");
    fail(`"${query}" matches more than one draft:\n${slugs}`);
  }

  const [draft] = matches;
  if (draft.words === 0) fail(`${draft.file} is still empty.`);

  const problems = findProblems(draft.source);
  if (problems.length && !force) {
    console.error(`"${draft.title}" isn't ready yet:`);
    for (const problem of problems) {
      console.error(`  ${draft.file}:${problem.line} ${problem.reason}`);
    }
    fail("Fix those, or ship it anyway with --force.");
  }

  const date = today();
  await writeFile(join(ROOT, draft.file), publish(draft.source, date));
  console.log(`✓ Dated it ${date} and removed draft: true`);

  const others = uncommittedFiles().filter((file) => file !== draft.file);
  git("add", "--", draft.file);
  const commit = git(
    "commit",
    "-m",
    `Publish "${draft.title}"`,
    "--",
    draft.file,
  );
  if (!commit.ok) {
    fail(
      `Couldn't commit ${draft.file}, so commit and push it yourself:\n${commit.output}`,
    );
  }
  console.log(`✓ Committed ${draft.file}`);
  if (others.length) {
    console.log(`  Not included, still uncommitted: ${others.join(", ")}`);
  }

  const push = git("push");
  if (!push.ok) {
    fail(
      `Committed, but the push failed:\n${push.output}\nRun git push once that's sorted.`,
    );
  }
  console.log("✓ Pushed main, so Cloudflare is building it now");
  console.log(
    `\n"${draft.title}" will be live in a minute or two:\n${SITE_URL}/articles/${draft.slug}`,
  );
}

function printDrafts(drafts: Article[]) {
  console.log(`${drafts.length} ${drafts.length === 1 ? "draft" : "drafts"}\n`);
  for (const draft of drafts) {
    const problems = findProblems(draft.source);
    const details = [
      `${draft.words.toLocaleString("en")} words`,
      `started ${draft.date}`,
    ];
    if (problems.length) details.push(`${problems.length} to fix`);

    console.log(draft.title);
    console.log(`  ${details.join(" · ")}`);
    for (const problem of problems) {
      console.log(`  ${draft.file}:${problem.line} ${problem.reason}`);
    }
    console.log(`  bun run ship ${draft.slug}\n`);
  }
}

async function readArticles(): Promise<Article[]> {
  const names = (await readdir(ARTICLES_DIR, { recursive: true })).filter(
    (name) => name.endsWith(".md"),
  );
  const articles = await Promise.all(
    names.map(async (name) => {
      const source = await readFile(join(ARTICLES_DIR, name), "utf8");
      const { frontmatter, body } = splitFrontmatter(source);
      const slug = name.replace(/\.md$/, "");
      return {
        slug,
        file: join("src", "articles", name),
        title: field(frontmatter, "title") ?? slug,
        date: field(frontmatter, "date") ?? "",
        draft: field(frontmatter, "draft")?.toLowerCase() === "true",
        source,
        words: countWords(body),
      };
    }),
  );
  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function splitFrontmatter(source: string) {
  const match = source.match(FRONTMATTER);
  if (!match) return { frontmatter: "", body: source };
  return { frontmatter: match[1], body: source.slice(match[0].length) };
}

// Reads a one-line `key: value`. That covers title, date and draft; Astro's
// schema still validates the full YAML when the site builds.
function field(frontmatter: string, key: string): string | undefined {
  const match = frontmatter.match(
    new RegExp(`^${key}:[ \\t]*(.*?)[ \\t]*$`, "m"),
  );
  if (!match) return undefined;
  const value = match[1];
  if (value.startsWith('"')) {
    try {
      return JSON.parse(value);
    } catch {
      return value.slice(1, -1);
    }
  }
  if (value.startsWith("'")) return value.slice(1, -1).replaceAll("''", "'");
  return value;
}

// Drops `draft: true` and dates the article today. Everything else stays as written.
function publish(source: string, date: string) {
  const { frontmatter, body } = splitFrontmatter(source);
  const lines = frontmatter
    .split(/\r?\n/)
    .filter((line) => !/^draft\s*:/.test(line));
  const dateLine = `date: "${date}"`;
  const dateIndex = lines.findIndex((line) => /^date\s*:/.test(line));
  if (dateIndex === -1) lines.push(dateLine);
  else lines[dateIndex] = dateLine;
  return `---\n${lines.join("\n")}\n---\n${body}`;
}

// Leftovers that shouldn't reach the live site. Code blocks are skipped.
function findProblems(source: string): Problem[] {
  const problems: Problem[] = [];
  let inCodeBlock = false;
  source.split("\n").forEach((text, index) => {
    if (/^\s*(```|~~~)/.test(text)) {
      inCodeBlock = !inCodeBlock;
      return;
    }
    if (inCodeBlock) return;

    const prose = text.replace(/`[^`]*`/g, "");
    const marker = prose.match(/\b(TODO|FIXME|TK)\b/);
    if (marker)
      problems.push({ line: index + 1, reason: `leftover ${marker[1]}` });
    if (/(?<!!)\[\s*\]\(|\]\(\s*(https?:\/\/)?\s*\)/.test(prose)) {
      problems.push({ line: index + 1, reason: "empty link" });
    }
  });
  return problems;
}

function countWords(markdown: string) {
  return markdown.split(/\s+/).filter((word) => /[\p{L}\p{N}]/u.test(word))
    .length;
}

function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // "Málaga" -> "Malaga"
    .toLowerCase()
    .replace(/['’]/g, "") // "don't" -> "dont"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function today() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

function uncommittedFiles() {
  return git("status", "--porcelain", "--untracked-files=all")
    .stdout.split("\n")
    .filter(Boolean)
    .map((line) => line.slice(3));
}

function git(...args: string[]) {
  const result = spawnSync("git", args, { cwd: ROOT, encoding: "utf8" });
  const stdout = (result.stdout ?? "").trimEnd();
  return {
    ok: result.status === 0,
    stdout,
    output: `${stdout}\n${result.stderr ?? ""}`.trim(),
  };
}

function fail(message: string): never {
  console.error(message);
  process.exit(1);
}

const commands: Record<string, (args: string[]) => Promise<void>> = {
  new: newDraft,
  drafts: listDrafts,
  ship,
};

const [command = "", ...args] = process.argv.slice(2);
const run = commands[command];
if (!run)
  fail('Usage: bun run new "My title" | bun run drafts | bun run ship <slug>');
await run(args);
