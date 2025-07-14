// src/infrastructure/repositories/file-system/fileSystemContactRepository.ts

import { IContactRepository } from '../contactRepository';
import { ContactInfo } from '@/domain/entities/contactInfo';
import { EmailAddress } from '@/domain/value-objects/emailAddress';
import { Url } from '@/domain/value-objects/url';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
//import { remark } from 'remark';
//import html from 'remark-html';

type ContactFrontmatter = {
  email: string;
  websiteUrl?: string | null;
  githubUrl?: string | null;
  twitterUrl?: string | null;
  pixivUrl?: string | null; // PixivのURLを追加
};

const contactFilePath = path.join(process.cwd(), 'public/contact/index.md');

export class FileSystemContactRepository implements IContactRepository {
  
    /*
  private async processMarkdown(content: string): Promise<string> {
    const processedContent = await remark().use(html).process(content);
    return processedContent.toString();
  }
  */
  async getContactInfo(): Promise<ContactInfo> {
    const fileContents = fs.readFileSync(contactFilePath, 'utf8');
    const matterResult = matter(fileContents);
    const data = matterResult.data as ContactFrontmatter;

    // contentは現状使いませんが、将来のために処理しておきます。
    // const contentHtml = await this.processMarkdown(matterResult.content);
    
    return {
      email: EmailAddress.create(data.email),
      websiteUrl: data.websiteUrl ? Url.create(data.websiteUrl) : null,
      githubUrl: data.githubUrl ? Url.create(data.githubUrl) : null,
      twitterUrl: data.twitterUrl ? Url.create(data.twitterUrl) : null,
      pixivUrl: data.pixivUrl ? Url.create(data.pixivUrl) : null, // PixivのURLを追加
    };
  }
}