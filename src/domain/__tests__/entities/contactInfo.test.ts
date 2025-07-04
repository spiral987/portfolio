import { Url } from '../../value-objects/url';
import { EmailAddress } from '../../value-objects/emailAddress';
import { ContactInfo, isValidContactInfo } from '../../entities/contactInfo';

const createValidEmailAddress = (value: string = 'test@example.com'): EmailAddress=>{
    return EmailAddress.create(value);
}

const createValidUrl = (value: string = 'https://example.com/profile'): Url => {
    return Url.create(value);
}

describe('ContactInfo Entity Validation', () => {
  let validContactInfoData: ContactInfo;

  // 各テストの前に、有効な連絡先情報のデータを初期化する
  beforeEach(() => {
    validContactInfoData = {
      email: createValidEmailAddress('my.email@domain.com'),
      websiteUrl: createValidUrl('https://mywebsite.com'),
      githubUrl: createValidUrl('https://github.com/myprofile'),
        twitterUrl: createValidUrl('https://twitter.com/myprofile'),
    };
  });
      
 // 1. 有効なデータで有効と判断されるか
  test('should return true for a valid contact info', () => {
    expect(isValidContactInfo(validContactInfoData)).toBe(true);
  });

  // 2. 無効なデータで無効と判断されるか

  // email が必須なので、無効な場合に false を返すことをテスト
  test('should return false if email is invalid', () => {
    // EmailAddress.isValid が false を返すような文字列を `value` に持つオブジェクトを偽装
    const invalidEmailValue = 'invalid-email-format';
    const contactInfoWithInvalidEmail: ContactInfo = {
      ...validContactInfoData,
      email: { value: invalidEmailValue } as EmailAddress, // EmailAddressインスタンスを偽装
    };
    expect(isValidContactInfo(contactInfoWithInvalidEmail)).toBe(false);
  });

  test('should return false if email is empty (though handled by EmailAddress VO)', () => {
    const emptyEmailValue = ' '; // 空白のみ
    const contactInfoWithEmptyEmail: ContactInfo = {
      ...validContactInfoData,
      email: { value: emptyEmailValue } as EmailAddress,
    };
    expect(isValidContactInfo(contactInfoWithEmptyEmail)).toBe(false);
  });

  // オプションのURLフィールドがnullやundefinedでも有効かテスト
  test('should return true if optional URL fields are null', () => {
    const infoWithNullUrls = {
      ...validContactInfoData,
      websiteUrl: null,
      githubUrl: null,
      twitterUrl: null,
    };
    expect(isValidContactInfo(infoWithNullUrls)).toBe(true);
  });

  test('should return true if optional URL fields are undefined', () => {
    const infoWithUndefinedUrls = {
      ...validContactInfoData,
      websiteUrl: undefined,
      githubUrl: undefined,
      twitterUrl: undefined,
    };
    expect(isValidContactInfo(infoWithUndefinedUrls)).toBe(true);
  });
});