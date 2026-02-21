# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## コマンド

```bash
npm run dev       # 開発サーバー起動 (localhost:3000)
npm run build     # 本番ビルド
npm run start     # 本番サーバー起動
npm run lint      # ESLint 実行
```

依存関係のインストールには `--legacy-peer-deps` が必要（peer dependency の競合があるため）:

```bash
npm install --legacy-peer-deps
```

テストフレームワークは未設定。

## 環境変数

`.env.local` に以下が必要:

```
MICROCMS_API_KEY=...
MICROCMS_SERVICE_DOMAIN=...
```

## アーキテクチャ

**Next.js 15 App Router** を使用したブログサイト（"FRONT DISPATCH"）。コンテンツは **microCMS**（ヘッドレスCMS）から取得する。

### データフロー

1. microCMS でコンテンツを作成し、`microcms-js-sdk` を使ってサーバーサイドで取得
2. 記事の HTML を後処理: コードブロックを Shiki でシンタックスハイライト（`src/libs/highlight-article.ts`）、見出しから目次を生成（`src/libs/renderToc.ts`）
3. `generateStaticParams()` によるブログ記事の静的プリレンダリング

### 主要ディレクトリ

- `src/app/` — Next.js App Router のページとレイアウト
  - `blog/[id]/page.tsx` — ブログ記事詳細ページ（記事 HTML の取得・加工）
  - `page.tsx` — ホームページ（タグフィルタリング付き）
  - `about/page.tsx` — アバウトページ
- `src/components/` — 再利用可能な React コンポーネント（Header, Filter, ArticleCard, TocNav, ThemeSwitcher 等）
- `src/libs/` — サービス連携・ユーティリティ
  - `microcms.ts` — microCMS クライアント設定と型付き API 取得関数
  - `highlight-article.ts` — パース済み HTML に Shiki ハイライトを適用
  - `shiki.ts` — Shiki ハイライターのシングルトンインスタンス
  - `renderToc.ts` — 記事の見出しから目次を生成
  - `query.ts` — URL クエリパラメータのヘルパー
- `src/types/content.ts` — 共有 TypeScript 型定義（`Tag`, `Article`, `About`）

### スタイリング

- **Tailwind CSS 4** + PostCSS。ダークモードは `next-themes` + CSS カスタムプロパティで実現
- カスタムフォント: IBM Plex Sans JP / IBM Plex Mono（`@fontsource` 経由）
- グローバルスタイルと CSS 変数は `src/app/globals.css` に定義

### パスエイリアス

`@/*` は `./src/*` に解決される（`tsconfig.json` で設定）。

### デプロイ

Vercel にデプロイ。`vercel.json` でインストールコマンドを `npm install --legacy-peer-deps` に設定。
