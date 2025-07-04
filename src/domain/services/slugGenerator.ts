import { Slug } from '../value-objects/slug';

/**
 * スラッグの存在を確認するためのインターフェース。
 * このインターフェースはドメイン層に属し、具体的な実装はInfrastructure層で行われます。
 * ドメイン層はInfrastructure層に依存しないように、抽象化されたインターフェースを定義します。
 */
export interface ISlugExistenceChecker {
  isSlugTaken(slugValue: string): Promise<boolean>;
}

/**
 * スラッグ生成とユニーク性確保のためのドメインサービス。
 * 複数のエンティティ（BlogPost）にまたがるロジックや、エンティティ単独では完結しないロジックを担います。
 */
export class SlugGenerator {
  private readonly slugChecker: ISlugExistenceChecker;

  //これがDependency Injection
  constructor(slugChecker: ISlugExistenceChecker) {
    this.slugChecker = slugChecker;
  }

  /**
   * 与えられたタイトルからスラッグを生成し、必要に応じてユニークなものにします。
   * @param title - スラッグを生成する元のタイトル。
   * @returns 生成されたユニークなSlugバリューオブジェクト。
   */
  async generateUniqueSlug(title: string): Promise<Slug> {
    const baseSlugValue = this.convertToSlug(title);
    let currentSlugValue = baseSlugValue;
    let counter = 1;

    // スラッグが既に存在しないか確認し、存在する場合はユニークになるまで数字を追加
    while (await this.slugChecker.isSlugTaken(currentSlugValue)) {
      currentSlugValue = `${baseSlugValue}-${counter}`;
      counter++;
    }

    return Slug.create(currentSlugValue);
  }

  /**
   * 文字列をURLフレンドリーなスラッグ形式に変換します。
   * 例: "私のNext.jsブログ" -> "watashi-no-nextjs-blog"
   * @param text - 変換する文字列。
   * @returns スラッグ形式の文字列。
   */
  private convertToSlug(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // 英数字、スペース、ハイフン以外を除去
      .replace(/\s+/g, '-')       // スペースをハイフンに置換
      .replace(/-+/g, '-');        // 連続するハイフンを1つに置換
  }
}