// src/app/page.tsx

import { GetAllProjectsUseCase } from '@/use-cases/project/getAllProjectsUseCase';
import { GetAllIllustrationsUseCase } from '@/use-cases/illustration/getAllIllustrationsUseCase';
import { GetContactInfoUseCase } from '@/use-cases/contact/getContactInfoUseCase';
import { GetLatestBlogPostsUseCase } from '@/use-cases/blogPost/getLatestBlogPostsUseCase';
import { FileSystemProjectRepository } from '@/infrastructure/repositories/file-system/fileSystemProjectRepository';
import { FileSystemIllustrationRepository } from '@/infrastructure/repositories/file-system/fileSystemIllustrationRepository';
import { FileSystemContactRepository } from '@/infrastructure/repositories/file-system/fileSystemContactRepository';
import { FileSystemBlogPostRepository } from '@/infrastructure/repositories/file-system/fileSystemBlogPostRepository';

import { ProjectCard } from '@/app/components/ProjectCard';
import { BlogPostCard } from '@/app/components/BlogPostCard';
import { IllustrationCard } from './components/IllustrationCard';

import Image from 'next/image';
import Link from 'next/link'; // ★ Link コンポーネントをインポートします
import { HeroHeader } from './components/HeroHeader';
import { AnimatedText } from './components/AnimatedText';

import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPixiv } from 'react-icons/si';

export default async function HomePage() {
  const projectRepository = new FileSystemProjectRepository();
  const illustrationRepository = new FileSystemIllustrationRepository();
  const blogPostRepository = new FileSystemBlogPostRepository();
  const contactRepository = new FileSystemContactRepository();

  const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
  const getAllIllustrationsUseCase = new GetAllIllustrationsUseCase(illustrationRepository);
  const getLatestBlogPostsUseCase = new GetLatestBlogPostsUseCase(blogPostRepository);
  const getContactInfoUseCase = new GetContactInfoUseCase(contactRepository);

  const allProjects = await getAllProjectsUseCase.execute();
  const allIllustrations = await getAllIllustrationsUseCase.execute();

  // ★ 取得した全イラストから、最新の12件だけをスライスします
  const latestIllustrations = allIllustrations.slice(0, 12);
  // ★ Projectsについても最新の3件だけを表示するようにします
  const latestProjects = allProjects.slice(0, 3);

  const latestBlogPosts = await getLatestBlogPostsUseCase.execute(3);
  const contactInfo = await getContactInfoUseCase.execute();

  const bio = "大学では情報科学を専攻、研究分野はHCIです。イラストレーターの創作支援に関する研究をしたいと考えています。現在は修論テーマを模索したりイラスト描いたりしてます。";

  return (
    <>
      <HeroHeader>
        <AnimatedText />
      </HeroHeader>
      <main>
        <div className="max-w-6xl mx-auto">

          {/* ... (自己紹介セクション) ... */}
          <section id="main-content" className="relative text-center my-12 rounded-xl">
            <div className="absolute -top-30 left-1/2 -translate-x-1/2">
              <Image
                src="/images/icon.jpg"
                alt="spiralIcon"
                width={120}
                height={120}
                className="rounded-full"
                priority
              />
            </div>
          </section>
          <section className="text-center rounded-xl">
            <h1 className="text-4xl font-bold mb-4 mt-16 text-gray-900 dark:text-gray-100">
              spiraludon
            </h1>
            <p className="text-lg leading-relaxed">{bio}</p>

            {/* ↓ 既存の div をアイコンリンクの div に置き換えます */}
            <div className="mt-6 flex justify-center items-center gap-6 text-2xl text-gray-500 dark:text-gray-400">
              {/* Email */}
              <a
                href={`mailto:${contactInfo.email.value}`}
                aria-label="Email"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                <FaEnvelope />
              </a>

              {/* GitHub */}
              {contactInfo.githubUrl && (
                <a
                  href={contactInfo.githubUrl.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  <FaGithub />
                </a>
              )}

              {/* Twitter/X */}
              {contactInfo.twitterUrl && (
                <a
                  href={contactInfo.twitterUrl.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <FaXTwitter />
                </a>
              )}

              {/* Pixiv */}
              {contactInfo.pixivUrl && (
                <a
                  href={contactInfo.pixivUrl.value}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Pixiv"
                  className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  <SiPixiv />
                </a>
              )}
            </div>
          </section>

          {/* ... (Projects セクション) ... */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {latestProjects.length > 0 ? (
                latestProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <p className="text-gray-500">まだ作品はありません。</p>
              )}
            </div>

            {/* Total projects check for More button */}
            {allProjects.length > 3 && (
              <div className="text-center mt-8">
                <Link
                  href="/projects"
                  className="inline-block bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  More
                </Link>
              </div>
            )}
          </section>

          {/* Illustrations セクション */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
              Illustrations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {/* ★ allIllustrations を latestIllustrations に変更 */}
              {latestIllustrations.length > 0 ? (
                latestIllustrations.map((illustration) => (
                  <IllustrationCard
                    key={illustration.id}
                    illustration={illustration}
                    isHomePage={true}
                  />
                ))
              ) : (
                <p className="text-gray-500">まだイラストはありません。</p>
              )}
            </div>

            {/* ★ More ボタンを追加 */}
            {/* 取得したイラストの総数が12件より多い場合のみ "More" ボタンを表示 */}
            {allIllustrations.length > 12 && (
              <div className="text-center mt-8">
                <Link
                  href="/illustrations"
                  className="inline-block bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  More
                </Link>
              </div>
            )}
          </section>


          {/* Posts セクション */}
          <section>
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
              Posts
            </h2>
            {/* ★ ブログセクション用のコンテナを追加 (max-w-4xl) */}
            <div className="max-w-4xl mx-auto">
              {/* ★ グリッドの列指定を grid-cols-1 に変更し、gapを調整 */}
              <div className="grid grid-cols-1 gap-6">
                {latestBlogPosts.length > 0 ? (
                  latestBlogPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))
                ) : (
                  <p className="text-gray-500">まだブログ記事はありません。</p>
                )}
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}