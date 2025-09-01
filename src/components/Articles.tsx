"use client";

import Link from "next/link";
import { renderToc } from '@/libs/renderToc';
import { useState, useEffect } from "react";
import type { Article } from "@/types/content";

// 設定: トップページで表示する目次の最大項目数
const MAX_TOC_ITEMS = 5;

// 型は共通typesから参照

type ArticlesProps = {
  posts: Article[];
};



export default function Articles({ posts }: ArticlesProps) {
  
  const [columnCount, setColumnCount] = useState(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const getCols = () => {
      if (window.matchMedia('(min-width: 1536px)').matches) {
        return 3;
      }
      if (window.matchMedia('(min-width: 1024px)').matches) {
        return 2;
      }
      return 1;
    };

    const handleResize = () => {
      setColumnCount(getCols());
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      <h2 className="font-mono text-sm border-b">/ Articles</h2>
      <ul className="grid gap-4 pt-4 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {posts.map((post, index) => {
          const toc = renderToc(post.body);
          
          const totalPosts = posts.length;
          let className = "border-b py-4 md:p-4 grid gap-4";

          if (isClient) {
            const isLastRow = Math.floor(index / columnCount) === Math.floor((totalPosts - 1) / columnCount);
            const shouldAddBorder = totalPosts <= columnCount || !isLastRow;
            if (!shouldAddBorder) {
                className = "py-4 md:p-4 grid gap-4";
            }
          }

          return (
            <li key={post.id} className={className}>
              <Link
                href={`/blog/${post.id}`}
                className="font-bold hover:underline"
              >
                {post.title}
              </Link>
              {toc.length > 0 && (
                  <ul className="hidden md:block space-y-1 font-mono text-sm mt-2 pr-2">
                    {toc.slice(0, MAX_TOC_ITEMS).map((item, index) => (
                      <li
                        key={index}
                        className="before:content-['-'] before:mr-2"
                      >
                        <Link
                          href={`/blog/${post.id}#${item.id}`}
                          className="hover:underline"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
              )}
              {post.tags.length > 0 && (
                <ul className="flex space-x-4 font-mono text-sm">
                      {post.tags.map((tag) => (
                        <li
                          key={tag.id}
                          className="border border-solid p-1 leading-none h-fit w-fit"
                        >
                          <Link
                            href={`/?tags=${tag.id}`}
                            className="hover:underline"
                          >
                            {tag.title}
                          </Link>
                        </li>
                      ))}
                </ul>
              )}
              
            </li>
          );
        })}
      </ul>
    </>
  );
}
