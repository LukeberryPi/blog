import { defineRule } from "@oxlint/plugins";

import type { ESTree } from "@oxlint/plugins";

function walk(node: unknown, visit: (node: ESTree.Node) => void): void {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const child of node) walk(child, visit);
    return;
  }
  const record = node as Record<string, unknown>;
  if (typeof record.type === "string") visit(node as ESTree.Node);
  for (const key of Object.keys(record)) {
    // `parent` points back up the tree, so following it would not terminate.
    if (key === "parent") continue;
    walk(record[key], visit);
  }
}

function contains(node: ESTree.Node, match: (node: ESTree.Node) => boolean) {
  let found = false;
  walk(node, (child) => {
    if (match(child)) found = true;
  });
  return found;
}

function isProcessEnv(node: ESTree.Node): boolean {
  return (
    node.type === "MemberExpression" &&
    !node.computed &&
    node.object.type === "Identifier" &&
    node.object.name === "process" &&
    node.property.type === "Identifier" &&
    node.property.name === "env"
  );
}

/** The sanctioned escape hatch: an environment variable makes the dependency
 * required and absence throws. CI sets it; local runs may keep the skip. */
function hasFailLoudGuard(program: ESTree.Node): boolean {
  return contains(
    program,
    (node) =>
      node.type === "IfStatement" &&
      contains(node.test, isProcessEnv) &&
      contains(node.consequent, (child) => child.type === "ThrowStatement")
  );
}

function isSkipMember(node: ESTree.Node): boolean {
  return (
    node.type === "MemberExpression" &&
    !node.computed &&
    node.property.type === "Identifier" &&
    node.property.name === "skip"
  );
}

/** Ban runtime-conditional test skips that cannot be told apart from a pass. */
export const noSilentSkipRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow conditionally skipping a suite without an environment variable that makes the skip fail loud.",
    },
    messages: {
      silentSkip:
        "A conditionally skipped suite reports the same green as a passing one. Throw when an environment variable declares the dependency required (see SYNC_PG_TESTS_REQUIRED in apps/server/src/sync-document.pg.test.ts), then keep the skip for local runs.",
    },
  },
  createOnce(context) {
    return {
      Program(node) {
        if (hasFailLoudGuard(node)) return;
        walk(node, (child) => {
          if (child.type !== "ConditionalExpression") return;
          if (!isSkipMember(child.consequent) && !isSkipMember(child.alternate)) {
            return;
          }
          context.report({ node: child, messageId: "silentSkip" });
        });
      },
    };
  },
});
