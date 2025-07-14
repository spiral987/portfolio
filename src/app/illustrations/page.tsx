// src/app/illustrations/page.tsx

import { GetAllIllustrationsUseCase } from '@/use-cases/illustration/getAllIllustrationsUseCase';
import { FileSystemIllustrationRepository } from '@/infrastructure/repositories/file-system/fileSystemIllustrationRepository';
import { IllustrationCard } from '@/app/components/IllustrationCard'; // 作成したコンポーネントをインポート

export default async function IllustrationsPage() {
  // リポジトリとユースケースのインスタンスを作成
  const illustrationRepository = new FileSystemIllustrationRepository();
  const getAllIllustrationsUseCase = new GetAllIllustrationsUseCase(illustrationRepository);

  // すべてのイラストを取得
  const allIllustrations = await getAllIllustrationsUseCase.execute();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
        Illustrations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allIllustrations.length > 0 ? (
          allIllustrations.map((illustration) => (
            <IllustrationCard key={illustration.id} illustration={illustration} />
          ))
        ) : (
          <p className="text-gray-500">まだイラストはありません。</p>
        )}
      </div>
    </div>
  );
}