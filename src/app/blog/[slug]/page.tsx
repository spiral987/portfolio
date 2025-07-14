// src/app/blog/[slug]/page.tsx

import { GetBlogPostBySlugUseCase } from '@/use-cases/blogPost/getBlogPostBySlugUseCase';
import { FileSystemBlogPostRepository } from '@/infrastructure/repositories/file-system/fileSystemBlogPostRepository';
import { notFound } from 'next/navigation';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blogPostRepository = new FileSystemBlogPostRepository();
  const getBlogPostBySlugUseCase = new GetBlogPostBySlugUseCase(blogPostRepository);
  const post = await getBlogPostBySlugUseCase.execute(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
        {post.title}
      </h1>
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        <span>公開日: {post.publishedAt.toLocaleDateString()}</span>
      </div>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}