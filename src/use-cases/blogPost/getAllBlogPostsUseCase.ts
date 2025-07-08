// src/use-cases/blog/getAllBlogPostsUseCase.ts

import { BlogPost } from '../../domain/entities/blogPost';
import { IBlogPostRepository } from '../../infrastructure/repositories/blogPostRepository';

/**
 * すべてのブログ記事を取得するためのユースケース。
 * アプリケーション固有のビジネスロジック（この場合は公開されたすべての記事をソートして取得する）をカプセル化します。
 */
export class GetAllBlogPostsUseCase {
  private readonly blogPostRepository: IBlogPostRepository;

  constructor(blogPostRepository: IBlogPostRepository) {
    this.blogPostRepository = blogPostRepository;
  }

  /**
   * ユースケースを実行し、すべてのブログ記事を取得します。
   * @returns BlogPostエンティティの配列を解決するPromise。
   */
  async execute(): Promise<BlogPost[]> {
    const allPosts = await this.blogPostRepository.getAllBlogPosts();

    // 1. 公開されている記事のみにフィルタリング
    const publishedPosts = allPosts.filter(post => !post.isDraft);
    // 2. 作成日時で新しい順にソート
    const sortedPosts = publishedPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

    return sortedPosts;
  }
}