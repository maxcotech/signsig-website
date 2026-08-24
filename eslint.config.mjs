import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

/**
 * ESLint is one half of the enforcement story. The other half is
 * `scripts/check-colors.mjs`, which catches colour literals anywhere in a file
 * (including inside CSS-in-JS and comments) rather than only in AST string
 * nodes. Both run in `npm run check`. See AGENTS.md § Enforcement.
 */

/**
 * Directories where OUR code lives and OUR rules apply.
 * `src/components/ui/**` is deliberately absent: it is shadcn CLI output, not
 * ours to slice or police. See src/components/ui/README.md.
 */
const OUR_CODE = [
  "src/app/**/*.{ts,tsx}",
  "src/components/**/*.{ts,tsx}",
  "src/features/**/*.{ts,tsx}",
];

const CLI_OWNED = ["src/components/ui/**"];

/**
 * Colour literals: hex (#fff, #ffff, #ffffff, #ffffffff) and the functional
 * notations. Matched against string literals and template chunks.
 *
 * These live in the token system, never in a component. See AGENTS.md.
 */
const HEX_LITERAL = String.raw`#(?:[0-9a-fA-F]{3,4}){1,2}\b`;
const FUNCTIONAL_COLOUR = String.raw`\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color-mix)\s*\(`;
const COLOUR_PATTERN = `(?:${HEX_LITERAL}|${FUNCTIONAL_COLOUR})`;

const COLOUR_MESSAGE =
  "Hardcoded colour value. Colours come from semantic tokens (bg-primary, text-muted-foreground). " +
  "If the design shows a colour with no token, the TOKEN SYSTEM IS INCOMPLETE: add a primitive in " +
  "src/app/globals.css, map it to a semantic token, document it in docs/DESIGN-SYSTEM.md, then use the token. " +
  "See AGENTS.md - The escape hatch.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "scripts/**",
  ]),

  // -- Import ordering, project-wide --------------------------------------
  {
    plugins: { import: importPlugin },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          // React first, then Next, then everything else external.
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "react-dom", group: "builtin", position: "before" },
            { pattern: "react-dom/**", group: "builtin", position: "before" },
            { pattern: "next", group: "external", position: "before" },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          // Required for the pathGroups above to apply to bare package names.
          pathGroupsExcludedImportTypes: [],
          // Keeps react/next/external in one visual block, still ordered,
          // instead of demanding a blank line between each pathGroup.
          distinctGroup: false,
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      // Named exports are greppable and refactor-safe. The Next.js files that
      // genuinely require a default export are exempted below.
      "no-restricted-exports": [
        "error",
        {
          restrictDefaultExports: {
            direct: true,
            named: true,
            defaultFrom: true,
            namedFrom: true,
          },
        },
      ],
    },
  },

  // -- Our code: line ceiling and no hardcoded colours --------------------
  {
    files: OUR_CODE,
    ignores: CLI_OWNED,
    rules: {
      // A DETECTOR, not a target. A file over 150 lines is a symptom: extract a
      // component, a hook, a *.data.ts, or a lib function. Splitting a file into
      // `thing-part-2.tsx` is this rule violated with extra steps.
      // See docs/STRUCTURE.md - approved decomposition patterns.
      "max-lines": [
        "error",
        { max: 150, skipBlankLines: false, skipComments: false },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: `Literal[value=/${COLOUR_PATTERN}/]`,
          message: COLOUR_MESSAGE,
        },
        {
          selector: `TemplateElement[value.raw=/${COLOUR_PATTERN}/]`,
          message: COLOUR_MESSAGE,
        },
        {
          selector:
            "JSXAttribute[name.name='style'] Property[key.name='zIndex']",
          message:
            "Inline z-index. Use a named layer from the z-index scale (z-header, z-modal, ...) defined in src/app/globals.css.",
        },
      ],
    },
  },

  // -- Next.js requires default exports for these file conventions --------
  {
    files: [
      "src/app/**/page.tsx",
      "src/app/**/layout.tsx",
      "src/app/**/template.tsx",
      "src/app/**/error.tsx",
      "src/app/**/global-error.tsx",
      "src/app/**/not-found.tsx",
      "src/app/**/loading.tsx",
      "src/app/**/route.ts",
      "src/app/**/sitemap.ts",
      "src/app/**/robots.ts",
      "src/app/**/manifest.ts",
      "src/app/**/opengraph-image.tsx",
      "src/app/**/twitter-image.tsx",
      "src/app/**/icon.tsx",
      "src/app/**/apple-icon.tsx",
      "*.config.{js,mjs,ts}",
      "next.config.ts",
    ],
    rules: { "no-restricted-exports": "off" },
  },

  // -- shadcn CLI output: exempt from our conventions, still type-checked --
  // These files are regenerated by `shadcn add`. Policing their import order or
  // line count would mean re-fixing them on every upgrade, and any fix would be
  // overwritten anyway. Our rule for this directory is "do not hand-write here"
  // (see src/components/ui/README.md), not "make the CLI match our style".
  {
    files: CLI_OWNED,
    rules: {
      "max-lines": "off",
      "no-restricted-syntax": "off",
      "no-restricted-exports": "off",
      "import/order": "off",
    },
  },
]);

export default eslintConfig;
