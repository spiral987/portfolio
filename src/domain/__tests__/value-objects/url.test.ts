import { Url } from '../../value-objects/url';

describe('Url Value Object', () => {
  // 有効なURLでインスタンスが作成できるかテスト
  test('should create a Url instance for a valid URL', () => {
    const validUrl = 'https://www.example.com';
    const urlInstance = Url.create(validUrl); //Arrange(Act) インスタンスを作成
    expect(urlInstance).toBeInstanceOf(Url); //Assert 作成したものがUrlのインスタンスであることを確認
    expect(urlInstance.value).toBe(validUrl); //Assert インスタンスの値が正しいことを確認
  });

  // 無効なURLでエラーがスローされるかテスト
  test('should throw an error for an invalid URL', () => {
    const invalidUrl = 'invalid-url'; //Arrange(Act)
    expect(() => Url.create(invalidUrl)).toThrow('Invalid URL format: invalid-url'); //Assert
  });

  // httpプロトコルでも有効かテスト
  test('should be valid for http protocol', () => {
    const httpUrl = 'http://example.com/path'; //Arrange
    const urlInstance = Url.create(httpUrl); //Act
    expect(urlInstance.value).toBe(httpUrl); //Assert
  });

  // ftpプロトコルなどの無効なプロトコルでエラーがスローされるかテスト
  test('should throw an error for unsupported protocols like ftp', () => {
    const ftpUrl = 'ftp://example.com/file';
    expect(() => Url.create(ftpUrl)).toThrow('Invalid URL format: ftp://example.com/file');
  });

  // 同じ値のURLオブジェクトが等しいと判断されるかテスト
  test('should consider two Url objects with the same value as equal', () => {
    const url1 = Url.create('https://test.com/page1');
    const url2 = Url.create('https://test.com/page1');
    const url3 = Url.create('https://test.com/page2');

    expect(url1.equals(url2)).toBe(true);
    expect(url1.equals(url3)).toBe(false);
  });

  // toStringメソッドが正しく値を返すかテスト
  test('should return the URL string using toString method', () => {
    const url = Url.create('https://mywebsite.com/about');
    expect(url.toString()).toBe('https://mywebsite.com/about');
  });
});