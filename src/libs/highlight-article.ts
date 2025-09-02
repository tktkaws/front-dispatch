import * as cheerio from "cheerio";
import { codeToHtmlBoth } from "./shiki";

export async function highlightArticle(html: string): Promise<string> {
  const $ = cheerio.load(html);

  const tasks: Promise<void>[] = [];

  $("pre > code").each((_, el) => {
    const $code = $(el);
    const raw = $code.text();
    const cls = ($code.attr("class") || "").trim();
    const lang = cls.replace(/^language-/, "") || "text";

    tasks.push(
      (async () => {
        const { light, dark } = await codeToHtmlBoth(raw, lang);
        const wrapped = `
<div class="codegroup">
  <div class="shiki-light">${light}</div>
  <div class="shiki-dark">${dark}</div>
</div>`;
        $code.parent("pre").replaceWith(wrapped);
      })()
    );
  });

  await Promise.all(tasks);
  return $.html();
}

