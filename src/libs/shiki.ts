import { getHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof getHighlighter> | null = null;

const THEMES = ["github-light", "github-dark"] as const;
const LANGS = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "css",
  "scss",
  "html",
  "bash",
  "sh",
  "md",
  "markdown",
  "yaml",
  "yml",
] as const;

export async function getHL() {
  if (!highlighterPromise) {
    highlighterPromise = getHighlighter({ themes: THEMES as any, langs: LANGS as any });
  }
  return highlighterPromise;
}

export async function codeToHtmlBoth(code: string, lang: string) {
  const hl = await getHL();
  const light = await hl.codeToHtml(code, { lang, theme: "github-light" });
  const dark = await hl.codeToHtml(code, { lang, theme: "github-dark" });
  return { light, dark };
}
