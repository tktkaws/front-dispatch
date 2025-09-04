import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import TocNav from "@/components/TocNav";
import { client } from "@/libs/microcms";
import { highlightArticle } from "@/libs/highlight-article";
import { renderToc } from "@/libs/renderToc";
import type { About } from "@/types/content";
import { Fragment } from "react";

async function getAbout(): Promise<About> {
  const data = await client.get({
    endpoint: "about",
    contentId: "otkeqdoh0n",
  });
  return data as About;
}

export default async function AboutPage() {
  const about = await getAbout();
  const highlightedBody = await highlightArticle(about.body);
  const toc = renderToc(highlightedBody);

  return (
    <>
      <Header />
      <Aside />
      <main className="max-w-full mx-auto md:grid md:grid-cols-[240px_1fr] xl:grid-cols-[320px_1fr] gap-8 px-4 md:px-8 mt-0 md:mt-[182px] min-h-[calc(100svh-216px-120px-32px)]">
        <div className="hidden md:block md:col-start-1 md:col-span-1 relative w-full">
          <div className="md:sticky md:top-[182px]">
            <h3 className="font-mono text-sm border-b">/ Info</h3>
            <div className="space-y-3 md:h-[8rem]">
              <dl className="pt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
                {about.info_repeat?.map((item, idx) => (
                  <Fragment key={`${item.title}-${idx}`}>
                    <dt>{item.title}</dt>
                    <dd>{item.desc}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
            <TocNav title={about.title} toc={toc} />
          </div>
        </div>
        <article className="md:col-start-2 md:col-span-1 w-full">
          <header>
            <p className="font-mono text-sm border-b">/ Title</p>
            <h1
              id="about"
              className="col-span-4 text-xl sm:text-2xl md:text-3xl font-bold h-[8rem] grid justify-start items-center md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]"
            >
              {about.title}
            </h1>
          </header>
          <div className="md:hidden">
            <h3 className="font-mono text-sm border-b">/ Info</h3>
            <div className="space-y-3">
              <dl className="pt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
                {about.info_repeat?.map((item, idx) => (
                  <Fragment key={`mobile-${item.title}-${idx}`}>
                    <dt>{item.title}</dt>
                    <dd>{item.desc}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
            {toc.length > 0 && (
              <TocNav title={about.title} toc={toc} />
            )}
          </div>
          <section className="mb-8 py-4">
            <h2 className="font-mono text-sm border-b">/ Article</h2>
            <div
              className="prose article-content md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]"
              dangerouslySetInnerHTML={{ __html: highlightedBody }}
            />
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
