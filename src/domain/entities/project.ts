// src/domain/entities/project.ts
import { Image } from '../value-objects/image';
import { Url } from '../value-objects/url';

export interface Project {
    id: string;
    title: string;
    description: string; // トップページ用の短い説明
    fullDescription: string; // WORKSページ用の詳細な説明
    images: Image[];
    techStack: string[];
    projectUrl: Url | null;
    githubUrl: Url | null;
    isFeatured: boolean; // トップページに表示するかどうか
    createdAt: Date;
    updatedAt: Date;
}

export function isValidProject(project: Project): boolean {
  return project.title.trim() !== '' &&
         project.description.trim() !== '' &&
         project.images.length > 0 && // 少なくとも1つの画像が必要
         project.images.every(img => Image.isValid({url:img.url.value, altText:img.altText})) && // 各画像が有効であること
          // projectUrl が存在する場合は有効であること
         (!project.projectUrl || Url.isValid(project.projectUrl.value)) && 
         // githubUrl が存在する場合は有効であること
         (!project.githubUrl || Url.isValid(project.githubUrl.value));
}