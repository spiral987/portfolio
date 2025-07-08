// src/use-cases/__tests__/blog/getLatestBlogPostsUseCase.test.ts

import { GetLatestBlogPostsUseCase } from '../../blogPost/getLatestBlogPostsUseCase';
import { IBlogPostRepository } from '../../../infrastructure/repositories/blogPostRepository';
import { BlogPost } from '../../../domain/entities/blogPost';
import { Slug } from '../../../domain/value-objects/slug';

describe('GetLatestBlogPostsUseCase', () => {
  let mockBlogPostRepository: jest.Mocked<IBlogPostRepository>;
  let getLatestBlogPostsUseCase: GetLatestBlogPostsUseCase;

  // テスト用のダミーブログ記事データ
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
      id: '3', title: 'Newest Post C', slug: Slug.create('newest-post-c'), content: 'Content C',
      publishedAt: new Date('2024-05-01T10:00:00Z'), updatedAt: new Date('2024-05-01T10:00:00Z'),
      isDraft: false, tags: ['tag3']
    },
    {
      id: '4', title: 'Draft Post D', slug: Slug.create('draft-post-d'), content: 'Content D',
      publishedAt: new Date('2024-06-01T10:00:00Z'), updatedAt: new Date('2024-06-01T10:00:00Z'),
      isDraft: true, tags: ['tag4'] // 下書き
    },
    {
      id: '5', title: 'Oldest Post E', slug: Slug.create('oldest-post-e'), content: 'Content E',
      publishedAt: new Date('2023-12-01T10:00:00Z'), updatedAt: new Date('2023-12-01T10:00:00Z'),
      isDraft: false, tags: ['tag5']
    },
  ];

  beforeEach(() => {
    mockBlogPostRepository = {
      getAllBlogPosts: jest.fn(),
      getBlogPostBySlug: jest.fn(),
    };
    getLatestBlogPostsUseCase = new GetLatestBlogPostsUseCase(mockBlogPostRepository);
  });

  test('should be defined', () => {
    expect(getLatestBlogPostsUseCase).toBeDefined();
  });

  test('should return the latest 3 published blog posts sorted by publishedAt in descending order by default', async () => {
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue(dummyPosts);

    const result = await getLatestBlogPostsUseCase.execute();

    // 期待される結果: 最新の公開済み記事3件 (id: 3, 2, 1 の順)
    const expectedPosts = [
      dummyPosts[2], // Newest Post C
      dummyPosts[1], // New Post B
      dummyPosts[0], // Old Post A
    ];

    expect(result).toEqual(expectedPosts);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });

  test('should return the specified number of latest published blog posts', async () => {
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue(dummyPosts);

    const result = await getLatestBlogPostsUseCase.execute(2); // 最新2件を取得

    // 期待される結果: 最新の公開済み記事2件 (id: 3, 2 の順)
    const expectedPosts = [
      dummyPosts[2], // Newest Post C
      dummyPosts[1], // New Post B
    ];

    expect(result).toEqual(expectedPosts);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });

  test('should not return draft posts', async () => {
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue(dummyPosts);

    const result = await getLatestBlogPostsUseCase.execute(5); // 5件取得しても下書きは含まれない

    // 下書き(id: 4)が除外されていることを確認
    expect(result.some(post => post.id === '4')).toBe(false);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if no published blog posts are found', async () => {
    const onlyDrafts: BlogPost[] = dummyPosts.filter(p => p.isDraft); // 下書きのみのリスト
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue(onlyDrafts);

    const result = await getLatestBlogPostsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if the repository returns an empty list', async () => {
    mockBlogPostRepository.getAllBlogPosts.mockResolvedValue([]);

    const result = await getLatestBlogPostsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockBlogPostRepository.getAllBlogPosts).toHaveBeenCalledTimes(1);
  });
});