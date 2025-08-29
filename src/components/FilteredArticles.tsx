"use client";

import { useMemo } from "react";
import Articles from "./Articles";

// タグの型定義
type Tag = {
  id: string;
  title: string;
  slug: string;
};

// ブログ記事の型定義
type Article = {
  id: string;
  title: string;
  body: string;
  tags: Tag[];
  updatedAt: string;
};

type FilteredArticlesProps = {
  posts: Article[];
  selectedTags: string[];
};

export default function FilteredArticles({ posts, selectedTags }: FilteredArticlesProps) {
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return posts;
    }

    return posts.filter(post => 
      selectedTags.every(tagId => 
        post.tags.some(tag => tag.id === tagId)
      )
    );
  }, [posts, selectedTags]);

  return <Articles posts={filteredPosts} />;
}