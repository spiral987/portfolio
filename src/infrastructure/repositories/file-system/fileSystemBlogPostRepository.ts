// src/infrastructure/repositories/file-system/fileSystemBlogPostRepository.ts

import { IBlogPostRepository } from '../blogPostRepository';
import { BlogPost } from '@/domain/entities/blogPost';
import { Slug } from '@/domain/value-objects/slug';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm'; 
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

type BlogPostFrontmatter = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  tags?: string[];
  isDraft?: boolean;
};

const blogDirectory = path.join(process.cwd(), 'public/blog');

export class FileSystemBlogPostRepository implements IBlogPostRepository {

  private async processMarkdown(content: string): Promise<string> {
    const processedContent = await remark()
      .use(remarkGfm) // GFMを有効にする
      .use(remarkRehype, {
        footnoteLabel: '注釈',
        footnoteBackLabel: '戻る'
      }) // mdast  -> hast
      .use(rehypeStringify) // hast -> HTML
      .process(content);
    return processedContent.toString();
  }

  private mapDataToBlogPost(data: BlogPostFrontmatter, contentHtml: string): BlogPost {
    return {
      id: data.id,
      title: data.title,
      slug: Slug.create(data.slug),
      content: contentHtml,
      publishedAt: new Date(data.publishedAt),
      updatedAt: new Date(data.updatedAt),
      tags: data.tags || [],
      isDraft: data.isDraft || false,
    };
  }

  async getAllBlogPosts(): Promise<BlogPost[]> {
    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = await Promise.all(
      fileNames.map(async (fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        const contentHtml = await this.processMarkdown(matterResult.content);

        return this.mapDataToBlogPost(matterResult.data as BlogPostFrontmatter, contentHtml);
      })
    );

    return allPostsData.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    console.log(`Fetching blog post with slug: ${slug}`);
    const filePath = path.join(blogDirectory, `${slug}.md`);
    
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const matterResult = matter(fileContents);
      const contentHtml = await this.processMarkdown(matterResult.content);
      
      const post = this.mapDataToBlogPost(matterResult.data as BlogPostFrontmatter, contentHtml);

      // 下書きの場合は null を返す
      return post.isDraft ? null : post;
    } catch {
        console.error(`Blog post with slug "${slug}" not found.`);
      // ファイルが見つからない場合はnullを返す
      return null;
    }
  }
}