/// <reference types="bun" />

import { afterAll, beforeAll, expect, test } from "bun:test";
import { mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

const repositoryRoot = path.resolve(import.meta.dir, "../../..");
let fixtureDirectory = "";

beforeAll(async () => {
  fixtureDirectory = await mkdtemp(path.join(tmpdir(), "blog-oxlint-"));
  await symlink(
    path.join(repositoryRoot, "node_modules"),
    path.join(fixtureDirectory, "node_modules")
  );
  await writeFile(
    path.join(fixtureDirectory, "tsconfig.json"),
    JSON.stringify({
      compilerOptions: {
        lib: ["esnext", "dom"],
        module: "esnext",
        moduleResolution: "bundler",
        strict: true,
        types: ["bun"],
      },
    })
  );
});

afterAll(async () => {
  await rm(fixtureDirectory, { recursive: true, force: true });
});

async function lintFixture(name: string, source: string) {
  const fixturePath = path.join(fixtureDirectory, name);
  await writeFile(fixturePath, source);
  const child = Bun.spawn(
    [
      path.join(repositoryRoot, "node_modules/.bin/oxlint"),
      "-c",
      path.join(repositoryRoot, "oxlint.config.ts"),
      "--deny-warnings",
      fixturePath,
    ],
    {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        NODE_OPTIONS: "--experimental-strip-types",
      },
      stdout: "pipe",
      stderr: "pipe",
    }
  );
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  return { exitCode, output: `${stdout}\n${stderr}` };
}

test("no-long-comments enforces the three-line boundary", async () => {
  const rejected = await lintFixture(
    "long-comment.ts",
    "// one\n// two\n// three\n// four\nexport {};\n"
  );
  const accepted = await lintFixture(
    "short-comment.ts",
    "// one\n// two\n// three\nexport {};\n"
  );
  const trailing = await lintFixture(
    "trailing-comments.ts",
    "void 1; // one\nvoid 2; // two\nvoid 3; // three\nvoid 4; // four\n"
  );

  expect(rejected.exitCode).not.toBe(0);
  expect(rejected.output).toContain("no-long-comments");
  expect(accepted.exitCode).toBe(0);
  expect(trailing.exitCode).toBe(0);
});

test("no-ui-presence-tests restricts known chrome sources only", async () => {
  const direct = await lintFixture(
    "direct-chrome.test.ts",
    'import { Header } from "src/components/Header";\nvoid Header;\n'
  );
  const barrel = await lintFixture(
    "barrel-chrome.test.ts",
    'import { Header as AppHeader } from "src/components";\nvoid AppHeader;\n'
  );
  const aliasBarrel = await lintFixture(
    "alias-barrel-chrome.test.ts",
    'import { Header } from "@/components";\nvoid Header;\n'
  );
  const aliasSplash = await lintFixture(
    "alias-splash-chrome.test.ts",
    'import { Splash } from "@/components/Splash";\nvoid Splash;\n'
  );
  const unrelated = await lintFixture(
    "unrelated-header.test.ts",
    'import { Header } from "unrelated-library";\nvoid Header;\n'
  );
  const valueAssertion = await lintFixture(
    "rendered-value.test.ts",
    'import { expect, test } from "bun:test";\ntest("value", () => {\n  const container = document.createElement("div");\n  expect(container.querySelector("output")?.textContent).toBe("saved");\n});\n'
  );

  expect(direct.exitCode).not.toBe(0);
  expect(direct.output).toContain("no-ui-presence-tests");
  expect(barrel.exitCode).not.toBe(0);
  expect(barrel.output).toContain("no-ui-presence-tests");
  expect(aliasBarrel.exitCode).not.toBe(0);
  expect(aliasBarrel.output).toContain("no-ui-presence-tests");
  expect(aliasSplash.exitCode).not.toBe(0);
  expect(aliasSplash.output).toContain("no-ui-presence-tests");
  expect(unrelated.exitCode).toBe(0);
  expect(valueAssertion.exitCode).toBe(0);
});
