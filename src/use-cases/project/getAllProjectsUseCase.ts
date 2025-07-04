// src/use-cases/project/getAllProjectsUseCase.ts

import { Project } from '../../domain/entities/project';
import { IProjectRepository } from '../../infrastructure/repositories/projectRepository'; // リポジトリインターフェースをインポート

/**
 * すべてのプロジェクトを取得するためのユースケース。
 * アプリケーション固有のビジネスロジック（この場合は単にすべてのプロジェクトを取得する）をカプセル化します。
 */
export class GetAllProjectsUseCase {
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
   * ユースケースを実行し、すべてのプロジェクトを取得します。
   * @returns Projectエンティティの配列を解決するPromise。
   */
  async execute(): Promise<Project[]> {
    // ここにビジネスロジックを追加できます。
    // 例えば、特定の順序でソートしたり、特定の条件でフィルタリングしたり、
    // 複数のデータソースを組み合わせたり、というロジックです。
    // 現時点ではシンプルにすべてを取得します。

    const projects = await this.projectRepository.getAllProjects();
    return projects;
  }
}