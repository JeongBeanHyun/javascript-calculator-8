export const DEFAULT_DELIMITERS = [",", ":"];

export function buildDelimiterRegex(delimiters) {
  const escaped = delimiters.map((d) =>
    d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(escaped.join("|"), "g");
  return regex;
}
