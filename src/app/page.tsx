// app/page.tsx
import { Suspense } from "react";
import { client, getTags } from "@/libs/microcms";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Filter from "@/components/Filter";
import FilteredArticles from "@/components/FilteredArticles";

// タグの型定義
type Tag = {
  id: string;
  title: string;
  slug: string;
};

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  updatedAt: string;
};

// microCMSからブログ記事を取得
async function getBlogPosts(): Promise<Props[]> {
  const data = await client.get({
    endpoint: "blogs",
    queries: {
      fields: "id,title,body,tags,updatedAt",
      limit: 100,
    },
  });
  return data.contents;
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { tags?: string };
}) {
  const posts = await getBlogPosts();
  const tags = await getTags();
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <Header />
      <Aside />
      <main className="max-w-full mx-auto md:grid md:grid-cols-[240px_1fr] xl:grid-cols-[320px_1fr] gap-8 px-4 md:px-8 mt-8 md:mt-[216px] min-h-[calc(100svh-216px-120px-32px)]">
        <div className="md:col-span-1 relative">
          <Suspense fallback={<div>Loading...</div>}>
            <Filter tags={tags} />
          </Suspense>
        </div>
        <div className="md:col-span-1">
          <Suspense fallback={<div>Loading...</div>}>
            <FilteredArticles
              posts={posts}
              selectedTags={
                resolvedSearchParams?.tags
                  ? resolvedSearchParams.tags.split(",")
                  : []
              }
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
