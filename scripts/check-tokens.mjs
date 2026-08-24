#!/usr/bin/env node
/**
 * Verifies the integrity of the three-layer token system in globals.css.
 *
 * Three failure modes, all of which are invisible until someone looks at the
 * site in the wrong theme:
 *
 *   1. A semantic token defined in `:root` but missing from `.dark`.
 *      Dark mode silently inherits the light value. This is THE most common
 *      way dark mode rots.
 *   2. A semantic token defined in `.dark` but missing from `:root`.
 *      Light mode gets an unresolved var, which computes to nothing.
 *   3. A semantic token with no `--color-*` entry in the `@theme inline`
 *      bridge. The token exists but no Tailwind utility does, so a future
 *      session concludes "there is no token for this" and hardcodes a value.
 *
 * Run: npm run check:tokens   (also runs inside `npm run check`)
 */

import { readFileSync } from "node:fs";

const CSS_PATH = "src/app/globals.css";
const css = readFileSync(CSS_PATH, "utf8");

/** Extract the body of the LAST top-level block matching a selector. */
function blocksFor(selector) {
  const bodies = [];
  const needle = `${selector} {`;
  let index = css.indexOf(needle);
  while (index !== -1) {
    let depth = 0;
    let i = css.indexOf("{", index);
    const start = i + 1;
    for (; i < css.length; i += 1) {
      if (css[i] === "{") depth += 1;
      else if (css[i] === "}") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    bodies.push(css.slice(start, i));
    index = css.indexOf(needle, i);
  }
  return bodies;
}

/**
 * A "semantic" token is one whose value is a `var(--...)` reference — Layer 2
 * points at Layer 1. Primitives hold literal colour values and are excluded,
 * which is exactly right: primitives are not supposed to flip.
 */
function semanticVars(body) {
  const names = new Set();
  for (const match of body.matchAll(
    /^\s*(--[a-z0-9-]+)\s*:\s*var\(\s*(--[a-z0-9-]+)/gim,
  )) {
    names.add(match[1]);
  }
  return names;
}

const rootBodies = blocksFor(":root");
const darkBodies = blocksFor(".dark");

if (rootBodies.length === 0 || darkBodies.length === 0) {
  console.error(
    `check:tokens  FAILED - could not find :root and .dark blocks in ${CSS_PATH}.`,
  );
  process.exit(1);
}

const rootSemantic = new Set();
for (const body of rootBodies) {
  for (const name of semanticVars(body)) rootSemantic.add(name);
}

const darkSemantic = new Set();
for (const body of darkBodies) {
  for (const name of semanticVars(body)) darkSemantic.add(name);
}

// The @theme inline bridge: which semantic tokens are exposed to Tailwind.
const bridged = new Set();
for (const body of blocksFor("@theme inline")) {
  for (const match of body.matchAll(
    /--color-[a-z0-9-]+\s*:\s*var\(\s*(--[a-z0-9-]+)/gi,
  )) {
    bridged.add(match[1]);
  }
}

const problems = [];

for (const name of [...rootSemantic].sort()) {
  if (!darkSemantic.has(name)) {
    problems.push(
      `${name} is defined in :root but MISSING from .dark - dark mode will inherit the light value.`,
    );
  }
}

for (const name of [...darkSemantic].sort()) {
  if (!rootSemantic.has(name)) {
    problems.push(
      `${name} is defined in .dark but MISSING from :root - light mode has no value for it.`,
    );
  }
}

/**
 * Tokens that intentionally have no Tailwind colour utility: they are consumed
 * as raw `var()` (by shadcn internals or by another token), not via a class.
 */
const BRIDGE_EXEMPT = new Set(["--radius"]);

for (const name of [...rootSemantic].sort()) {
  if (BRIDGE_EXEMPT.has(name)) continue;
  if (!bridged.has(name)) {
    problems.push(
      `${name} has no --color-* entry in the @theme inline bridge - the token exists but no utility class does.`,
    );
  }
}

console.log(
  `check:tokens  ${rootSemantic.size} semantic tokens in :root, ${darkSemantic.size} in .dark, ${bridged.size} bridged to Tailwind.`,
);

if (problems.length === 0) {
  console.log(
    "check:tokens  OK - light/dark parity holds and every token is bridged.",
  );
  process.exit(0);
}

console.error(`\ncheck:tokens  FAILED - ${problems.length} problem(s):\n`);
for (const problem of problems) console.error(`  ${problem}`);
console.error(
  [
    "",
    "Every semantic token must appear in THREE places in src/app/globals.css:",
    "  1. :root            (the light value)",
    "  2. .dark            (the dark value)",
    "  3. @theme inline    (--color-<name>: var(--<name>);)",
    "",
    "See docs/DESIGN-SYSTEM.md - Adding a token.",
    "",
  ].join("\n"),
);
process.exit(1);
