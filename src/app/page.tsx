// src/app/page.tsx

import { GetFeaturedProjectsUseCase } from '@/use-cases/project/getFeaturedProjectsUseCase';
import { GetLatestBlogPostsUseCase } from '@/use-cases/blogPost/getLatestBlogPostsUseCase';
//import { InMemoryProjectRepository } from '@/infrastructure/repositories/in-memory/inMemoryProjectRepository';
import { FileSystemProjectRepository } from '@/infrastructure/repositories/file-system/fileSystemProjectRepository';
import { InMemoryBlogPostRepository } from '@/infrastructure/repositories/in-memory/inMemoryBlogPostRepository';
import { CONTACT_INFO } from '@/lib/constants';

// 作成したコンポーネントをインポート
import { ProjectCard } from '@/app/components/ProjectCard';
import { BlogPostCard } from '@/app/components/BlogPostCard';

export default async function HomePage() {
  //const projectRepository = new InMemoryProjectRepository();
  const projectRepository = new FileSystemProjectRepository();
  const blogPostRepository = new InMemoryBlogPostRepository();

  const getFeaturedProjectsUseCase = new GetFeaturedProjectsUseCase(projectRepository);
  const getLatestBlogPostsUseCase = new GetLatestBlogPostsUseCase(blogPostRepository);

  const featuredProjects = await getFeaturedProjectsUseCase.execute();
  const latestBlogPosts = await getLatestBlogPostsUseCase.execute(3); // 最新3件に

  // 自己紹介文を更新
  const bio = "Spiral987のサイトへようこそ。私は、ソフトウェアエンジニアであり、イラストレーターです。ここでは、私の注目作品や最新のブログ記事を紹介しています。";

  return (
    // Tailwind CSSのクラスを適用
    <div className="max-w-4xl mx-auto">
      {/* 自己紹介セクション */}
      <section className="text-center my-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">{bio}</p>
        <div className="mt-6 flex justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a href={`mailto:${CONTACT_INFO.email.value}`} className="hover:text-blue-500 dark:hover:text-blue-400">
            {CONTACT_INFO.email.value}
          </a>
          {CONTACT_INFO.githubUrl && (
            <a href={CONTACT_INFO.githubUrl.value} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 dark:hover:text-gray-200">
              GitHub
            </a>
          )}
        </div>
      </section>

      {/* 注目作品セクション */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
          注目作品
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-gray-500">まだ注目作品はありません。</p>
          )}
        </div>
      </section>

      {/* 最新ブログ記事セクション */}
      <section>
        <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
          最新のつぶやき
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogPosts.length > 0 ? (
            latestBlogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-500">まだブログ記事はありません。</p>
          )}
        </div>
      </section>
    </div>
  );
}