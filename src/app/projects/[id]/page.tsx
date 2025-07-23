// src/app/projects/[id]/page.tsx

import { FileSystemProjectRepository } from '@/infrastructure/repositories/file-system/fileSystemProjectRepository';
import { GetAllProjectsUseCase } from '@/use-cases/project/getAllProjectsUseCase';
import { GetProjectByIdUseCase } from '@/use-cases/project/getProjectByIdUseCase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  FaReact,
  FaUnity,
  FaNodeJs,
  FaDocker,
  FaGithub,
  FaJs,
  FaHtml5,
  FaCss3Alt,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiR,
  SiVercel,
  SiCplusplus,
  SiCmake,
  SiRender,
  SiExpress,
  SiGooglemaps,
  SiGooglegemini,
} from 'react-icons/si';
import{
  TbBrandCSharp,
} from 'react-icons/tb'

// ビルド時に静的なパスを生成する
export async function generateStaticParams() {
  const projectRepository = new FileSystemProjectRepository();
  const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
  const projects = await getAllProjectsUseCase.execute();
  

  return projects.map((project) => ({
    id: project.id,
  }));
}

// 技術スタック名とアイコンコンポーネントのマッピング
const techIconMap: { [key: string]: React.ElementType } = {
  'Next.js': SiNextdotjs,
  React: FaReact,
  TypeScript: SiTypescript,
  'Tailwind CSS': SiTailwindcss,
  'Node.js': FaNodeJs,
  PostgreSQL: SiPostgresql,
  Prisma: SiPrisma,
  Docker: FaDocker,
  Unity: FaUnity,
  R: SiR,
  'C++': SiCplusplus,
  Gemini: SiGooglegemini,
  Vercel: SiVercel,
  'HTML5': FaHtml5,
  'CSS Modules': FaCss3Alt,
  'Tailwind': SiTailwindcss,
  'Github': FaGithub,
  'JavaScript': FaJs,
  CMake: SiCmake,
  Render: SiRender,
  Express: SiExpress,
  'Google Places API': SiGooglemaps,
  'C#': TbBrandCSharp,
};



export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const projectRepository = new FileSystemProjectRepository();
  const getProjectByIdUseCase = new GetProjectByIdUseCase(projectRepository);
  const project = await getProjectByIdUseCase.execute(id);

  console.log('--- プロジェクトデータ ---', project);

  // プロジェクトが見つからない場合は404ページを表示
  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      {/* メイン画像 */}
      {project.images.length > 0 && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={project.images[0].url.value}
            alt={project.images[0].altText}
            width={1200}
            height={630}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* タイトル */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
        {project.title}
      </h1>

      {/* 日付と外部リンク */}
      <div className="flex justify-between items-center mb-8 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex gap-x-4">
          <p className="text-gray-600 dark:text-gray-300">
            作成日: {project.createdAt.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          
          <p className="text-gray-600 dark:text-gray-300">
            更新日: {project.updatedAt.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-4">
          {project.projectUrl && (
            <a href={project.projectUrl.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Webサイトを見る
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              GitHubリポジトリ
            </a>
          )}
        </div>
      </div>
      
      {/* 技術スタック */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3">使用技術</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => {
            const Icon = techIconMap[tech];
            return(
              <div key={tech} className="flex flex-col items-center justify-start p-2 rounded-lg w-24 h-24">
                {Icon ? (
                  <Icon className="text-4xl mb-2 text-gray-700 dark:text-gray-300" />
                ) : (
                  // アイコンがない場合のプレースホルダー
                  <div className="w-10 h-10 mb-2" />
                )}
                <span className="text-xs text-gray-800 dark:text-gray-200">{tech}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: project.fullDescription }}
      />

      {project.images.length > 1 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">ギャラリー</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.images.slice(1).map((image) => (
              <Image
                key={image.url.value}
                src={image.url.value}
                alt={image.altText}
                width={800}
                height={600}
                className="rounded-lg object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}