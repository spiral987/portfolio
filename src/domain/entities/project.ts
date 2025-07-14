// src/domain/entities/project.ts

import { Image } from '../value-objects/image';
import { Url } from '../value-objects/url';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  images: Image[];
  techStack: string[];
  projectUrl: Url | null;
  githubUrl: Url | null;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export function isValidProject(project: Project): boolean {
  const isTitleValid = project.title.trim() !== '';
  const isDescriptionValid = project.description.trim() !== '';
  const areImagesPresent = project.images.length > 0;
  const areAllImagesValid = project.images.every(img => Image.isValid({ url: img.url.value, altText: img.altText }));
  const isProjectUrlValid = !project.projectUrl || Url.isValid(project.projectUrl.value);
  const isGithubUrlValid = !project.githubUrl || Url.isValid(project.githubUrl.value);


  return isTitleValid &&
         isDescriptionValid &&
         areImagesPresent &&
         areAllImagesValid &&
         isProjectUrlValid &&
         isGithubUrlValid;
}