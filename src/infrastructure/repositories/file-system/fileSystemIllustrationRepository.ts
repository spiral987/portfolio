// src/infrastructure/repositories/file-system/fileSystemIllustrationRepository.ts

import { IIllustrationRepository } from '../illustrationRepository';
import { Illustration } from '@/domain/entities/illustration';
import { Image } from '@/domain/value-objects/image';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Markdownのフロントマターから読み込むデータの型を定義
type IllustrationFrontmatter = {
  id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  images: {
    url: string;
    altText: string;
    type?: 'thumbnail' | 'full' | 'process' | 'screenshot';
    order?: number;
  }[];
};

const illustrationsDirectory = path.join(process.cwd(), 'public/illustrations');

export class FileSystemIllustrationRepository implements IIllustrationRepository {
  
  private async processMarkdown(content: string): Promise<string> {
    const processedContent = await remark().use(html).process(content);
    return processedContent.toString();
  }
  
  private mapDataToIllustration(data: IllustrationFrontmatter, contentHtml: string): Illustration {
    return {
      id: data.id,
      title: data.title,
      description: data.description,
      fullDescription: contentHtml,
      isFeatured: data.isFeatured,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
      images: data.images.map((img) => Image.create(img)),
    };
  }
  
  async getAllIllustrations(): Promise<Illustration[]> {
    const fileNames = fs.readdirSync(illustrationsDirectory);
    const allIllustrationsData = await Promise.all(fileNames.map(async (fileName) => {
      const fullPath = path.join(illustrationsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);
      const contentHtml = await this.processMarkdown(matterResult.content);
      
      return this.mapDataToIllustration(matterResult.data as IllustrationFrontmatter, contentHtml);
    }));
    
    return allIllustrationsData.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  async getIllustrationById(id: string): Promise<Illustration | null> {
    const allIllustrations = await this.getAllIllustrations();
    return allIllustrations.find(p => p.id === id) || null;
  }
}