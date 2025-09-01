import { createClient } from 'microcms-js-sdk';
import type { Tag } from '@/types/content';

// 環境変数にMICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

// 環境変数にMICROCMS_API_KEYが設定されていない場合はエラーを投げる
if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

// Client SDKの初期化を行う
export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// タグ一覧を取得する関数
export async function getTags(): Promise<Tag[]> {
  const data = await client.get({
    endpoint: 'tags',
    queries: {
      fields: 'id,title,slug',
    },
  });
  return data.contents;
}
