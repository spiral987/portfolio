// src/use-cases/__tests__/blog/getBlogPostBySlugUseCase.test.ts

import { GetBlogPostBySlugUseCase } from '../../blogPost/getBlogPostBySlugUseCase';
import { IBlogPostRepository } from '../../../infrastructure/repositories/blogPostRepository';
import { BlogPost } from '../../../domain/entities/blogPost';
import { Slug } from '../../../domain/value-objects/slug';

describe('GetBlogPostBySlugUseCase', () => {
  let mockBlogPostRepository: jest.Mocked<IBlogPostRepository>;
  let getBlogPostBySlugUseCase: GetBlogPostBySlugUseCase;

  // テスト用のダミーブログ記事データ
  const dummyPublishedPost: BlogPost = {
    id: '1', title: 'Published Post', slug: Slug.create('published-post'), content: 'Published content',
    publishedAt: new Date('2024-04-15T10:00:00Z'), updatedAt: new Date('2024-04-15T10:00:00Z'),
    isDraft: false, tags: ['publish']
  };

  const dummyDraftPost: BlogPost = {
    id: '2', title: 'Draft Post', slug: Slug.create('draft-post'), content: 'Draft content',
    publishedAt: new Date('2024-05-01T10:00:00Z'), updatedAt: new Date('2024-05-01T10:00:00Z'),
    isDraft: true, tags: ['draft']
  };

  beforeEach(() => {
    mockBlogPostRepository = {
      getAllBlogPosts: jest.fn(),
      getBlogPostBySlug: jest.fn(), // getBlogPostBySlug メソッドをモック
    };
    getBlogPostBySlugUseCase = new GetBlogPostBySlugUseCase(mockBlogPostRepository);
  });

  test('should be defined', () => {
    expect(getBlogPostBySlugUseCase).toBeDefined();
  });

  test('should return the published blog post with the specified slug', async () => {
    mockBlogPostRepository.getBlogPostBySlug.mockResolvedValue(dummyPublishedPost);

    const result = await getBlogPostBySlugUseCase.execute('published-post');

    expect(result).toEqual(dummyPublishedPost);
    expect(mockBlogPostRepository.getBlogPostBySlug).toHaveBeenCalledTimes(1);
    expect(mockBlogPostRepository.getBlogPostBySlug).toHaveBeenCalledWith('published-post');
  });

  test('should return null if the blog post is not found', async () => {
    mockBlogPostRepository.getBlogPostBySlug.mockResolvedValue(null);

    const result = await getBlogPostBySlugUseCase.execute('non-existent-slug');

    expect(result).toBeNull();
    expect(mockBlogPostRepository.getBlogPostBySlug).toHaveBeenCalledTimes(1);
    expect(mockBlogPostRepository.getBlogPostBySlug).toHaveBeenCalledWith('non-existent-slug');
  });

  test('should return null if the blog post found is a draft', async () => {
    mockBlogPostRepository.getBlogPostBySlug.mockResolvedValue(dummyDraftPost);

    const result = await getBlogPostBySlugUseCase.execute('draft-post');

    expect(result).toBeNull(); // 下書きなのでnullが返されることを期待
    expect(mockBlogPostRepository.getBlogPostBySlug).toHaveBeenCalledTimes(1);
    expect(mockBlogPostRepository.getBlogPostBySlug).toHaveBeenCalledWith('draft-post');
  });
});