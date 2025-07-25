// src/app/illustrations/page.tsx

import { GetAllIllustrationsUseCase } from '@/use-cases/illustration/getAllIllustrationsUseCase';
import { FileSystemIllustrationRepository } from '@/infrastructure/repositories/file-system/fileSystemIllustrationRepository';
import { IllustrationGallery } from '@/app/illustrations/IllustrationGallery';

export default async function IllustrationsPage() {
  // リポジトリとユースケースのインスタンスを作成
  const illustrationRepository = new FileSystemIllustrationRepository();
  const getAllIllustrationsUseCase = new GetAllIllustrationsUseCase(illustrationRepository);

  // すべてのイラストを取得
  const allIllustrations = await getAllIllustrationsUseCase.execute();

  // JSON.stringifyとJSON.parseを使って、Dateオブジェクトを文字列に変換
  const plainIllustrations = JSON.parse(JSON.stringify(allIllustrations));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
        Illustrations
      </h1>
      <div>
        {allIllustrations.length > 0 ? (
          <IllustrationGallery illustrations={plainIllustrations} />
        ) : (
          <p className="text-gray-500">まだイラストはありません。</p>
        )}
      </div>
    </div>
  );
}