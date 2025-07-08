// src/use-cases/__tests__/blog/getAllBlogPostsUseCase.test.ts

import { GetAllBlogPostsUseCase } from '../../blogPost/getAllBlogPostsUseCase';
import { IBlogPostRepository } from '../../../infrastructure/repositories/blogPostRepository';
import { BlogPost } from '../../../domain/entities/blogPost';
import { Slug } from '../../../domain/value-objects/slug';

describe('GetAllBlogPostsUseCase', () => {
  let mockBlogPostRepository: jest.Mocked<IBlogPostRepository>;
  let getAllBlogPostsUseCase: GetAllBlogPostsUseCase;

  const dummyPosts: BlogPost[] = [
    {
      id: '1', title: 'Old Post A', slug: Slug.create('old-post-a'), content: 'Content A',
      publishedAt: new Date('2024-01-01T10:00:00Z'), updatedAt: new Date('2024-01-01T10:00:00Z'),
      isDraft: false, tags: ['tag1']
    },
    {
      id: '2', title: 'New Post B', slug: Slug.create('new-post-b'), content: 'Content B',
      publishedAt: new Date('2024-03-01T10:00:00Z'), updatedAt: new Date('2024-03-01T10:00:00Z'),
      isDraft: false, tags: ['tag2']
    },
    {
      id: '3', title: 'Draft Post C', slug: Slug.create('draft-post-c'), content: 'Content C',
      publishedAt: new Date('2024-05-01T10:00:00Z'), updatedAt: new Date('2024-05-01T10:00:00Z'),
      isDraft: true, tags: ['tag3'] // 下書き
    },
    {
      id: '4', title: 'Newest Post D', slug: Slug.create('newest-post-d'), content: 'Content D',
      publishedAt: new Date('2024-04-01T10:00:00Z'), updatedAt: new Date('2024-04-01T10:00:00Z'),
      isDraft: false, tags: ['tag4']
    },
  ];

  beforeEach(() => {
    mockBlogPostRepository = {
      getAllBlogPosts: jest.fn(),
      getBlogPostBySlug: jest.fn(),
    };
    getAllBlogPostsUseCase = new GetAllBlogPostsUseCase(mockBlogPostRepository);
  });

  test('should be defined', () => {
    expect(getAllBlogPostsUseCase).toBeDefined();
  });

  test('should return all published blog posts sorted by publishedAt in descending order', async () => {
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue(dummyPosts);

    const result = await getAllBlogPostsUseCase.execute();

    // 期待される結果: すべての公開済み記事が新しい順 (id: 4, 2, 1 の順)
    const expectedPosts = [
      dummyPosts[3], // Newest Post D (2024-04-01)
      dummyPosts[1], // New Post B (2024-03-01)
      dummyPosts[0], // Old Post A (2024-01-01)
    ];

    expect(result).toEqual(expectedPosts);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });

  test('should not return draft posts', async () => {
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue(dummyPosts);

    const result = await getAllBlogPostsUseCase.execute();

    // 下書き(id: 3)が除外されていることを確認
    expect(result.some(post => post.id === '3')).toBe(false);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if no published blog posts are found', async () => {
    const onlyDrafts: BlogPost[] = dummyPosts.filter(p => p.isDraft); // 下書きのみのリスト
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue(onlyDrafts);

    const result = await getAllBlogPostsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if the repository returns an empty list', async () => {
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue([]);

    const result = await getAllBlogPostsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });
});