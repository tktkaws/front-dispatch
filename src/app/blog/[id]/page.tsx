// app/blog/[id]/page.tsx
import Link from "next/link";
import { client } from '@/libs/microcms';
import { renderToc } from '@/libs/renderToc';
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import dayjs from 'dayjs';
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
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // IDを取得
  const post = await getBlogPost(id);

  // dayjsを使ってpublishedAtをYY.MM.DD形式に変換
  const formattedDate = dayjs(post.updatedAt).format('YYYY.MM.DD');

  // 文字数をカウント
  const textContent = post.body.replace(/<[^>]*>/g, '');
  const characterCount = textContent.length;

  const highlightedBody = await highlightArticle(post.body);
  const toc = renderToc(highlightedBody);

  return (
    <>
      <Header />
      <Aside />
      <main className="max-w-full mx-auto md:grid md:grid-cols-[240px_1fr] xl:grid-cols-[320px_1fr] gap-8 px-4 md:px-8 mt-8 md:mt-[182px] min-h-[calc(100svh-216px-120px-32px)]">
        <div className="md:col-span-1 relative w-full">
          
          

          {toc.length > 0 && (
            <div className="md:sticky md:top-[182px]">
              <h3 className="font-mono text-sm border-b">/ Info</h3>
            <div className="space-y-3 h-[8rem]">
              <dl className="pt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-sm">
                <dt className="">Date</dt>
                <dd className="">{formattedDate}</dd>

                <dt className="">Character</dt>
                <dd className="">{characterCount}</dd>

                <dt className="">Tags</dt>
                <dd className="">
                  {post.tags && post.tags.length > 0 && (
                    <ul className="grid gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag.id} className="">
                          <Link
                            href={`/?tags=${tag.id}`}
                            scroll={false}
                            className="hover:underline"
                          >
                            {tag.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </dd>
              </dl>
            </div>
              <nav className="mb-8 py-4">
                <h2 className="font-mono text-sm border-b mb-3">/ Contents</h2>
                <a href="#" className="text-sm mb-2 block hover:underline">
                  {post.title}
                </a>
                <ul className="space-y-2 text-sm">
                  {toc.map((item, index) => (
                    <li key={index}
                    className="before:content-['-'] before:mr-2">
                      <a 
                        href={`#${item.id}`} 
                        className="hover:underline"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
        <div className="md:col-span-1 w-full">
          <article>
            <p className="font-mono text-sm border-b">/ Title</p>
          <h1 className="col-span-4 text-3xl font-bold h-[8rem] grid justify-start items-center md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]">
            {post.title}
          </h1>
          <div className="mb-8 py-4">
            <h2 className="font-mono text-sm border-b">/ Article</h2>
            <div className="prose pt-8 article-content md:max-w-[calc(100vw-240px-96px)] xl:max-w-[1000px]" dangerouslySetInnerHTML={{ __html: highlightedBody }} />
          </div>
          
            
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

// 静的パスを生成
export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'blogs' });

  return contentIds.map((contentId) => ({
    id: contentId, // 各記事のIDをパラメータとして返す
  }));
}
