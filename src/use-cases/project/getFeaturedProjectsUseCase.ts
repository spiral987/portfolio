// src/use-cases/project/getFeaturedProjectsUseCase.ts

import { Project } from '../../domain/entities/project';
import { IProjectRepository } from '../../infrastructure/repositories/projectRepository';

/**
 * トップページに表示する注目作品を取得するためのユースケース。
 * プロジェクトリポジトリから全てのプロジェクトを取得し、
 * その中から「注目作品 (isFeatured: true)」に設定されたものだけをフィルタリングします。
 */
export class GetFeaturedProjectsUseCase {
  private readonly projectRepository: IProjectRepository;

  /**
   * コンストラクタでプロジェクトリポジトリのインスタンスを受け取ります。
   * これにより、具体的なデータソースの実装に依存せず、抽象にのみ依存します（依存性の注入）。
   * @param projectRepository - プロジェクトデータを操作するためのリポジトリ。
   */
  constructor(projectRepository: IProjectRepository) {
    this.projectRepository = projectRepository;
  }

  /**
   * ユースケースを実行し、注目作品のリストを取得します。
   * @returns 注目作品のProjectエンティティの配列を解決するPromise。
   */
  async execute(): Promise<Project[]> {
    // まず、リポジトリからすべてのプロジェクトを取得します。
    // ユースケースは具体的なデータ取得方法を知る必要はありません。
    const allProjects = await this.projectRepository.getAllProjects();

    // ここにユースケース固有のビジネスロジックを記述します。
    // 今回は `isFeatured` が true のプロジェクトのみをフィルタリングします。
    const featuredProjects = allProjects.filter(project => project.isFeatured);

    // 必要であれば、ここでさらにソートなどのロジックを追加することもできます。
    // 例: return featuredProjects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return featuredProjects;
  }
}