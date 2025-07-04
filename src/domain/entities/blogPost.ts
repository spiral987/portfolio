// src/domain/entities/blogPost.ts

import { Slug } from '../value-objects/slug'; // 後で定義するSlugバリューオブジェクトをインポート

/**
 * ブログ記事の情報を表すエンティティ
 */
export interface BlogPost {
  id: string;              // 一意の識別子
  title: string;           // 記事のタイトル
  slug: Slug;              // URLフレンドリーなユニークな識別子 (Slugバリューオブジェクト)
  content: string;         // 記事の本文 (Markdown形式などを想定)
  publishedAt: Date;       // 公開日時
  updatedAt: Date;         // 更新日時
  tags?: string[];         // 記事に関連するタグ (オプション)
  isDraft?: boolean;       // 下書き状態かどうか (オプション、デフォルトはfalse)
}

/**
 * BlogPostオブジェクトが有効であるかを検証する関数
 */
export function isValidBlogPost(post: BlogPost): boolean {
  // タイトルとコンテンツが空でないこと、slugが有効であることを検証
  return post.title.trim() !== '' &&
         post.content.trim() !== '' &&
         // slugはSlugバリューオブジェクト内で検証されるため、ここではisValidSlugを呼び出す
         Slug.isValid(post.slug.value); // Slugクラスのスタティックメソッドを使う場合
}