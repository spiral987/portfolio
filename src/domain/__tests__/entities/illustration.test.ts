import { Illustration, isValidIllustration } from '../../entities/illustration';
import { Image } from '../../value-objects/image';
import { Url } from '../../value-objects/url';

const createValidImage = (url: string = 'https://example.com/image.jpg', altText: string = 'Test Image'): Image => {
  return Image.create({ url, altText });  
};  

describe('Illustration Entity Validation', () => {
  let validIllustrationData: Illustration;

  // 各テストの前に、有効なイラストのデータを初期化する
  beforeEach(() => {
    validIllustrationData = {
      id: 'illust-123',
      title: 'My Illustration',
      description: 'A short description of the illustration.',
      fullDescription: 'This is a detailed description of the illustration, explaining its context and purpose.',
      images: [createValidImage()], // 有効なImageインスタンス
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

    // 1. 有効なデータで有効と判断されるか
    test('should return true for a valid illustration', () => {
      expect(isValidIllustration(validIllustrationData)).toBe(true);
    });

    // 2. 無効なデータで無効と判断されるか
    test('should return false if illustration id is empty', () => {
      const invalidIllustration = { ...validIllustrationData, id: '' }; // 空文字列
      expect(isValidIllustration(invalidIllustration)).toBe(false);  
    });

    test('should return false if illustration title is empty', () => {
      const invalidIllustration = { ...validIllustrationData, title: '' };
      expect(isValidIllustration(invalidIllustration)).toBe(false);
    });

    test('should return false if images array is empty', () => {
      const invalidIllustration = { ...validIllustrationData, images: [] };
      expect(isValidIllustration(invalidIllustration)).toBe(false);
    });

    test('should return false if any image in the array is invalid', () => {
      const invalidImage = createValidImage('https://invalid.com/img.gif', 'Alt Text'); // 無効な形式の画像URL
      const illustrationWithInvalidImage = { ...validIllustrationData, images: [validIllustrationData.images[0], invalidImage] };
      expect(isValidIllustration(illustrationWithInvalidImage)).toBe(false);
    }); 

    test('should return false if any image in the array has an invalid URL', () => {
        const invalidUrlValue = 'invalid-url';
        const malformedUrlImage: Image={
            url: {value: invalidUrlValue} as Url, // 無効なURL
            altText: 'Alt Text',
        }as Image;
        const illustrationWithMalformedUrlImage = { ...validIllustrationData, images: [validIllustrationData.images[0], malformedUrlImage] };
        expect(isValidIllustration(illustrationWithMalformedUrlImage)).toBe(false);
    });
    
});