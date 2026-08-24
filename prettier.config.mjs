/**
 * Prettier configuration.
 *
 * `prettier-plugin-tailwindcss` sorts Tailwind classes into a canonical order.
 * That is not cosmetic: without it, two sessions writing the same classes in a
 * different order produce a diff on every touched line, and real changes get
 * lost in the noise. It also collapses duplicate/conflicting utilities into a
 * visible ordering so conflicts are easier to spot.
 *
 * `tailwindStylesheet` is the Tailwind v4 option (v3 used `tailwindConfig`).
 * The plugin needs it to discover our custom utilities and theme keys — without
 * it, project-specific classes like `text-display-1`, `py-section-y` and
 * `z-header` are treated as unknown and sorted to the wrong place.
 *
 * @type {import("prettier").Config}
 */
const config = {
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  arrowParens: "always",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
  // `cn(...)` and `cva(...)` arguments are class strings too.
  tailwindFunctions: ["cn", "cva", "clsx", "twMerge"],
};

export default config;
