// src/infrastructure/repositories/projectRepository.ts

import { Project } from '../../domain/entities/project'; // Projectエンティティをインポート

/**
 * プロジェクトデータを取得・管理するためのリポジトリインターフェース。
 * このインターフェースは、ユースケースがデータソースに依存しないように抽象化を提供します。
 */
export interface IProjectRepository {
  /**
   * すべてのプロジェクトを取得します。
   * @returns Projectエンティティの配列を解決するPromise(非同期処理)。
   */
  getAllProjects(): Promise<Project[]>;

  /**
   * 指定されたIDのプロジェクトを取得します。
   * @param id - 取得するプロジェクトのID。
   * @returns 指定されたIDのProjectエンティティ、または見つからない場合はnullを解決するPromise。
   */
  getProjectById(id: string): Promise<Project | null>;

  // 必要であれば、以下のようなメソッドも追加できます（例：プロジェクト作成、更新、削除）
  // createProject(project: Project): Promise<Project>;
  // updateProject(project: Project): Promise<Project>;
  // deleteProject(id: string): Promise<void>;
}