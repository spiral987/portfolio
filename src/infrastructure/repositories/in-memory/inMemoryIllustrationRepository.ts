// src/infrastructure/repositories/in-memory/inMemoryIllustrationRepository.ts

import { IIllustrationRepository } from '../illustrationRepository';
import { Illustration, isValidIllustration } from '../../../domain/entities/illustration';
import { Image } from '../../../domain/value-objects/image';

// ダミーデータ（開発用）
const DUMMY_ILLUSTRATIONS: Illustration[] = [
  {
    id: 'illus-1',
    title: 'ファンタジー世界の風景',
    description: 'デジタルペインティングで描かれた壮大な風景イラストです。',
    fullDescription: 'クリスタとPhotoshopを使い、約40時間かけて制作しました。光と影の表現に特に力を入れています。',
    images: [
      Image.create({ url: 'https://via.placeholder.com/800x600/FF5733/FFFFFF?text=Fantasy+Landscape+1', altText: 'ファンタジー世界の風景1', type: 'full', order: 1 }),
      Image.create({ url: 'https://via.placeholder.com/600x450/C70039/FFFFFF?text=Fantasy+Landscape+2', altText: 'ファンタジー世界の風景2 (差分)', type: 'process', order: 2 }),
    ],
    isFeatured: true, // トップページに表示する注目イラスト
    createdAt: new Date('2024-05-01T12:00:00Z'),
    updatedAt: new Date('2024-05-01T12:00:00Z'),
  },
  {
    id: 'illus-2',
    title: '未来都市の夜景',
    description: 'SF風のサイバーパンク都市のイラストです。',
    fullDescription: 'プロクリエイトで制作。ネオンの光が特徴的なイラストです。',
    images: [
      Image.create({ url: 'https://via.placeholder.com/800x600/33FF57/000000?text=Future+City+Night+1', altText: '未来都市の夜景1', type: 'full', order: 1 }),
    ],
    isFeatured: false,
    createdAt: new Date('2024-04-10T10:00:00Z'),
    updatedAt: new Date('2024-04-10T10:00:00Z'),
  },
  {
    id: 'illus-3',
    title: 'キャラクターデザイン：魔法使い',
    description: '新しいゲームのためのキャラクターデザイン案です。',
    fullDescription: '可愛らしさと神秘的な雰囲気を両立させることを目指しました。',
    images: [
      Image.create({ url: 'https://via.placeholder.com/500x700/3357FF/FFFFFF?text=Mage+Design+1', altText: '魔法使いのデザイン1', type: 'full', order: 1 }),
      Image.create({ url: 'https://via.placeholder.com/400x560/5733FF/FFFFFF?text=Mage+Design+2 (表情差分)', altText: '魔法使いのデザイン2', type: 'process', order: 2 }),
    ],
    isFeatured: true, // トップページに表示する注目イラスト
    createdAt: new Date('2024-06-05T15:00:00Z'),
    updatedAt: new Date('2024-06-05T15:00:00Z'),
  },
];

/**
 * メモリ上にイラストデータを保持するインメモリリポジトリの実装。
 * IIllustrationRepositoryインターフェースを実装します。
 * 開発やテストに便利です。
 */
export class InMemoryIllustrationRepository implements IIllustrationRepository {
  private illustrations: Illustration[] = [];

  constructor() {
    // ダミーデータを初期化時にコピー（実際のデータを直接変更しないように）
    this.illustrations = DUMMY_ILLUSTRATIONS.map(i => {
      // バリデーションを通じて有効なIllustrationインスタンスを作成するように変換
      if (!isValidIllustration(i)) {
        throw new Error(`Invalid dummy illustration data: ${i.title}`);
      }
      return i;
    });
  }

  async getAllIllustrations(): Promise<Illustration[]> {
    // 実際のアプリケーションでは、ここでデータベースクエリなどを実行します。
    // 現時点では、メモリ上のデータを返します。
    // 返す前に、必要に応じてソートやフィルタリングを行うこともできます。
    return Promise.resolve(this.illustrations);
  }

  async getIllustrationById(id: string): Promise<Illustration | null> {
    // this.illustrations 配列の中から、引数で渡された `id` と一致するイラストを探します。
    const illustration = this.illustrations.find(i => i.id === id);

    // 見つかったイラスト、または見つからなかった場合は null を Promise でラップして返します。
    return Promise.resolve(illustration || null);
  }
}