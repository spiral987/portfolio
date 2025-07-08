// src/use-cases/__tests__/illustration/getFeaturedIllustrationsUseCase.test.ts

import { GetFeaturedIllustrationsUseCase } from '../../illustration/getFeaturedIllustrationsUseCase';
import { IIllustrationRepository } from '../../../infrastructure/repositories/illustrationRepository';
import { Illustration } from '../../../domain/entities/illustration';
import { Image } from '../../../domain/value-objects/image';

describe('GetFeaturedIllustrationsUseCase', () => {
  let mockIllustrationRepository: jest.Mocked<IIllustrationRepository>;
  let getFeaturedIllustrationsUseCase: GetFeaturedIllustrationsUseCase;

  // テスト用のダミーイラストデータ
  const dummyIllustrations: Illustration[] = [
    {
      id: '1', title: 'Featured Illustration One', description: 'Desc One', fullDescription: 'Full Desc One',
      images: [Image.create({ url: 'https://example.com/f1.jpg', altText: 'Featured Image 1' })],
      isFeatured: true, // ★注目イラスト
      createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-01-10'),
    },
    {
      id: '2', title: 'Normal Illustration Two', description: 'Desc Two', fullDescription: 'Full Desc Two',
      images: [Image.create({ url: 'https://example.com/n2.jpg', altText: 'Normal Image 2' })],
      isFeatured: false, // ★非注目イラスト
      createdAt: new Date('2024-02-15'), updatedAt: new Date('2024-02-15'),
    },
    {
      id: '3', title: 'Featured Illustration Three', description: 'Desc Three', fullDescription: 'Full Desc Three',
      images: [Image.create({ url: 'https://example.com/f3.jpg', altText: 'Featured Image 3' })],
      isFeatured: true, // ★注目イラスト
      createdAt: new Date('2024-03-20'), updatedAt: new Date('2024-03-20'),
    },
  ];

  beforeEach(() => {
    mockIllustrationRepository = {
      getAllIllustrations: jest.fn(),
      getIllustrationById: jest.fn(),
    };
    getFeaturedIllustrationsUseCase = new GetFeaturedIllustrationsUseCase(mockIllustrationRepository);
  });

  test('should be defined', () => {
    expect(getFeaturedIllustrationsUseCase).toBeDefined();
  });

  test('should return only featured illustrations', async () => {
    mockIllustrationRepository.getAllIllustrations.mockResolvedValue(dummyIllustrations);

    const result = await getFeaturedIllustrationsUseCase.execute();

    const expectedFeaturedIllustrations = dummyIllustrations.filter(i => i.isFeatured);

    expect(result).toEqual(expectedFeaturedIllustrations);
    expect(mockIllustrationRepository.getAllIllustrations).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if no featured illustrations are found', async () => {
    const noFeaturedIllustrations: Illustration[] = dummyIllustrations.map(i => ({ ...i, isFeatured: false }));
    mockIllustrationRepository.getAllIllustrations.mockResolvedValue(noFeaturedIllustrations);

    const result = await getFeaturedIllustrationsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockIllustrationRepository.getAllIllustrations).toHaveBeenCalledTimes(1);
  });

  test('should return an empty array if the repository returns an empty list', async () => {
    mockIllustrationRepository.getAllIllustrations.mockResolvedValue([]);

    const result = await getFeaturedIllustrationsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockIllustrationRepository.getAllIllustrations).toHaveBeenCalledTimes(1);
  });
});