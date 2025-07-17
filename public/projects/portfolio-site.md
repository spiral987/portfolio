---
id: '5'
title: 'ポートフォリオサイト'
description: 'Next.jsとクリーンアーキテクチャで構築した個人ポートフォリオサイトです。'
images:
  - url: '/images/projects/portfolio_image1.png'
    altText: 'ポートフォリオサイトのスクリーンショット1'
techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel']
projectUrl: 'https://portfolio-spiral987-c31cbce1.vercel.app/'
githubUrl: 'https://github.com/spiral987/portfolio'
isFeatured: false
createdAt: '2025-07-04T00:00:00Z'
updatedAt: '2024-07-16T00:00:00Z'
---

## 概要
このサイトは、自身のプロジェクトをまとめるために制作しました。

## 機能
プロジェクトページ、イラストページ、ブログ、連絡先をのせています。

## 苦労
1. vercelでNext.jsのフレームワークを選択するのを忘れていた！
2. GitHub上のフォルダの大文字、小文字の間違いはローカルで正しかったとしてもpushで変更されないため、気づかないことが多かった。
3. markdownの見出しなどの記法が適用されない問題に苦戦した。tailwindcssのプラグイン"typography"[^1]の導入がうまくいっていなかったのが原因で、GitHubページのReadmeをちゃんと読むことを学んだ。

[^1]: https://github.com/tailwindlabs/tailwindcss-typography

## 学んだこと
* クリーンアーキテクチャの学習のため、domain層、useCase層、infrastructure層、presentation層に分けて制作した。小規模プロジェクトのため、圧倒的メリットを感じたわけではなかったが、設計の基礎を学べた。
* Git LFSを導入し、サイズが大きいファイルの扱い方を学んだ。
* SSRとSSGの違いを理解。今回はまだページが少ないので静的生成で落ち着いた。
* Git Rebaseを初めてやってみた。コミット履歴が繋がってなかったからrebaseで履歴ごと改ざんした、というイメージでやったけど違うかもしれない。
* Geminiは最新の情報を知らないので、エラーを吐いたらとりあえず使用しているものの最新の使い方を調べておくといい。