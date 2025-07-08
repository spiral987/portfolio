// src/infrastructure/repositories/blogPostRepository.ts

import { BlogPost } from '../../domain/entities/blogPost'; // BlogPostエンティティをインポート

/**
 * ブログ記事データを取得・管理するためのリポジトリインターフェース。
 * このインターフェースは、ユースケースがデータソースに依存しないように抽象化を提供します。
 */

export interface IBlogPostRepository {
  /**
   * すべてのブログ記事を取得します。
   * 通常、作成日時の降順（新しい順）でソートされます。
   * @returns BlogPostエンティティの配列を解決するPromise。
   */
  getAllBlogPosts(): Promise<BlogPost[]>;

  /**
   * 指定されたスラッグのブログ記事を取得します。
   * @param slug - 取得するブログ記事のスラッグ（Urlフレンドリーな識別子）。
   * @returns 指定されたスラッグのBlogPostエンティティ、または見つからない場合はnullを解決するPromise。
   */
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;

  // 必要であれば、以下のようなメソッドも追加できます（例：ブログ記事作成、更新、削除）
  // createBlogPost(post: BlogPost): Promise<BlogPost>;
  // updateBlogPost(post: BlogPost): Promise<BlogPost>;
  // deleteBlogPost(id: string): Promise<void>;
}