// src/app/sitemap.ts

import { MetadataRoute } from 'next';
import { FileSystemProjectRepository } from '@/infrastructure/repositories/file-system/fileSystemProjectRepository';
import { FileSystemBlogPostRepository } from '@/infrastructure/repositories/file-system/fileSystemBlogPostRepository';
import { FileSystemIllustrationRepository } from '@/infrastructure/repositories/file-system/fileSystemIllustrationRepository';
import { GetAllProjectsUseCase } from '@/use-cases/project/getAllProjectsUseCase';
import { GetAllBlogPostsUseCase } from '@/use-cases/blogPost/getAllBlogPostsUseCase';
import { GetAllIllustrationsUseCase } from '@/use-cases/illustration/getAllIllustrationsUseCase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://spiral987.vercel.app'; // あなたのサイトのURL

  // リポジトリとユースケースの初期化
  const projectRepo = new FileSystemProjectRepository();
  const blogRepo = new FileSystemBlogPostRepository();
  const illustrationRepo = new FileSystemIllustrationRepository();

  const getAllProjects = new GetAllProjectsUseCase(projectRepo);
  const getAllBlogPosts = new GetAllBlogPostsUseCase(blogRepo);
  const getAllIllustrations = new GetAllIllustrationsUseCase(illustrationRepo);

  // データの取得
  const projects = await getAllProjects.execute();
  const blogPosts = await getAllBlogPosts.execute();
  const illustrations = await getAllIllustrations.execute();

  // 静的ページの定義
  const staticRoutes = [
    '',
    '/projects',
    '/illustrations',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  // プロジェクト詳細ページ
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // ブログ詳細ページ
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.value}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // イラスト詳細ページ
  const illustrationRoutes = illustrations.map((illustration) => ({
    url: `${baseUrl}/illustrations/${illustration.id}`,
    lastModified: illustration.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...illustrationRoutes,
  ];
}