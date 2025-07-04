/**
 * メールアドレスを表すバリューオブジェクト。
 * 値が有効なメールアドレス形式であることを保証します。
 */
export class EmailAddress {
    //コンストラクタ
  private constructor(public readonly value: string) {
    // インスタンス作成時にバリデーションを実行
    if (!EmailAddress.isValid(value)) {
      throw new Error(`Invalid email address format: ${value}`);
    }
  }

  /**
   * EmailAddressの新しいインスタンスを作成するファクトリメソッド。
   * @param email - 検証するメールアドレス文字列。
   * @returns EmailAddressのインスタンス。
   */
  static create(email: string): EmailAddress {
    return new EmailAddress(email);
  }

  /**
   * 指定された文字列が有効なメールアドレス形式であるかを検証します。
   * (これは簡易的なバリデーションであり、より厳密なものはライブラリの利用を推奨します)
   * @param email - 検証するメールアドレス文字列。
   * @returns 有効であれば true、そうでなければ false。
   */
  static isValid(email: string): boolean {
    // 非常にシンプルな正規表現でのバリデーション例
    // 本番環境ではより堅牢なバリデーションライブラリ(例: validator.js)の利用を検討してください。
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * 別のEmailAddressオブジェクトと同じ値を持つかを比較します。
   * @param other - 比較する別のEmailAddressオブジェクト。
   * @returns 値が同じであれば true、そうでなければ false。
   */
  equals(other: EmailAddress): boolean {
    if (this === other) {
      return true;
    }
    // `other` が EmailAddress のインスタンスであり、かつ値が同じであるかをチェック (大文字小文字を区別しない比較が一般的)
    return other instanceof EmailAddress && this.value.toLowerCase() === other.value.toLowerCase();
  }

  /**
   * メールアドレスの文字列表現を返します。
   * @returns メールアドレス文字列。
   */
  toString(): string {
    return this.value;
  }
}