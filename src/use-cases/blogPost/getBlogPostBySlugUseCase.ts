// src/use-cases/blog/getBlogPostBySlugUseCase.ts

import { BlogPost } from '../../domain/entities/blogPost';
import { IBlogPostRepository } from '../../infrastructure/repositories/blogPostRepository';

/**
 * 特定のスラッグを持つブログ記事の詳細を取得するためのユースケース。
 */
export class GetBlogPostBySlugUseCase {
  private readonly blogPostRepository: IBlogPostRepository;

  constructor(blogPostRepository: IBlogPostRepository) {
    this.blogPostRepository = blogPostRepository;
  }

  /**
   * ユースケースを実行し、指定されたスラッグのブログ記事を取得します。
   * @param slug - 取得するブログ記事のスラッグ文字列。
   * @returns 指定されたスラッグのBlogPostエンティティ、または見つからない場合はnullを解決するPromise。
   */
  async execute(slug: string): Promise<BlogPost | null> {
    console.log(`Executing GetBlogPostBySlugUseCase for slug: ${slug}`);
    const post = await this.blogPostRepository.getBlogPostBySlug(slug);

    // 必要であれば、ここで記事が公開済みであるか、ユーザーに閲覧権限があるかなどの追加チェックを実装できます。
    if (post && post.isDraft) {
        return null; // 下書き記事は取得できないようにするビジネスルール
    }

    return post;
  }
}