// src/app/components/IllustrationCard.tsx
import { Illustration } from '@/domain/entities/illustration';
import Image from 'next/image';
import Link from 'next/link';

// プロパティの型定義を修正
type Props = {
  illustration: Illustration;
  isHomePage?: boolean; // トップページ用のフラグ（オプション）
};

// props を分割代入し、isHomePage のデフォルト値を false に設定
export const IllustrationCard = ({ illustration, isHomePage = false }: Props) => (
  <Link
    href={`/illustrations/${illustration.id}`}
    // ★ shadow-lg を shadow-md に少し抑え、hover:shadow-xl に変更
    className="group block overflow-hidden rounded-lg"
    data-year={new Date(illustration.createdAt).getFullYear()}
  >
    {illustration.images.length > 0 && (
      <>
        {isHomePage ? (
          // --- トップページ用の表示 ---
          <>
            <div className="overflow-hidden aspect-[3/4] relative">
              <Image
                src={illustration.images[0].url.value}
                alt={illustration.images[0].altText}
                fill
                style={{ objectPosition: illustration.objectPosition || 'center' }}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>

            {/* ★ タイトルと説明文エリアを追加 */}
            <div className="p-3">
              <h3 className="text-md font-bold text-gray-900 dark:text-gray-100 truncate">
                {illustration.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {illustration.description}
              </p>
            </div>
          </>
        ) : (
          // --- イラスト一覧ページ用の表示（元々のレイアウト） ---
          <div className="overflow-hidden">
            <Image
              src={illustration.images[0].url.value}
              alt={illustration.images[0].altText}
              height={300}
              width={300}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </>
    )}
  </Link>
);