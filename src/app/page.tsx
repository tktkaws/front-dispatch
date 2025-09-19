import { Suspense } from "react";
import { client, getTags } from "@/libs/microcms";
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Footer from "@/components/Footer";
import Filter from "@/components/Filter";
import Articles from "@/components/Articles";
import type { Article, Tag } from "@/types/content";
import { parseTags } from "@/libs/query";

async function getBlogPosts(): Promise<Article[]> {
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
  searchParams?: Promise<{ tags?: string }>;
}) {
  const posts = await getBlogPosts();
  const tags = await getTags();
  const resolvedSearchParams = await searchParams;
  const selected = parseTags(resolvedSearchParams?.tags ?? null);
  const filteredPosts =
    selected.length === 0
      ? posts
      : posts.filter((post) =>
          selected.every((tagId) => post.tags.some((tag) => tag.id === tagId))
        );

  // タグごとの記事数を集計し、0件を除外して多い順にソート
  const tagCountMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCountMap.set(tag.id, (tagCountMap.get(tag.id) ?? 0) + 1);
    }
  }

  const orderedTags: (Tag & { count: number })[] = tags
    .map((t) => ({ ...t, count: tagCountMap.get(t.id) ?? 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <>
      <Header />
      <Aside />
      <main className="max-w-full mx-auto md:grid md:grid-cols-[240px_1fr] xl:grid-cols-[320px_1fr] gap-8 px-4 md:px-8 md:mt-[182px] min-h-[calc(100svh-216px-120px-32px)]">
        <div className="md:col-span-1 relative">
          <Suspense fallback={<div>Loading...</div>}>
            <Filter tags={orderedTags} />
          </Suspense>
        </div>
        <div className="md:col-span-1">
          <Suspense fallback={<div>Loading...</div>}>
            <Articles posts={filteredPosts} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
