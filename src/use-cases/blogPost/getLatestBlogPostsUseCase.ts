// src/use-cases/blog/getLatestBlogPostsUseCase.ts

import { BlogPost } from '../../domain/entities/blogPost';
import { IBlogPostRepository } from '../../infrastructure/repositories/blogPostRepository';

/**
 * トップページに表示するため、最新のブログ記事を取得するためのユースケース。
 * 指定された件数（デフォルトは3件）の最新記事を返します。
 */
export class GetLatestBlogPostsUseCase {
  private readonly blogPostRepository: IBlogPostRepository;

  constructor(blogPostRepository: IBlogPostRepository) {
    this.blogPostRepository = blogPostRepository;
  }

  /**
   * ユースケースを実行し、最新のブログ記事を取得します。
   * @param count - 取得する記事の最大件数（デフォルトは3）。
   * @returns 最新のBlogPostエンティティの配列を解決するPromise。
   */
  async execute(count: number = 3): Promise<BlogPost[]> {
    const allPosts = await this.blogPostRepository.getAllBlogPosts();

    // 1. 公開されている記事のみにフィルタリング (isDraftがfalse)
    const publishedPosts = allPosts.filter(post => !post.isDraft); // 下書きではない記事のみ
    // 2. 作成日時で新しい順にソート
    const sortedPosts = publishedPosts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    // 3. 指定された件数に制限
    return sortedPosts.slice(0, count); // 指定された件数のみ返す
  }
}