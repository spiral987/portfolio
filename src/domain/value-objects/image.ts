// src/domain/value-objects/image.ts

import { Url } from './url'; // Url バリューオブジェクトをインポート

/**
 * 画像のURLとそのメタ情報を表すバリューオブジェクト。
 * 値が有効であることを保証し、不変です。
 */
export class Image {
  // `readonly` を使用して、インスタンス作成後にプロパティが変更されないようにします。
  public readonly url: Url; // URLはUrlバリューオブジェクトとして持つ
  public readonly altText: string; // 画像が表示できない場合の代替テキスト
  public readonly caption?: string;
  public readonly type?: 'thumbnail' | 'full' | 'process' | 'screenshot'; // 'screenshot' を追加しました
  public readonly order?: number; // 表示順序を追加しました

  // コンストラクタを private にすることで、直接 `new Image()` されるのを防ぎ、
  // 必ずファクトリメソッド `Image.create()` を通してインスタンス化されるようにします。
  private constructor(
    url: Url, // Urlバリューオブジェクトを受け取る
    altText: string,
    caption?: string,
    type?: 'thumbnail' | 'full' | 'process' | 'screenshot',
    order?: number
  ) {
    if (!altText || altText.trim() === '') {
      throw new Error('Image altText cannot be empty.');
    }
    // ここではUrlのバリデーションはUrlクラスに任せるため、明示的なチェックは不要ですが、
    // URLの有効性が保証されたUrlインスタンスを受け取っているかを確認できます。

    this.url = url;
    this.altText = altText.trim(); // 空白を除去
    this.caption = caption?.trim(); // オプションなので存在する場合のみトリム
    this.type = type;
    this.order = order;
  }

  /**
   * Imageの新しいインスタンスを作成するファクトリメソッド。
   * @param params - 画像を作成するためのパラメータ。
   * @param params.url - 画像ファイルのURL文字列。
   * @param params.altText - 画像が表示できない場合の代替テキスト。
   * @param params.caption - 画像のキャプション (オプション)。
   * @param params.type - 画像の種類 (オプション)。
   * @param params.order - 複数の画像がある場合の表示順序 (オプション)。
   * @returns Imageのインスタンス。
   */
  static create(params: {
    url: string;
    altText: string;
    caption?: string;
    type?: 'thumbnail' | 'full' | 'process' | 'screenshot';
    order?: number;
  }): Image {
    // 内部でUrlバリューオブジェクトを作成してバリデーションを委譲
    const urlInstance = Url.create(params.url);
    return new Image(
      urlInstance,
      params.altText,
      params.caption,
      params.type,
      params.order
    );
  }

  /**
   * 2つのImageオブジェクトが同じ値を持つかを比較します。
   * @param other - 比較する別のImageオブジェクト。
   * @returns 値がすべて同じであれば true、そうでなければ false。
   */
  equals(other: Image): boolean {
    if (this === other) {
      return true;
    }
    if (!(other instanceof Image)) {
      return false;
    }

    // すべてのプロパティを比較
    return (
      this.url.equals(other.url) && // Urlバリューオブジェクトのequalsメソッドを使用
      this.altText === other.altText &&
      this.caption === other.caption &&
      this.type === other.type &&
      this.order === other.order
    );
  }

 /**
   * Imageオブジェクトが有効であるかを検証する静的メソッド。
   * このメソッドは、Imageインスタンスを生成する前の初期バリデーションにも使えます。
   * 画像のURLが有効で、altTextが存在し、かつファイル形式が指定されたものに含まれるかをチェックします。
   * @param image - 検証するImageオブジェクトのデータ（urlとaltTextは必須）。
   * @returns 有効であれば true、そうでなければ false。
   */
  static isValid(image: { url: string; altText: string }): boolean {
    if (!Url.isValid(image.url) || image.altText.trim() === '') {
      return false; // 基本的なURLまたはaltTextのチェック
    }

    // ★ここから画像形式のバリデーションロジックを追加
    const allowedExtensions = ['.jpg', '.jpeg', '.png'];
    const url = new URL(image.url); // Url.isValidで有効性が保証されているため、ここでは安全にURLオブジェクトを生成

    // URLのパスからファイル拡張子を取得
    const path = url.pathname;
    const lastDotIndex = path.lastIndexOf('.');
    if (lastDotIndex === -1) {
      return false; // 拡張子がない場合は無効
    }
    const extension = path.substring(lastDotIndex).toLowerCase(); // 小文字に変換

    // 許可された拡張子に含まれるかチェック
    return allowedExtensions.includes(extension);
  }
}