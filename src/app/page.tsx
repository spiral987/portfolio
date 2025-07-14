// src/app/page.tsx

import { GetFeaturedProjectsUseCase } from '@/use-cases/project/getFeaturedProjectsUseCase';
import { GetFeaturedIllustrationsUseCase } from '@/use-cases/illustration/getFeaturedIllustrationsUseCase';
import { GetContactInfoUseCase } from '@/use-cases/contact/getContactInfoUseCase';
import { GetLatestBlogPostsUseCase } from '@/use-cases/blogPost/getLatestBlogPostsUseCase';
import { FileSystemProjectRepository } from '@/infrastructure/repositories/file-system/fileSystemProjectRepository';
import { FileSystemIllustrationRepository } from '@/infrastructure/repositories/file-system/fileSystemIllustrationRepository';
import { FileSystemContactRepository } from '@/infrastructure/repositories/file-system/fileSystemContactRepository';
import { FileSystemBlogPostRepository } from '@/infrastructure/repositories/file-system/fileSystemBlogPostRepository';

// 作成したコンポーネントをインポート
import { ProjectCard } from '@/app/components/ProjectCard';
import { BlogPostCard } from '@/app/components/BlogPostCard';
import { IllustrationCard } from './components/IllustrationCard';

export default async function HomePage() {
  const projectRepository = new FileSystemProjectRepository();
  const illustrationRepository = new FileSystemIllustrationRepository();
  const blogPostRepository = new FileSystemBlogPostRepository();
  const contactRepository = new FileSystemContactRepository();

  const getFeaturedProjectsUseCase = new GetFeaturedProjectsUseCase(projectRepository);
  const getFeaturedIllustrationsUseCase = new GetFeaturedIllustrationsUseCase(illustrationRepository);
  const getLatestBlogPostsUseCase = new GetLatestBlogPostsUseCase(blogPostRepository);
  const getContactInfoUseCase = new GetContactInfoUseCase(contactRepository);

  const featuredProjects = await getFeaturedProjectsUseCase.execute();
  const featuredIllustrations = await getFeaturedIllustrationsUseCase.execute();

  const latestBlogPosts = await getLatestBlogPostsUseCase.execute(3); // 最新3件に
  const contactInfo = await getContactInfoUseCase.execute();

  const bio = "spiralです。大学では情報学・ヒューマンコンピュータインタラクションを専攻し、個人ではアプリケーション制作やイラスト制作を行っています。ここには私の作品やブログ記事、連絡先情報などが掲載されています。";

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className ="text-4xl font-black tracking-wider mb-8 text-center">
        spiral&#39;s Portfolio
      </h1>

      <section className="text-center my-12 p-8 rounded-xl">
        <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-200">{bio}</p>
        <div className="mt-6 flex justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
          <a href={`mailto:${contactInfo.email.value}`} className="hover:text-blue-500 dark:hover:text-blue-400">
            {contactInfo.email.value}
          </a>
          {contactInfo.githubUrl && (
            <a href={contactInfo.githubUrl.value} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 dark:hover:text-gray-200">
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
          {featuredProjects.length + featuredIllustrations.length> 0 ? (
            featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
            .concat(
              featuredIllustrations.map((illustration) => (
                <IllustrationCard key={illustration.id} illustration={illustration} />
              ))
            )
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
