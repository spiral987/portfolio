import { Project } from '@/domain/entities/project';
import Image from 'next/image';
import Link from 'next/link';

export const ProjectCard = ({ project }: { project: Project }) => (
  <div className="rounded-lg">
    {project.images.length > 0 && (
      <Link href={`/projects/${project.id}`} className="block dark:border-gray-700 rounded-lg overflow-hidden">
        <Image
          src={project.images[0].url.value}
          alt={project.images[0].altText}
          height={200}
          width={350}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{project.description}</p>
          <div className="flex justify-end gap-4 text-sm">
            {project.projectUrl && (
              <a href={project.projectUrl.value} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">
                サイトを見る
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl.value} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 font-semibold">
                GitHub
              </a>
            )}
          </div>
        </div>
      </Link>
    )}

  </div>
);