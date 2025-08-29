import * as cheerio from 'cheerio';

type TocItem = {
  text: string;
  id: string;
};

export const renderToc = (body: string): TocItem[] => {
  const $ = cheerio.load(body);
  const headings = $('h2, h3').toArray();
  const toc: TocItem[] = headings.map((data) => ({
    text: $(data).text(),
    id: data.attribs.id,
  }));

  return toc;
};