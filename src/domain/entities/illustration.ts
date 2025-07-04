// src/domain/entities/illustration.ts
import { Image} from '../value-objects/image';

export interface Illustration{
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    images: Image[];
    isFeatured: boolean; // トップページに表示するかどうか
    createdAt: Date;
    updatedAt: Date;
}

export function isValidIllustration(illustration: Illustration): boolean {
  return illustration.id.trim() !== '' &&
         illustration.title.trim() !== '' &&
         illustration.images.length > 0 && // 少なくとも1つの画像が必要
         illustration.images.every(img => Image.isValid({ url: img.url.value, altText: img.altText })); // 各画像が有効であること
}