// src/app/blog/page.tsx

import { GetAllBlogPostsUseCase } from '@/use-cases/blogPost/getAllBlogPostsUseCase';
import { FileSystemBlogPostRepository } from '@/infrastructure/repositories/file-system/fileSystemBlogPostRepository';
import { BlogPostCard } from '@/app/components/BlogPostCard';

export default async function BlogPage() {
  const blogPostRepository = new FileSystemBlogPostRepository();
  const getAllBlogPostsUseCase = new GetAllBlogPostsUseCase(blogPostRepository);
  const allPosts = await getAllBlogPostsUseCase.execute();

  return (
    <main>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
          Blog
        </h1>
        <div className="grid grid-cols-1 gap-8">
          {allPosts.length > 0 ? (
            allPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-500">まだ記事はありません。</p>
          )}
        </div>
      </div>
    </main>
  );
}