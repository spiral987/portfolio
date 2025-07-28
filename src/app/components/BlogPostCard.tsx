import { BlogPost } from '@/domain/entities/blogPost';
import Link from 'next/link';

export const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <Link href={`/blog/${post.slug.value}`} className="block border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-zinc-800">
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{post.title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
        {post.content.substring(0, 100)}...
      </p>
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-white">
        <span>{post.publishedAt.toLocaleDateString()}</span>
        <span className="text-blue-500 font-semibold">続きを読む →</span>
      </div>
  </Link>
);