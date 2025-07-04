// src/infrastructure/repositories/in-memory/inMemoryProjectRepository.ts

import { IProjectRepository } from '../projectRepository'; // リポジトリインターフェースをインポート
import { Project, isValidProject } from '../../../domain/entities/project'; // Projectエンティティとバリデーションをインポート
import { Image } from '../../../domain/value-objects/image'; // Imageバリューオブジェクトをインポート
import { Url } from '../../../domain/value-objects/url';   // Urlバリューオブジェクトをインポート

// ダミーデータ（開発用）
const DUMMY_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ポートフォリオサイト',
    description: 'Next.jsとクリーンアーキテクチャで構築した個人ポートフォリオサイトです。',
    fullDescription: 'このサイトは、私のスキルとプロジェクトを展示するためにNext.js (App Router), TypeScript, Tailwind CSS, クリーンアーキテクチャを用いて開発されました。',
    images: [
      Image.create({ url: 'https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Portfolio+Screenshot+1', altText: 'ポートフォリオサイトのスクリーンショット1', type: 'screenshot', order: 1 }),
      Image.create({ url: 'https://via.placeholder.com/600x400/FF0000/FFFFFF?text=Portfolio+Screenshot+2', altText: 'ポートフォリオサイトのスクリーンショット2', type: 'screenshot', order: 2 }),
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Clean Architecture'],
    projectUrl: Url.create('https://my-actual-portfolio.com'),
    githubUrl: Url.create('https://github.com/your-username/my-portfolio-repo'),
    isFeatured: true,
    createdAt: new Date('2024-01-15T09:00:00Z'),
    updatedAt: new Date('2024-06-20T14:30:00Z'),
  },
  {
    id: '2',
    title: 'タスク管理アプリ',
    description: 'シンプルなタスク管理Webアプリケーションです。',
    fullDescription: 'ユーザーがタスクを追加、編集、削除できるシンプルなCRUDアプリケーション。バックエンドにはFirebaseを使用。',
    images: [
      Image.create({ url: 'https://via.placeholder.com/600x400/00FF00/000000?text=Task+App+Screenshot+1', altText: 'タスク管理アプリのスクリーンショット' }),
    ],
    techStack: ['React', 'Firebase', 'CSS Modules'],
    projectUrl: null, // URLがない場合
    githubUrl: Url.create('https://github.com/your-username/task-app-repo'),
    isFeatured: false,
    createdAt: new Date('2023-11-01T11:00:00Z'),
    updatedAt: new Date('2024-03-10T10:00:00Z'),
  },
];

/**
 * メモリ上にプロジェクトデータを保持するインメモリリポジトリの実装。
 * IProjectRepositoryインターフェースを実装します。
 * 開発やテストに便利です。
 */
export class InMemoryProjectRepository implements IProjectRepository {
  private projects: Project[] = [];

  constructor() {
    // ダミーデータを初期化時にコピー（実際のデータを直接変更しないように）
    this.projects = DUMMY_PROJECTS.map(p => {
      // バリデーションを通じて有効なProjectインスタンスを作成するように変換
      // もし isValidProject が false を返すなら、これはテストデータ自体に問題があることを示す
      if (!isValidProject(p)) {
        throw new Error(`Invalid dummy project data: ${p.title}`);
      }
      return p;
    });
  }

  async getAllProjects(): Promise<Project[]> {
    // 実際のアプリケーションでは、ここでデータベースクエリなどを実行します。
    // 現時点では、メモリ上のデータを返します。
    // 返す前に、必要に応じてソートやフィルタリングを行うこともできます。
    return Promise.resolve(this.projects);
  }

  async getProjectById(id: string): Promise<Project | null> {
    // 実際のアプリケーションでは、ここでデータベースクエリなどを実行します。
    const project = this.projects.find(p => p.id === id);
    return Promise.resolve(project || null);
  }
}