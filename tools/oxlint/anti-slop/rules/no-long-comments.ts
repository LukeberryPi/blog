import { defineRule } from "@oxlint/plugins";

import type { Comment } from "@oxlint/plugins";

const MAX_LINES = 3;

function isStandaloneLineComment(comment: Comment, lines: string[]): boolean {
  const line = lines[comment.loc.start.line - 1] ?? "";
  return line.slice(0, comment.loc.start.column).trim() === "";
}

function isAdjacentLineComment(
  previous: Comment,
  next: Comment,
  lines: string[]
): boolean {
  return (
    previous.type === "Line" &&
    next.type === "Line" &&
    isStandaloneLineComment(previous, lines) &&
    isStandaloneLineComment(next, lines) &&
    next.loc.start.line === previous.loc.end.line + 1
  );
}

/** Consecutive `//` lines are one comment. A block is one comment. */
export const noLongCommentsRule = defineRule({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow comments longer than three source lines.",
    },
    messages: {
      tooLong:
        "This comment is {{lines}} lines. Cut it to 3 lines of objective language, or delete it.",
    },
  },
  createOnce(context) {
    return {
      Program() {
        const comments = context.sourceCode.getAllComments();
        const sourceLines = context.sourceCode.text.split(/\r?\n/u);
        let index = 0;
        while (index < comments.length) {
          const start = comments[index]!;
          let end = start;
          let cursor = index;
          while (
            cursor + 1 < comments.length &&
            isAdjacentLineComment(end, comments[cursor + 1]!, sourceLines)
          ) {
            cursor += 1;
            end = comments[cursor]!;
          }
          const lines = end.loc.end.line - start.loc.start.line + 1;
          if (lines > MAX_LINES) {
            context.report({
              loc: { start: start.loc.start, end: end.loc.end },
              messageId: "tooLong",
              data: { lines: String(lines) },
            });
          }
          index = cursor + 1;
        }
      },
    };
  },
});
