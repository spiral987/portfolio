// src/domain/value-objects/Url.ts

/**
 * URLを表すバリューオブジェクト。
 * 値が有効なURL形式であることを保証します。
 */
export class Url {
  // `public readonly` で、外部から値にアクセスできるが変更できないようにします。
  private constructor(public readonly value: string) {
    // インスタンス作成時にバリデーションを実行
    if (!Url.isValid(value)) {
      throw new Error(`Invalid URL format: ${value}`);
    }
  }

  /**
   * Urlの新しいインスタンスを作成するファクトリメソッド。
   * @param url - 検証するURL文字列。
   * @returns Urlのインスタンス。
   */
  static create(url: string): Url {
    return new Url(url);
  }

  /**
   * 指定された文字列が有効なURL形式であるかを検証します。
   * JavaScriptの `URL` コンストラクタを使って基本的なバリデーションを行います。
   * @param url - 検証するURL文字列。
   * @returns 有効であれば true、そうでなければ false。
   */
  static isValid(url: string): boolean {
    try {
      new URL(url); // 無効なURLだとここでエラーが発生
      // 特定のプロトコル (http/https) のみを許可する場合
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
      return false; // URLコンストラクタがエラーをスローした場合
    }
  }

  /**
   * 別のUrlオブジェクトと同じ値を持つかを比較します。
   * @param other - 比較する別のUrlオブジェクト。
   * @returns 値が同じであれば true、そうでなければ false。
   */
  equals(other: Url): boolean {
    if (this === other) {
      return true;
    }
    // `other` が Url のインスタンスであり、かつ値が同じであるかをチェック
    return other instanceof Url && this.value === other.value;
  }

  /**
   * URLの文字列表現を返します。
   * @returns URL文字列。
   */
  toString(): string {
    return this.value;
  }
}