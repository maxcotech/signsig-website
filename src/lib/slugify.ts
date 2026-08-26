/**
 * Turn a heading into a URL fragment.
 *
 * Used for the anchor ids on legal and trust pages, so a specific clause can
 * be linked and cited — "/terms#12-limitation-of-liability". Section headings
 * there are numbered and stable, which is what makes the derived id stable
 * too; renumber a section and its link changes, same as in any printed
 * contract.
 *
 * Accents are stripped by decomposing to NFD and dropping the combining
 * marks, so "Übersicht" becomes "ubersicht" rather than losing the letter.
 * `\p{Diacritic}` rather than a literal character range: the range is
 * invisible in a diff and easy to corrupt in transit.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
