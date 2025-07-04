import { isValidBlogPost, BlogPost } from '../../entities/blogPost';
import { Slug } from '../../value-objects/slug'; // Slugバリュー

const createValidSlug = (value: string = 'test-blog-post'): Slug => {
  return Slug.create(value); 
};

describe('BlogPost Entity Validation', () => {
  let validBlogPostData: BlogPost;

  // 各テストの前に、有効なブログ記事のデータを初期化する
  beforeEach(() => {
    validBlogPostData = {
      id: 'post-123',
      title: 'My First Blog Post',
      slug: Slug.create('my-first-blog-post'), // 有効なSlugバリューオブジェクト
      content: 'This is the content of the blog post.',
      publishedAt: new Date(),
      updatedAt: new Date(),
      tags: ['introduction', 'first-post'],
      isDraft: false,
    };
  });

  // 1. 有効なデータで有効と判断されるか
  test('should return true for a valid blog post', () => {
    expect(isValidBlogPost(validBlogPostData)).toBe(true);
  });

  // 2. 無効なデータで無効と判断されるか
  test('should return false if blog post title is empty', () => {
    const invalidPost = { ...validBlogPostData, title: '' };
    expect(isValidBlogPost(invalidPost)).toBe(false);
  });

  test('should return false if blog post title is only whitespace',()=>{
    const invalidPost = { ...validBlogPostData, title: '   ' }; // 空白のみ
    expect(isValidBlogPost(invalidPost)).toBe(false);
  });

  test('should return false if blog post content is empty', () => {
    const invalidPost = { ...validBlogPostData, content: '   ' }; // 空白のみ
    expect(isValidBlogPost(invalidPost)).toBe(false);
  });

  test('should return false if slug is invalid', () => {
    const invalidSlug = 'Invalid Slug'; // 無効なSlug
    const postWithInvalidSlug: BlogPost = { ...validBlogPostData,
         slug: {value : invalidSlug} as Slug };
    expect(isValidBlogPost(postWithInvalidSlug)).toBe(false);
  });

    // オプションのプロパティのテスト
  test('should return true if tags are missing (optional field)', () => {
    const postWithoutTags = { ...validBlogPostData, tags: undefined };
    expect(isValidBlogPost(postWithoutTags)).toBe(true);
  });

  test('should return true if isDraft is true (optional field)', () => {
    const draftPost = { ...validBlogPostData, isDraft: true };
    expect(isValidBlogPost(draftPost)).toBe(true);
  });

});