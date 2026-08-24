#!/usr/bin/env node
/**
 * Fails the build on hardcoded colour values outside the token system.
 *
 * This is the primary enforcement gate. The ESLint `no-restricted-syntax` rule
 * is a second net, but it only sees string literals in the AST — it misses
 * colours in comments, in CSS files, and in odd corners of template syntax.
 * This script reads raw text, so it sees everything.
 *
 * ALLOWLIST — exactly two files, and the reason each is allowed:
 *   src/app/globals.css   The primitives layer. THE token source of truth.
 *   src/lib/raw-colors.ts Non-CSS consumers (browser chrome, next/og Satori)
 *                         that cannot resolve CSS custom properties.
 *
 * src/components/ui/** is skipped because it is shadcn CLI output — regenerated
 * by `shadcn add`, not hand-written, and not ours to police.
 *
 * Run: npm run check:colors   (also runs inside `npm run check`)
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();

const SCAN_DIRS = ["src"];

/** Paths (posix-style, repo-relative) permitted to contain raw colour values. */
const ALLOWLIST = new Set(["src/app/globals.css", "src/lib/raw-colors.ts"]);

/** Directory prefixes skipped entirely. */
const SKIP_DIRS = ["src/components/ui"];

const EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".scss"];

/**
 * Hex colours: #rgb, #rgba, #rrggbb, #rrggbbaa.
 * The trailing boundary stops `#faq` and `#main-content` matching.
 */
const HEX = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;

/** Functional colour notations, including the modern colour spaces. */
const FUNCTIONAL = /\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\s*\(/g;

/** Named CSS colours that are unmistakably a design decision, not a keyword. */
const NAMED =
  /(?<![\w-])(?:crimson|tomato|salmon|khaki|lavender|turquoise|chartreuse|fuchsia|magenta|maroon|navy|olive|teal|aqua|lime|indigo|violet|orchid|plum|beige|ivory|azure)(?![\w-])/gi;

const PATTERNS = [
  { name: "hex colour", regex: HEX },
  { name: "functional colour", regex: FUNCTIONAL },
  { name: "named CSS colour", regex: NAMED },
];

function toPosix(path) {
  return path.split(sep).join("/");
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const rel = toPosix(relative(ROOT, full));
    if (SKIP_DIRS.some((skip) => rel === skip || rel.startsWith(`${skip}/`))) {
      continue;
    }
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) {
      out.push(full);
    }
  }
  return out;
}

const violations = [];

for (const scanDir of SCAN_DIRS) {
  const base = join(ROOT, scanDir);
  let files;
  try {
    files = walk(base);
  } catch {
    continue;
  }

  for (const file of files) {
    const rel = toPosix(relative(ROOT, file));
    if (ALLOWLIST.has(rel)) continue;

    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      for (const { name, regex } of PATTERNS) {
        regex.lastIndex = 0;
        const match = regex.exec(line);
        if (match) {
          violations.push({
            file: rel,
            line: index + 1,
            kind: name,
            match: match[0],
            text: line.trim().slice(0, 120),
          });
          break;
        }
      }
    });
  }
}

if (violations.length === 0) {
  console.log(
    "check:colors  OK - no hardcoded colour values outside the token system.",
  );
  process.exit(0);
}

console.error(
  `\ncheck:colors  FAILED - ${violations.length} hardcoded colour value(s) found.\n`,
);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  ${v.kind}: ${v.match}`);
  console.error(`    ${v.text}`);
}
console.error(
  [
    "",
    "A colour in a design that has no token means THE TOKEN SYSTEM IS INCOMPLETE,",
    "not that the component needs a literal. Fix it in this order:",
    "",
    "  1. Add the value to the primitives layer in src/app/globals.css",
    "  2. Map it to a semantic token in the same file (:root AND .dark)",
    "  3. Add one --color-<name> line to the @theme inline bridge",
    "  4. Document it in docs/DESIGN-SYSTEM.md",
    "  5. Consume the token in the component (bg-<name>, text-<name>)",
    "",
    "Genuinely unavoidable literal (a non-CSS consumer)? It goes in",
    "src/lib/raw-colors.ts with an /* ESCAPE: <reason> */ comment. Never in a",
    "component file. See AGENTS.md - The escape hatch.",
    "",
  ].join("\n"),
);
process.exit(1);
