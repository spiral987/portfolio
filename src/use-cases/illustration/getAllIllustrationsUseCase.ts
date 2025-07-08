// src/use-cases/illustration/getAllIllustrationsUseCase.ts

import { Illustration } from '../../domain/entities/illustration';
import { IIllustrationRepository } from '../../infrastructure/repositories/illustrationRepository'; // リポジトリインターフェースをインポート

/**
 * すべてのイラストを取得するためのユースケース。
 * アプリケーション固有のビジネスロジック（この場合は単にすべてのイラストを取得する）をカプセル化します。
 */
export class GetAllIllustrationsUseCase {
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
   * ユースケースを実行し、すべてのイラストを取得します。
   * @returns Illustrationエンティティの配列を解決するPromise。
   */
  async execute(): Promise<Illustration[]> {
    // リポジトリからすべてのイラストを取得します。
    // ユースケースは具体的なデータ取得方法を知る必要はありません。
    const illustrations = await this.illustrationRepository.getAllIllustrations();

    // 必要であれば、ここでさらにソートやフィルタリングなどのロジックを追加することもできます。
    // 例: return illustrations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return illustrations;
  }
}