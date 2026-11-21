import cloudflare from "@cloudflare/oxlint-config";
import { defineConfig } from "oxlint";

// @cloudflare/oxlint-config first, then phived's anti-slop baseline, so the
// baseline's choices win where the two disagree.
export default defineConfig({
  ...cloudflare,
  categories: { correctness: "error" },
  plugins: [
    ...new Set([
      ...(cloudflare.plugins ?? []),
      ...(["eslint", "typescript"] as const),
    ]),
  ],
  ignorePatterns: [
    ...(cloudflare.ignorePatterns ?? []),
    "**/dist/**",
    "**/.astro/**",
    ".agent/**",
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".continue/**",
    ".cursor/**",
    ".gemini/**",
    ".opencode/**",
    ".pi/**",
    ".roo/**",
    ".windsurf/**",
    "tools/oxlint/anti-slop/**",
  ],
  jsPlugins: [
    ...(cloudflare.jsPlugins ?? []),
    { name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.ts" },
  ],
  rules: {
    ...cloudflare.rules,
    // phived dropped these in #226; they stay off.
    "quality/no-reflect-apply": "off",
    "quality/no-reflect-get": "off",
    eqeqeq: "error",
    complexity: ["error", { max: 80 }],
    "anti-slop/no-chained-type-assertions": "error",
    "anti-slop/no-conditional-empty-object-spread": "error",
    "anti-slop/no-known-value-widening": "error",
    "anti-slop/no-long-comments": "error",
    "anti-slop/no-module-mocking": "error",
    "anti-slop/no-object-parameters": "error",
    "anti-slop/no-runtime-typeof": "error",
    "anti-slop/no-shape-in-symbol-names": "error",
    "anti-slop/no-unknown-parameters": "error",
    "anti-slop/no-unknown-returns": "error",
    "anti-slop/no-unknown-type-aliases": "error",
    "anti-slop/no-unsafe-dictionary-type": "error",
    "anti-slop/no-widen-then-assert": "error",
    "anti-slop/require-safety-comment-for-type-assertion": "error",
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "typescript/consistent-type-imports": ["error", { prefer: "type-imports" }],
  },
  overrides: [
    ...(cloudflare.overrides ?? []),
    {
      files: ["**/*.astro"],
      globals: { Astro: "readonly" },
    },
    {
      files: ["scripts/**/*.ts"],
      env: { node: true },
      globals: { Bun: "readonly" },
    },
    {
      files: ["scripts/articles.ts"],
      rules: { "no-console": "off" },
    },
    {
      files: ["**/*.test.{ts,tsx}"],
      rules: {
        "anti-slop/no-silent-skip": "error",
        "anti-slop/no-source-text-assertions": "error",
        "anti-slop/no-ui-presence-tests": "error",
      },
    },
  ],
});
