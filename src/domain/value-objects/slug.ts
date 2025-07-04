// src/domain/value-objects/slug.ts

/**
 * URLセーフなユニークな文字列を表すバリューオブジェクト
 */
export class Slug {
    //コンストラクタ
  private constructor(public readonly value: string) {
    if (!Slug.isValid(value)) {
      throw new Error(`Invalid slug format: ${value}`);
    }
  }

  /**
   * Slugのインスタンスを作成するファクトリメソッド
   */
  static create(slug: string): Slug {
    return new Slug(slug);
  }

  /**
   * スラッグの形式が有効であるかを検証するスタティックメソッド
   * (例: アルファベット、数字、ハイフンのみ、先頭・末尾にハイフンがないなど)
   */
  static isValid(slug: string): boolean {
    if (typeof slug !== 'string' || slug.length === 0) {
      return false; // 文字列型でなく、または空の場合は無効
    }
    // 小文字の英数字とハイフンのみで構成され、先頭/末尾がハイフンでなく、連続するハイフンがないかをチェック
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
  }

  /**
   * 同じ値を持つスラッグであるかを比較する
   */
  equals(other: Slug): boolean {
    if (this === other) {
      return true;
    }
    // `other` が Slug のインスタンスであり、かつ値が同じであるかをチェック
    return other instanceof Slug && this.value === other.value;
  }

    /**
   * スラッグの文字列表現を返します。
   * @returns スラッグ文字列。
   */
    toString(): string {
    return this.value;
  }

}