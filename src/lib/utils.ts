import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Every step of the fluid type scale in `src/app/globals.css`.
 *
 * ⚠ KEEP IN SYNC with the `--text-*` tokens in that file. This list is not
 * cosmetic — see the `cn()` note below for what breaks without it.
 */
const TYPE_SCALE = [
  "display-1",
  "display-2",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "body-lg",
  "body",
  "body-sm",
  "caption",
  "overline",
  "watermark",
] as const;

/**
 * `clsx` + `tailwind-merge`, with the project's type scale registered.
 *
 * WHY THE EXTENSION IS LOAD-BEARING: tailwind-merge decides what a `text-*`
 * class means by matching the value against Tailwind's BUILT-IN font sizes
 * (`sm`, `lg`, `2xl`, …). Our scale uses custom keys (`body`, `h2`,
 * `display-1`), which it does not recognise — so it fell back to treating
 * `text-body` as a text COLOUR and, being later in the string, silently
 * dropped the real colour in front of it:
 *
 *   twMerge("bg-primary text-primary-foreground", "text-body")
 *     -> "bg-primary text-body"        // colour gone
 *
 * That shipped every `<ActionButton>` with dark text on a green fill, because
 * the size classes carry `text-body`/`text-body-sm`. Registering the scale
 * under `font-size` makes these size classes, so they no longer collide with
 * colour utilities. Adding a type step to globals.css without adding it to
 * TYPE_SCALE above reintroduces the bug for that step.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [...TYPE_SCALE] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
