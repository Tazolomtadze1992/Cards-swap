/** Presentation-only casing: keep source copy and filter keys in natural case.
 * Map Mkhedruli explicitly so SSR and every browser emit actual Mtavruli,
 * independent of CSS casing support or the runtime's Unicode version.
 * Latin casing remains the label style's text-transform responsibility.
 */
export function labelText(value: string) {
  return value.replace(/[\u10D0-\u10FA\u10FD-\u10FF]/g, character =>
    String.fromCharCode(character.charCodeAt(0) + 0xBC0)
  );
}
