// src/infrastructure/repositories/file-system/fileSystemProjectRepository.ts

import { IProjectRepository } from '../projectRepository';
import { Project } from '@/domain/entities/project';
import { Image } from '@/domain/value-objects/image';
import { Url } from '@/domain/value-objects/url';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const projectsDirectory = path.join(process.cwd(), 'public/projects');

export class FileSystemProjectRepository implements IProjectRepository {
  
  private async processMarkdown(content: string): Promise<string> {
    const processedContent = await remark().use(html).process(content);
    return processedContent.toString();
  }
  
  private mapDataToProject(data: any, contentHtml: string): Project {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      fullDescription: contentHtml, // Markdownの本文をHTMLとしてセット
      images: data.images.map((img: any) => Image.create(img)),
      techStack: data.techStack,
      projectUrl: data.projectUrl ? Url.create(data.projectUrl) : null,
      githubUrl: data.githubUrl ? Url.create(data.githubUrl) : null,
      isFeatured: data.isFeatured,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }
  
  async getAllProjects(): Promise<Project[]> {
    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = await Promise.all(fileNames.map(async (fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const contentHtml = await this.processMarkdown(matterResult.content);
      return this.mapDataToProject(matterResult.data, contentHtml);
    }));
    
    return allProjectsData.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
            return 1;
        } else {
            return -1;
        }
    });
  }

  async getProjectById(id: string): Promise<Project | null> {
    const allProjects = await this.getAllProjects();
    const project = allProjects.find(p => p.id === id);
    return project || null;
  }
}