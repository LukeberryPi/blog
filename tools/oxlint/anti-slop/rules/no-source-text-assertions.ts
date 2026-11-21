import { defineRule } from "@oxlint/plugins";

import type { ESTree } from "@oxlint/plugins";

// Only modules that a test could execute instead. Non-executable assets stay
// legal: matching hex colors in a CSS token file is a tripwire with no runtime
// seam to drive, whereas a .tsx module can simply be rendered.
const executableExtensions = [
  ".ts",
  ".tsx",
  ".mts",
  ".cts",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
];

const readMethods = new Set(["readFile", "readFileSync"]);

function isFileRead(callee: ESTree.Expression): boolean {
  if (callee.type === "Identifier") return readMethods.has(callee.name);
  if (callee.type !== "MemberExpression" || callee.computed) return false;
  if (callee.property.type !== "Identifier") return false;
  if (readMethods.has(callee.property.name)) return true;
  return (
    callee.property.name === "file" &&
    callee.object.type === "Identifier" &&
    callee.object.name === "Bun"
  );
}

/** Reads the literal path out of `"x.ts"`, `` `x.ts` ``, or `new URL("x.ts", …)`. */
function literalPath(node: ESTree.Node): string | null {
  if (node.type === "Literal") {
    return typeof node.value === "string" ? node.value : null;
  }
  if (node.type === "TemplateLiteral") {
    if (node.quasis.length !== 1) return null;
    return node.quasis[0]?.value.cooked ?? null;
  }
  if (node.type === "NewExpression") {
    const first = node.arguments[0];
    return first === undefined ? null : literalPath(first);
  }
  return null;
}

/** Ban reading a source module's text in a test instead of executing it. */
export const noSourceTextAssertionsRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow reading executable source files in tests; a test must run the code it names.",
    },
    messages: {
      sourceTextAssertion:
        "Do not read a source module's text in a test. Import and execute it instead — string matching passes while behavior is broken and fails on a harmless rename.",
    },
  },
  createOnce(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "Super" ||
          node.callee.type === "V8IntrinsicExpression"
        ) {
          return;
        }
        if (!isFileRead(node.callee)) return;
        const first = node.arguments[0];
        if (first === undefined) return;
        const path = literalPath(first);
        if (path === null) return;
        if (!executableExtensions.some((extension) => path.endsWith(extension))) {
          return;
        }
        context.report({ node, messageId: "sourceTextAssertion" });
      },
    };
  },
});
