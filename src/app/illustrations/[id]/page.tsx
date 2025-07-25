// src/app/illustrations/[id]/page.tsx

import { FileSystemIllustrationRepository } from '@/infrastructure/repositories/file-system/fileSystemIllustrationRepository';
import { GetAllIllustrationsUseCase } from '@/use-cases/illustration/getAllIllustrationsUseCase';
import { GetIllustrationByIdUseCase } from '@/use-cases/illustration/getIllustrationByIdUseCase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// ビルド時に静的なパスを生成する
export async function generateStaticParams() {
  const illustrationRepository = new FileSystemIllustrationRepository();
  const getAllIllustrationsUseCase = new GetAllIllustrationsUseCase(illustrationRepository);
  const illustrations = await getAllIllustrationsUseCase.execute();

  return illustrations.map((illustration) => ({
    id: illustration.id,
  }));
}

export default async function IllustrationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const illustrationRepository = new FileSystemIllustrationRepository();
  const getIllustrationByIdUseCase = new GetIllustrationByIdUseCase(illustrationRepository);
  const illustration = await getIllustrationByIdUseCase.execute(id);

  if (!illustration) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-8">
      {/* メイン画像 */}
      {illustration.images.length > 0 && (
        <div className="mb-8 rounded-lg overflow-hidden">
          <Image
            src={illustration.images[0].url.value}
            alt={illustration.images[0].altText}
            width={1200}
            height={1200} // イラストは縦長の場合もあるので高さを調整
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      )}

      {/* タイトル */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
        {illustration.title}
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        {illustration.description}
      </p>

      {/* 日付 */}
      <div className="flex justify-end items-center mb-8 text-sm text-gray-500 dark:text-gray-400">
        <p className="text-gray-600 dark:text-gray-300">
            作成日: {illustration.createdAt.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
        </p>
      </div>
      
      {/* 詳細説明 (Markdown) */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: illustration.fullDescription }}
      />

      {/* ギャラリー (複数画像がある場合) */}
      {illustration.images.length > 1 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">ギャラリー</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {illustration.images.slice(1).map((image) => (
              <Image
                key={image.url.value}
                src={image.url.value}
                alt={image.altText}
                width={800}
                height={800}
                className="rounded-lg object-contain"
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}