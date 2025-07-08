// src/use-cases/project/getProjectByIdUseCase.ts

import { Project } from '../../domain/entities/project';
import { IProjectRepository } from '../../infrastructure/repositories/projectRepository';

/**
 * 特定のIDを持つプロジェクトの詳細を取得するためのユースケース。
 * プロジェクトリポジトリから指定されたIDのプロジェクトを取得します。
 */
export class GetProjectByIdUseCase {
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
   * ユースケースを実行し、指定されたIDのプロジェクトを取得します。
   * @param id - 取得するプロジェクトのID。
   * @returns 指定されたIDのProjectエンティティ、または見つからない場合はnullを解決するPromise。
   */
  async execute(id: string): Promise<Project | null> {
    // ここにユースケース固有のビジネスロジックを記述します。
    // 例えば、プロジェクトの閲覧履歴を記録したり、アクセス権限をチェックしたり、
    // 関連する他のデータを取得して結合するといったロジックです。
    // 現時点では、シンプルにリポジトリからIDでプロジェクトを取得します。

    const project = await this.projectRepository.getProjectById(id);
    return project;
  }
}