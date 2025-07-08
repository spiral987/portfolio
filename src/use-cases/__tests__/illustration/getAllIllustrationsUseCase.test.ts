// src/use-cases/__tests__/illustration/getAllIllustrationsUseCase.test.ts

import { GetAllIllustrationsUseCase } from '../../illustration/getAllIllustrationsUseCase';
import { IIllustrationRepository } from '../../../infrastructure/repositories/illustrationRepository';
import { Illustration } from '../../../domain/entities/illustration';
import { Image } from '../../../domain/value-objects/image';

describe('GetAllIllustrationsUseCase', () => {
  let mockIllustrationRepository: jest.Mocked<IIllustrationRepository>;
  let getAllIllustrationsUseCase: GetAllIllustrationsUseCase;

  // テスト用のダミーイラストデータ
  const dummyIllustrations: Illustration[] = [
    {
      id: '1', title: 'Illustration A', description: 'Desc A', fullDescription: 'Full Desc A',
      images: [Image.create({ url: 'https://example.com/a.jpg', altText: 'Image A' })],
      isFeatured: true, createdAt: new Date(), updatedAt: new Date(),
    },
    {
      id: '2', title: 'Illustration B', description: 'Desc B', fullDescription: 'Full Desc B',
      images: [Image.create({ url: 'https://example.com/b.jpg', altText: 'Image B' })],
      isFeatured: false, createdAt: new Date(), updatedAt: new Date(),
    },
  ];

    // 各テストの前にモックを初期化
  beforeEach(() => {
    mockIllustrationRepository = {
      getAllIllustrations: jest.fn(),
      getIllustrationById: jest.fn(),
    };

    // ユースケースのインスタンスを作成し、モックを注入する
    getAllIllustrationsUseCase = new GetAllIllustrationsUseCase(mockIllustrationRepository);
  });

  test('should be defined', () => {
    expect(getAllIllustrationsUseCase).toBeDefined();
  });

  test('should return all illustrations from the repository', async () => {
    mockIllustrationRepository.getAllIllustrations.mockResolvedValue(dummyIllustrations);

    const result = await getAllIllustrationsUseCase.execute();

    expect(result).toEqual(dummyIllustrations);
    expect(mockIllustrationRepository.getAllIllustrations).toHaveBeenCalledTimes(1);
    expect(mockIllustrationRepository.getAllIllustrations).toHaveBeenCalled();
  });

  test('should return an empty array if no illustrations are found', async () => {
    mockIllustrationRepository.getAllIllustrations.mockResolvedValue([]);

    const result = await getAllIllustrationsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockIllustrationRepository.getAllIllustrations).toHaveBeenCalledTimes(1);
  });
});