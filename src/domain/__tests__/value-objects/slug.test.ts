// src/domain/__tests__/value-objects/slug.test.ts

import { Slug } from '../../value-objects/slug';

describe('Slug Value Object', () => {
  // 有効なスラッグでインスタンスが作成できるかテスト
  test('should create a Slug instance for a valid slug', () => {
    const validSlug = 'my-first-blog-post';
    const slugInstance = Slug.create(validSlug);
    expect(slugInstance).toBeInstanceOf(Slug);
    expect(slugInstance.value).toBe(validSlug);
  });

  // 無効なスラッグでエラーがスローされるかテスト
  test('should throw an error for an invalid slug format', () => {
    // スペースを含む
    expect(() => Slug.create('invalid slug')).toThrow('Invalid slug format: invalid slug');
    // 大文字を含む
    expect(() => Slug.create('InvalidSlug')).toThrow('Invalid slug format: InvalidSlug');
    // 特殊文字を含む
    expect(() => Slug.create('invalid!slug')).toThrow('Invalid slug format: invalid!slug');
    // 先頭がハイフン
    expect(() => Slug.create('-invalid-slug')).toThrow('Invalid slug format: -invalid-slug');
    // 末尾がハイフン
    expect(() => Slug.create('invalid-slug-')).toThrow('Invalid slug format: invalid-slug-');
    // 連続するハイフン
    expect(() => Slug.create('invalid--slug')).toThrow('Invalid slug format: invalid--slug');
    // 空文字列
    expect(() => Slug.create('')).toThrow('Invalid slug format: ');
    // 空白のみ
    expect(() => Slug.create(' ')).toThrow('Invalid slug format: ');
    // 数字のみでも有効
    const numericSlug = '12345';
    const slugInstance = Slug.create(numericSlug);
    expect(slugInstance.value).toBe(numericSlug);
  });

  // 同じ値のSlugオブジェクトが等しいと判断されるかテスト
  test('should consider two Slug objects with the same value as equal', () => {
    const slug1 = Slug.create('article-one');
    const slug2 = Slug.create('article-one');
    const slug3 = Slug.create('article-two');

    expect(slug1.equals(slug2)).toBe(true);
    expect(slug1.equals(slug3)).toBe(false);
  });

  // toStringメソッドが正しく値を返すかテスト
  test('should return the slug string using toString method', () => {
    const slug = Slug.create('my-portfolio-update');
    expect(slug.toString()).toBe('my-portfolio-update');
  });

  // isValid静的メソッドの単体テスト
  describe('Slug.isValid static method', () => {
    test('should return true for valid slug formats', () => {
      expect(Slug.isValid('valid-slug')).toBe(true);
      expect(Slug.isValid('another-valid-slug-123')).toBe(true);
      expect(Slug.isValid('slug')).toBe(true);
      expect(Slug.isValid('123')).toBe(true);
    });

    test('should return false for invalid slug formats', () => {
      expect(Slug.isValid('Invalid-Slug')).toBe(false); // 大文字
      expect(Slug.isValid('invalid slug')).toBe(false); // スペース
      expect(Slug.isValid('invalid!slug')).toBe(false); // 特殊文字
      expect(Slug.isValid('-invalid-slug')).toBe(false); // 先頭ハイフン
      expect(Slug.isValid('invalid-slug-')).toBe(false); // 末尾ハイフン
      expect(Slug.isValid('invalid--slug')).toBe(false); // 連続ハイフン
      expect(Slug.isValid('')).toBe(false); // 空文字列
      expect(Slug.isValid(' ')).toBe(false); // 空白のみ
      expect(Slug.isValid('test/path')).toBe(false); // スラッシュ
    });
  });
});