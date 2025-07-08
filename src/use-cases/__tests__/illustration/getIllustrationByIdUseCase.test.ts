// src/use-cases/__tests__/illustration/getIllustrationByIdUseCase.test.ts

import { GetIllustrationByIdUseCase } from '../../illustration/getIllustrationByIdUseCase';
import { IIllustrationRepository } from '../../../infrastructure/repositories/illustrationRepository';
import { Illustration } from '../../../domain/entities/illustration';
import { Image } from '../../../domain/value-objects/image';

describe('GetIllustrationByIdUseCase', () => {
  let mockIllustrationRepository: jest.Mocked<IIllustrationRepository>;
  let getIllustrationByIdUseCase: GetIllustrationByIdUseCase;

  // テスト用のダミーイラストデータ
  const dummyIllustration: Illustration = {
    id: 'test-illus-1',
    title: 'Test Illustration Title',
    description: 'A brief description.',
    fullDescription: 'A more detailed description for the test illustration.',
    images: [Image.create({ url: 'https://example.com/test-illus-img.jpg', altText: 'Test Illustration Image' })],
    isFeatured: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    mockIllustrationRepository = {
      getAllIllustrations: jest.fn(),
      getIllustrationById: jest.fn(), // getIllustrationById メソッドをモック
    };
    getIllustrationByIdUseCase = new GetIllustrationByIdUseCase(mockIllustrationRepository);
  });

  test('should be defined', () => {
    expect(getIllustrationByIdUseCase).toBeDefined();
  });

  test('should return the illustration with the specified ID', async () => {
    mockIllustrationRepository.getIllustrationById.mockResolvedValue(dummyIllustration);

    const result = await getIllustrationByIdUseCase.execute('test-illus-1');

    expect(result).toEqual(dummyIllustration);
    expect(mockIllustrationRepository.getIllustrationById).toHaveBeenCalledTimes(1);
    expect(mockIllustrationRepository.getIllustrationById).toHaveBeenCalledWith('test-illus-1');
  });

  test('should return null if the illustration is not found', async () => {
    mockIllustrationRepository.getIllustrationById.mockResolvedValue(null);

    const result = await getIllustrationByIdUseCase.execute('non-existent-id');

    expect(result).toBeNull();
    expect(mockIllustrationRepository.getIllustrationById).toHaveBeenCalledTimes(1);
    expect(mockIllustrationRepository.getIllustrationById).toHaveBeenCalledWith('non-existent-id');
  });
});