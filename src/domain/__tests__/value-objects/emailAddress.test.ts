// src/domain/__tests__/value-objects/image.test.ts

import { Image } from '../../value-objects/image';
import { Url } from '../../value-objects/url'; // Url もインポートしてモックなどに使うこともできますが、今回は不要です

describe('Image Value Object', () => {
  // 有効な画像データでインスタンスが作成できるかテスト
  test('should create an Image instance for valid image data', () => {
    const imageData = {
      url: 'https://example.com/image.jpg',
      altText: 'A beautiful landscape',
      caption: 'This is a sample image.',
      type: 'full' as const,
      order: 1,
    };
    const imageInstance = Image.create(imageData);

    expect(imageInstance).toBeInstanceOf(Image);
    expect(imageInstance.url).toBeInstanceOf(Url); // urlがUrlインスタンスになっていること
    expect(imageInstance.url.value).toBe(imageData.url);
    expect(imageInstance.altText).toBe(imageData.altText);
    expect(imageInstance.caption).toBe(imageData.caption);
    expect(imageInstance.type).toBe(imageData.type);
    expect(imageInstance.order).toBe(imageData.order);
  });

  // altTextが空の場合にエラーがスローされるかテスト
  test('should throw an error if altText is empty', () => {
    const invalidImageData = {
      url: 'https://example.com/image.jpg',
      altText: '   ', // 空白のみ
    };
    expect(() => Image.create(invalidImageData)).toThrow('Image altText cannot be empty.');
  });

  // 無効なURLの場合にエラーがスローされるかテスト (Urlバリューオブジェクトのバリデーションに依存)
  test('should throw an error if url is invalid', () => {
    const invalidUrlData = {
      url: 'invalid-url-format',
      altText: 'Some alt text',
    };
    // Url.create() がエラーをスローするため、Image.create() もエラーをスローする
    expect(() => Image.create(invalidUrlData)).toThrow('Invalid URL format: invalid-url-format');
  });

  // 同じ値のImageオブジェクトが等しいと判断されるかテスト
  test('should consider two Image objects with the same values as equal', () => {
    const img1 = Image.create({ url: 'https://img.com/a.jpg', altText: 'Alt A', caption: 'Cap A' });
    const img2 = Image.create({ url: 'https://img.com/a.jpg', altText: 'Alt A', caption: 'Cap A' });
    const img3 = Image.create({ url: 'https://img.com/b.jpg', altText: 'Alt B', caption: 'Cap B' });
    const img4 = Image.create({ url: 'https://img.com/a.jpg', altText: 'Alt A', caption: 'Cap B' }); // captionが異なる

    expect(img1.equals(img2)).toBe(true);
    expect(img1.equals(img3)).toBe(false);
    expect(img1.equals(img4)).toBe(false);
  });

  // 異なるオブジェクトタイプとの比較でfalseを返すかテスト
  test('should return false when comparing with a non-Image object', () => {
    const img = Image.create({ url: 'https://img.com/a.jpg', altText: 'Alt A' });
    expect(img.equals({ url: 'https://img.com/a.jpg', altText: 'Alt A' } as any)).toBe(false);
    expect(img.equals(null as any)).toBe(false);
    expect(img.equals(undefined as any)).toBe(false);
  });

  // static isValid メソッドのテスト
    describe('Image.isValid static method', () => {
    test('should return true for valid image data', () => {
        expect(Image.isValid({ url: 'https://valid.com/img.png', altText: 'Valid Alt' })).toBe(true);
        expect(Image.isValid({ url: 'http://valid.com/img.png', altText: 'Valid Alt' })).toBe(true);
    });

    test('should return false for invalid image data', () => {
        expect(Image.isValid({ url: 'invalid-url', altText: 'Valid Alt' })).toBe(false); // 無効なURL
        expect(Image.isValid({ url: 'https://valid.com/img.png', altText: '' })).toBe(false); // altTextが空
        expect(Image.isValid({ url: 'https://valid.com/img.png', altText: '   ' })).toBe(false); // altTextが空白のみ
    });
    test('should return true for valid image formats (.jpg, .jpeg, .png)', () => {
        expect(Image.isValid({ url: 'https://valid.com/img.jpg', altText: 'Valid Alt' })).toBe(true);
        expect(Image.isValid({ url: 'https://valid.com/img.jpeg', altText: 'Valid Alt' })).toBe(true);
        expect(Image.isValid({ url: 'https://valid.com/img.png', altText: 'Valid Alt' })).toBe(true);
        expect(Image.isValid({ url: 'https://valid.com/img.JPG', altText: 'Valid Alt' })).toBe(true); // 大文字の拡張子もテスト
    });
    test('should return false for invalid image formats (.gif, .webp, no extension)', () => {
        expect(Image.isValid({ url: 'https://valid.com/img.gif', altText: 'Valid Alt' })).toBe(false);
        expect(Image.isValid({ url: 'https://valid.com/img.webp', altText: 'Valid Alt' })).toBe(false);
        expect(Image.isValid({ url: 'https://valid.com/img', altText: 'Valid Alt' })).toBe(false); // 拡張子なし
        expect(Image.isValid({ url: 'https://valid.com/img.', altText: 'Valid Alt' })).toBe(false); // ドットのみ
    });
  });


});