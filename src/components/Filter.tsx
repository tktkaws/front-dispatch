"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Tag } from "@/types/content";
import { parseTags, setTags } from "@/libs/query";

type FilterProps = {
  tags?: Tag[];
  onTagChange?: (selectedTags: string[]) => void;
};

export default function Filter({ tags = [], onTagChange }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // URLパラメータから選択されたタグを読み込み
  useEffect(() => {
    const tagsArray = parseTags(searchParams.get('tags'));
    setSelectedTags(tagsArray);
  }, [searchParams]);

  // タグの選択状態が変更されたときの処理
  const handleTagChange = (tagId: string, checked: boolean) => {
    let newSelectedTags: string[];
    
    if (checked) {
      newSelectedTags = [...selectedTags, tagId];
    } else {
      newSelectedTags = selectedTags.filter(id => id !== tagId);
    }
    
    setSelectedTags(newSelectedTags);
    
    // URLパラメータを更新（他クエリを保持）
    router.replace(setTags(window.location.search, newSelectedTags), { scroll: false });

    // 親コンポーネントに変更を通知
    if (onTagChange) {
      onTagChange(newSelectedTags);
    }
  };

  // クリアボタンの処理
  const handleClear = () => {
    setSelectedTags([]);
    router.replace(setTags(window.location.search, []), { scroll: false });
    if (onTagChange) {
      onTagChange([]);
    }
  };

  return (
    <div className="md:sticky md:top-[182px]">
      <div className="flex items-center justify-between border-b">
        <h3 className="font-mono text-sm">/ Filter</h3>
        {selectedTags.length > 0 && (
          <button
            onClick={handleClear}
            className="font-mono text-sm px-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-blue-500"
          >
            Clear
          </button>
        )}
      </div>
      <div className="space-y-3 py-4 font-mono">
        {tags.map((tag) => (
          <label htmlFor={tag.id} key={tag.id} className="flex items-center space-x-2 cursor-pointer rounded p-1 -m-1">
            <div className="relative">
              <input
                id={tag.id}
                type="checkbox"
                className="opacity-0 absolute w-3 h-3 peer focus:outline-none"
                checked={selectedTags.includes(tag.id)}
                onChange={(e) => handleTagChange(tag.id, e.target.checked)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTagChange(tag.id, !selectedTags.includes(tag.id));
                  }
                }}
              />
              <div className="w-3 h-3 border border-black dark:border-white flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-black-500">
                {selectedTags.includes(tag.id) && (
                  <div className="w-3 h-3 bg-black dark:bg-white"></div>
                )}
              </div>
            </div>
            <span className="">{tag.title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
