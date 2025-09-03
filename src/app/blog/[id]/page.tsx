import { client } from "@/libs/microcms";
import { renderToc } from "@/libs/renderToc";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import BlogInfo from "@/components/BlogInfo";
import TocNav from "@/components/TocNav";
import dayjs from "dayjs";
import type { Article } from "@/types/content";
import { highlightArticle } from "@/libs/highlight-article";

// microCMSから特定の記事を取得
async function getBlogPost(id: string): Promise<Article> {
  const data = await client.get({
    endpoint: `blogs/${id}`,
  });
  return data;
}

// 記事詳細ページの生成
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id);

  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.updatedAt).format("YYYY.MM.DD");

  const highlightedBody = await highlightArticle(post.body);
  const toc = renderToc(highlightedBody);

  return (
    <>
      <Header />
      <Aside />
      <main className="max-w-full mx-auto md:grid md:grid-cols-[240px_1fr] xl:grid-cols-[320px_1fr] gap-8 px-4 md:px-8 mt-0 md:mt-[182px] min-h-[calc(100svh-216px-120px-32px)]">
        <div className="hidden md:block md:col-start-1 md:col-span-1 relative w-full">
          {toc.length > 0 && (
            <div className="md:sticky md:top-[182px]">
              <BlogInfo
                date={formattedDate}
                tags={post.tags}
              />
              <TocNav title={post.title} toc={toc} />
            </div>
          )}
        </div>
        <article className="md:col-start-2 md:col-span-1 w-full">
          <header>
            <p className="font-mono text-sm border-b">/ Title</p>
            <h1 className="col-span-4 text-xl sm:text-2xl md:text-3xl font-bold h-[8rem] grid justify-start items-center md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]">
              {post.title}
            </h1>
          </header>
          <div className="md:hidden">
            <BlogInfo
              date={formattedDate}
              tags={post.tags}
            />
            <TocNav title={post.title} toc={toc} />
          </div>
          <div className="mb-8 py-4">
            <h2 className="font-mono text-sm border-b">/ Article</h2>
            <div
              className="prose article-content md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]"
              dangerouslySetInnerHTML={{ __html: highlightedBody }}
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: "blogs" });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}
