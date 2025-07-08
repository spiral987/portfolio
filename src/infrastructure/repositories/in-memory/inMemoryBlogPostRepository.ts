// src/infrastructure/repositories/in-memory/inMemoryBlogPostRepository.ts

import { IBlogPostRepository } from '../blogPostRepository';
import { BlogPost, isValidBlogPost } from '../../../domain/entities/blogPost';
import { Slug } from '../../../domain/value-objects/slug';

// ダミーデータ（開発用）
const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Next.jsで始めるポートフォリオサイト構築',
    slug: Slug.create('nextjs-portfolio-kouchiku'),
    content: `
# Next.jsで始めるポートフォリオサイト構築

Next.jsを使って、いよいよ自分のポートフォリオサイトを構築し始めました。
Reactの知識を活かしつつ、サーバーサイドレンダリングや静的サイト生成の恩恵を受けられるのが魅力です。

![Next.js Logo](https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Next.js+Logo)

クリーンアーキテクチャを意識して開発を進めているので、長期的なメンテナンス性やテスト容易性が高いサイトになる予定です。

## 学んだこと

- App Router の使い方
- サーバーコンポーネントとクライアントコンポーネントの違い
- データフェッチングの新しい方法

など、学びが多いです。
`,
    publishedAt: new Date('2024-06-25T10:00:00Z'),
    updatedAt: new Date('2024-06-25T10:00:00Z'),
    tags: ['Next.js', 'Web開発', 'クリーンアーキテクチャ'],
    isDraft: false,
  },
  {
    id: 'blog-2',
    title: 'TypeScriptの魅力と実践',
    slug: Slug.create('typescript-no-miryoku-to-jissen'),
    content: `
# TypeScriptの魅力と実践

JavaScriptに型を追加するTypeScript。
開発初期のエラー発見や、大規模プロジェクトでの保守性の高さが最大の魅力です。

## 型の恩恵

- コード補完の強化
- リファクタリングの安全性向上
- 可読性の向上

`,
    publishedAt: new Date('2024-06-20T14:30:00Z'),
    updatedAt: new Date('2024-06-20T14:30:00Z'),
    tags: ['TypeScript', 'プログラミング'],
    isDraft: false,
  },
  {
    id: 'blog-3',
    title: '初めてのJestテスト',
    slug: Slug.create('hajimete-no-jest-test'),
    content: `
# 初めてのJestテスト

最近、単体テストの重要性を知り、Jestを使ってテストコードを書き始めました。
最初は難しく感じましたが、今では開発に欠かせないツールです。

## Jestの基本

- describeとtest
- expectを使ったアサーション
- モックの利用

`,
    publishedAt: new Date('2024-06-15T11:00:00Z'),
    updatedAt: new Date('2024-06-15T11:00:00Z'),
    tags: ['テスト', 'Jest'],
    isDraft: false,
  },
  {
    id: 'blog-4',
    title: '下書き記事：新しいデザイン案',
    slug: Slug.create('shita-gaki-atarashii-design-an'),
    content: 'これはまだ公開されていない下書きの記事です。',
    publishedAt: new Date('2024-07-01T09:00:00Z'),
    updatedAt: new Date('2024-07-01T09:00:00Z'),
    tags: ['デザイン', '下書き'],
    isDraft: true, // ★下書き記事
  },
];

/**
 * メモリ上にブログ記事データを保持するインメモリリポジトリの実装。
 * IBlogPostRepositoryインターフェースを実装します。
 * 開発やテストに便利です。
 */
export class InMemoryBlogPostRepository implements IBlogPostRepository {
  private blogPosts: BlogPost[] = [];

  constructor() {
    // ダミーデータを初期化時にコピー（実際のデータを直接変更しないように）
    this.blogPosts = DUMMY_BLOG_POSTS.map(p => {
      // バリデーションを通じて有効なBlogPostインスタンスを作成するように変換
      if (!isValidBlogPost(p)) {
        throw new Error(`Invalid dummy blog post data: ${p.title}`);
      }
      return p;
    });
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    // 実際のアプリケーションでは、ここでデータベースクエリなどを実行します。
    // 現時点では、メモリ上のデータを返します。
    // 通常、ブログ記事は新しい順に表示されるため、ここでソートするロジックを含めることができますが、
    // ユースケース側でソートする場合はここでは行いません。
    // 今回のユースケース (GetLatestBlogPostsUseCase, GetAllBlogPostsUseCase) では
    // ユースケース側でソートとフィルタリングを行うので、ここでは単純にすべて返します。
    return Promise.resolve(this.blogPosts);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    // this.blogPosts 配列の中から、引数で渡された `slug` と一致するブログ記事を探します。
    // Slugバリューオブジェクトの `equals` メソッドを使って比較します。
    const post = this.blogPosts.find(p => p.slug.value === slug);

    // 見つかった記事、または見つからなかった場合は null を Promise でラップして返します。
    return Promise.resolve(post || null);
  }
}