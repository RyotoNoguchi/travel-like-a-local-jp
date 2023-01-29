
# WordPress × NEXT.JSでブログサイトを作ろう

## 無料でWordPressをホスティングする

1. [YouTube](https://www.youtube.com/watch?v=7uNvYHyBNa0&t=1462s)を参考にして、[InfinityFree](https://app.infinityfree.net/)でWordPressサイトを作成する
2. ドメインは[お名前.com](https://www.onamae.com/)でとりあえず無料にて取得する
3. YouTubeの動画で消化いされているGoDaddyでネームサーバーをInfinityFreeのものに変更するには、[お名前.com > ドメイン設定 > 他のネームサーバーを利用 > ネームサーバー情報を入力](https://gyazo.com/f7d3ee18abb6f31a2d46fe95dd9d02c4)に入力
4. SSLを有効化するには
   1. InfinityFreeのコントロールパネルの[**SSL/TSL**](https://gyazo.com/bb001dfac69fea1c90414a628316cece)押下
   2. [**ConfigureSSL**](https://gyazo.com/704f35d990dc4722d902722f8c427cd6)押下
   3. [**Generate Key / CSR**](https://gyazo.com/ffa71af46fa2f0595c43358f8fd41898)押下
   4. [**Free SSL Certificates**](https://gyazo.com/95e0832880a094ca3ab20123def2d337)押下
   5. ドメインと入力してこの画面の**Current Destination**のステータスが緑色の[**Ready**](https://gyazo.com/3b48a8e338b0cc91dfc3570c5f3b460d)になっておらず、赤色の**Not Ready**になっていたらCloudFlareのダッシュボードのメニュー[**「DNS」のDNS Management for ****内のAdd record**](https://gyazo.com/12cdf216f6041be8fbd78abc1d636544)を押下
   6. **Type**は**CNAME**「5.」の**Source**の値を**Name**に、**Destination**の値を**Target**に入れ、**Proxy Status**は**Only DNS**に切り替え、[**Save**](https://gyazo.com/bcd7b59af72a743806da3a0bfff4bf8a)押下
   7. Really Simple SSLに戻り、更新すると**有効化**が活性状態になる

## プラグイン「WPGraphQL」をインストール

1. WordPressのプラグインの新規追加で「WPGraphQL」で検索して出てくる[これ](https://gyazo.com/8a09807b35f532bde95310e1b3c98507)をインストール。 ※WordPressの言語設定が日本語になっていると**GraphQL IDE**がエラーになって無限Loading状態になる

## Next.js × TypeScriptアプリケーション環境構築

1. `npx create-next-app {rootDirectoryName} --typescript`
2. `yarn add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`（[ESLintの導入](https://mo-gu-mo-gu.com/create-next-app-typescript/)）
3. `yarn add -D prettier eslint-config-prettier eslint-plugin-prettier`（[Prettier導入](https://mo-gu-mo-gu.com/create-next-app-typescript/#:~:text=%E3%81%AF%E3%81%93%E3%81%A1%E3%82%89%E3%81%A7%E3%81%99%E3%80%82-,Prettier%E5%B0%8E%E5%85%A5,-Prettier%E3%81%AF%E3%80%81%E3%82%B3%E3%83%BC%E3%83%89)）

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## axiosを使ったGraphQL APIコールの仕方

- https://rapidapi.com/guides/graphql-axios

## Getting Started

First, run the development server:

```bash
npm run dev

# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## メモ

- [WordPressのプレビューモード実装](https://tsh.io/blog/headless-wordpress-as-an-api-for-a-next-js-application/)
- [The Next.js WordPress Starter](https://webdevstudios.github.io/nextjs-wordpress-starter/)

