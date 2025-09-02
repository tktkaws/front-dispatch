import { getHighlighter, type BundledHighlighterOptions, type BundledLanguage, type BundledTheme } from "shiki";

let highlighterPromise: ReturnType<typeof getHighlighter> | null = null;

const THEMES: BundledTheme[] = ["github-light", "github-dark"];
const LANGS: BundledLanguage[] = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "json",
  "css",
  "scss",
  "html",
  "bash",
  "md",
  "markdown",
  "yaml",
];

export async function getHL() {
  if (!highlighterPromise) {
    const options = { themes: THEMES, langs: LANGS } satisfies BundledHighlighterOptions<
      BundledLanguage,
      BundledTheme
    >;
    highlighterPromise = getHighlighter(options);
  }
  return highlighterPromise;
}

export async function codeToHtmlBoth(code: string, lang: string) {
  const hl = await getHL();
  const light = await hl.codeToHtml(code, { lang, theme: "github-light" });
  const dark = await hl.codeToHtml(code, { lang, theme: "github-dark" });
  return { light, dark };
}
