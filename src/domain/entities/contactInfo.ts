// src/domain/entities/contactInfo.ts

import { EmailAddress } from '../value-objects/emailAddress'; // EmailAddressバリューオブジェクトをインポート
import { Url } from '../value-objects/url';                   // Urlバリューオブジェクトをインポート

/**
 * 連絡先情報を表すエンティティ
 * (通常は単一のインスタンスで構成されることを想定)
 */
export interface ContactInfo {
  email: EmailAddress;          // メールアドレス (EmailAddressバリューオブジェクト)
  websiteUrl?: Url | null;      // 個人のウェブサイトURL (Urlバリューオブジェクト, オプション)
  githubUrl?: Url | null;       // GitHubプロフィールURL (Urlバリューオブジェクト, オプション)
  twitterUrl?: Url | null;      // Twitter/XプロフィールURL (Urlバリューオブジェクト, オプション)
  pixivUrl?: Url | null;        // PixivプロフィールURL (Urlバリューオブジェクト, オプション)
  skebUrl?: Url | null;         // SkebプロフィールURL (Urlバリューオブジェクト, オプション)
}

/**
 * ContactInfoオブジェクトが有効であるかを検証する関数
 */
export function isValidContactInfo(info: ContactInfo): boolean {
  // メールアドレスが有効であること
  return EmailAddress.isValid(info.email.value);

}