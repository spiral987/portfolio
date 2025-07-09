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
  // ★★★ここからデバッグログを追加★★★
  console.log(`--- Validating Project: ${project.title} (${project.id}) ---`);

  const isTitleValid = project.title.trim() !== '';
  console.log(`Title valid: ${isTitleValid} (Value: "${project.title}")`);

  const isDescriptionValid = project.description.trim() !== '';
  console.log(`Description valid: ${isDescriptionValid} (Value: "${project.description}")`);

  const areImagesPresent = project.images.length > 0;
  console.log(`Images present: ${areImagesPresent} (Count: ${project.images.length})`);

  const areAllImagesValid = project.images.every(img => Image.isValid({ url: img.url.value, altText: img.altText }));
  console.log(`All images valid: ${areAllImagesValid}`);
  if (!areAllImagesValid) {
    project.images.forEach((img, index) => {
      console.log(`  Image ${index} (${img.url.value}) isValid: ${Image.isValid({ url: img.url.value, altText: img.altText })}`);
    });
  }

  const isProjectUrlValid = !project.projectUrl || Url.isValid(project.projectUrl.value);
  console.log(`Project URL valid: ${isProjectUrlValid} (Value: ${project.projectUrl?.value})`);
  if (project.projectUrl && !Url.isValid(project.projectUrl.value)) {
    console.log(`  Reason for invalid Project URL: Url.isValid('${project.projectUrl.value}') returned false.`);
  }

  const isGithubUrlValid = !project.githubUrl || Url.isValid(project.githubUrl.value);
  console.log(`GitHub URL valid: ${isGithubUrlValid} (Value: ${project.githubUrl?.value})`);
  if (project.githubUrl && !Url.isValid(project.githubUrl.value)) {
    console.log(`  Reason for invalid GitHub URL: Url.isValid('${project.githubUrl.value}') returned false.`);
  }
  console.log(`--- End Validating Project: ${project.title} ---`);
  // ★★★デバッグログここまで★★★

  return isTitleValid &&
         isDescriptionValid &&
         areImagesPresent &&
         areAllImagesValid &&
         isProjectUrlValid &&
         isGithubUrlValid;
}