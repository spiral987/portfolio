// src/app/projects/page.tsx

// import { InMemoryProjectRepository } from '@/infrastructure/repositories/in-memory/inMemoryProjectRepository'; // 古い方をコメントアウト
import { FileSystemProjectRepository } from '@/infrastructure/repositories/file-system/fileSystemProjectRepository'; // 新しい方をインポート
import { GetAllProjectsUseCase } from '@/use-cases/project/getAllProjectsUseCase';
import { ProjectCard } from '@/app/components/ProjectCard';

export default async function ProjectsPage() {
  // リポジトリのインスタンスを新しいものに差し替える
  const projectRepository = new FileSystemProjectRepository();
  const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);

  const allProjects = await getAllProjectsUseCase.execute();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
        Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProjects.length > 0 ? (
          allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-gray-500">まだ作品はありません。</p>
        )}
      </div>
    </div>
  );
}