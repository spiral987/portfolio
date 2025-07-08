// src/use-cases/illustration/getIllustrationByIdUseCase.ts

import { Illustration } from '../../domain/entities/illustration';
import { IIllustrationRepository } from '../../infrastructure/repositories/illustrationRepository'; // リポジトリインターフェースをインポート

/**
 * 特定のIDを持つイラストの詳細を取得するためのユースケース。
 * イラストリポジトリから指定されたIDのイラストを取得します。
 */
export class GetIllustrationByIdUseCase {
  private readonly illustrationRepository: IIllustrationRepository;

  /**
   * コンストラクタでイラストリポジトリのインスタンスを受け取ります。
   * これにより、具体的なデータソースの実装に依存せず、抽象にのみ依存します（依存性の注入）。
   * @param illustrationRepository - イラストデータを操作するためのリポジトリ。
   */
  constructor(illustrationRepository: IIllustrationRepository) {
    this.illustrationRepository = illustrationRepository;
  }

  /**
   * ユースケースを実行し、指定されたIDのイラストを取得します。
   * @param id - 取得するイラストのID。
   * @returns 指定されたIDのIllustrationエンティティ、または見つからない場合はnullを解決するPromise。
   */
  async execute(id: string): Promise<Illustration | null> {
    // リポジトリからIDでイラストを取得します。
    const illustration = await this.illustrationRepository.getIllustrationById(id);
    return illustration;
  }
}