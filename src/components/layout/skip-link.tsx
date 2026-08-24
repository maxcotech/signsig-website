/**
 * "Skip to content" link.
 *
 * The first focusable element on the page. Visually hidden until focused, at
 * which point it becomes a normal, visible link — that is the whole point, so
 * do not replace `focus:` with `sr-only` alone.
 *
 * Requires a matching `id="main-content"` on the `<main>` element in the root
 * layout. If that id ever disappears, this link silently does nothing.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-skip-link focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:inline-flex focus:h-11 focus:items-center focus:rounded-lg focus:bg-primary focus:px-4 focus:text-body-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg"
    >
      Skip to content
    </a>
  );
}
