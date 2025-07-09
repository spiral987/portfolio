// src/app/projects/page.tsx

import { GetAllProjectsUseCase } from '@/use-cases/project/getAllProjectsUseCase';
import { InMemoryProjectRepository } from '@/infrastructure/repositories/in-memory/inMemoryProjectRepository';
import { Project } from '@/domain/entities/project';
import Image from 'next/image';

// 作品カードコンポーネント (ホームページのものとほぼ同じですが、こちらに再定義します)
const ProjectCard = ({ project }: { project: Project }) => (
  <div style={{ border: '1px solid #ccc', padding: '16px', margin: '8px', borderRadius: '8px' }}>
    <h3 style={{ margin: '0 0 8px 0' }}>{project.title}</h3>
    {project.images.length > 0 && (
      <Image
        src={project.images[0].url.value}
        alt={project.images[0].altText}
        height={150}
        width={300}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
      />
    )}
    <p style={{ fontSize: '0.9em', color: '#666' }}>{project.description}</p>
    <div style={{ marginTop: '10px' }}>
      {project.projectUrl && (
        <a href={project.projectUrl.value} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
          プロジェクトを見る
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl.value} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      )}
    </div>
  </div>
);

export default async function ProjectsPage() {
  // リポジトリとユースケースのインスタンスを作成
  const projectRepository = new InMemoryProjectRepository();
  const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);

  // すべてのプロジェクトを取得
  const allProjects = await getAllProjectsUseCase.execute();

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '2.5em', marginBottom: '20px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Projects
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {allProjects.length > 0 ? (
          allProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p>まだ作品はありません。</p>
        )}
      </div>
    </div>
  );
}