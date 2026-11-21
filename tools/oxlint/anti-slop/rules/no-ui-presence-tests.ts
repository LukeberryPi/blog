import { defineRule } from "@oxlint/plugins";

import type { ESTree } from "@oxlint/plugins";

const chromeModules = new Set([
  "src/components/Header",
  "src/components/MobileActionBar",
  "src/components/SettingsButton",
  "src/components/Splash",
  "src/auth/PhivedProButton",
]);

const restrictedExports = new Map<string, ReadonlySet<string>>([
  [
    "src/components",
    new Set(["Header", "MobileActionBar", "SettingsButton"]),
  ],
  ["src/auth", new Set(["PhivedProButton"])],
]);

function withoutExtension(source: string): string {
  const normalized = source.replace(/\.[cm]?[tj]sx?$/u, "");
  return normalized.startsWith("@/") ? `src/${normalized.slice(2)}` : normalized;
}

function importsRestrictedExport(
  node: ESTree.ImportDeclaration,
  restricted: ReadonlySet<string>
): boolean {
  return node.specifiers.some((specifier) => {
    if (specifier.type !== "ImportSpecifier") {
      return false;
    }
    const name =
      specifier.imported.type === "Identifier"
        ? specifier.imported.name
        : specifier.imported.value;
    return restricted.has(name);
  });
}

export const noUiPresenceTestsRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow tests that only render chrome and assert a control exists.",
    },
    messages: {
      chromeImport:
        "Do not import chrome into a test. Header/splash/settings presence is not a product seam — delete the file.",
    },
  },
  createOnce(context) {
    return {
      ImportDeclaration(node) {
        if (typeof node.source.value !== "string") return;
        const source = withoutExtension(node.source.value);
        if (chromeModules.has(source)) {
          context.report({ node, messageId: "chromeImport" });
          return;
        }
        const restricted = restrictedExports.get(source);
        if (restricted && importsRestrictedExport(node, restricted)) {
          context.report({ node, messageId: "chromeImport" });
        }
      },
    };
  },
});
