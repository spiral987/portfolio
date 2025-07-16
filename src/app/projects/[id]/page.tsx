// src/app/projects/[id]/page.tsx

import { FileSystemProjectRepository } from '@/infrastructure/repositories/file-system/fileSystemProjectRepository';
import { GetAllProjectsUseCase } from '@/use-cases/project/getAllProjectsUseCase';
import { GetProjectByIdUseCase } from '@/use-cases/project/getProjectByIdUseCase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// ビルド時に静的なパスを生成する
export async function generateStaticParams() {
  const projectRepository = new FileSystemProjectRepository();
  const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
  const projects = await getAllProjectsUseCase.execute();
  

  return projects.map((project) => ({
    id: project.id,
  }));
}

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
          {project.techStack.map((tech) => (
            <span key={tech} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {tech}
            </span>
          ))}
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