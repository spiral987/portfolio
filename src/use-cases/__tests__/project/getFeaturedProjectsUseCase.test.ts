// src/use-cases/__tests__/project/getFeaturedProjectsUseCase.test.ts

import { GetFeaturedProjectsUseCase } from '../../project/getFeaturedProjectsUseCase';
import { IProjectRepository } from '../../../infrastructure/repositories/projectRepository';
import { Project } from '../../../domain/entities/project';
import { Image } from '../../../domain/value-objects/image';
import { Url } from '../../../domain/value-objects/url';

describe('GetFeaturedProjectsUseCase', () => {
  let mockProjectRepository: jest.Mocked<IProjectRepository>;
  let getFeaturedProjectsUseCase: GetFeaturedProjectsUseCase;

  // テスト用のダミープロジェクトデータ
  const dummyProjects: Project[] = [
    {
      id: '1',
      title: 'Featured Project One',
      description: 'Featured Desc One',
      fullDescription: 'Full Desc One',
      images: [Image.create({ url: 'https://example.com/f1.jpg', altText: 'Featured Image 1' })],
      techStack: ['React'],
      projectUrl: Url.create('https://proj.com/f1'),
      githubUrl: null,
      isFeatured: true, // ★注目作品
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10'),
    },
    {
      id: '2',
      title: 'Normal Project Two',
      description: 'Normal Desc Two',
      fullDescription: 'Full Desc Two',
      images: [Image.create({ url: 'https://example.com/n2.jpg', altText: 'Normal Image 2' })],
      techStack: ['Vue'],
      projectUrl: null,
      githubUrl: Url.create('https://github.com/proj/n2'),
      isFeatured: false, // ★非注目作品
      createdAt: new Date('2024-02-15'),
      updatedAt: new Date('2024-02-15'),
    },
    {
      id: '3',
      title: 'Featured Project Three',
      description: 'Featured Desc Three',
      fullDescription: 'Full Desc Three',
      images: [Image.create({ url: 'https://example.com/f3.jpg', altText: 'Featured Image 3' })],
      techStack: ['Angular'],
      projectUrl: Url.create('https://proj.com/f3'),
      githubUrl: null,
      isFeatured: true, // ★注目作品
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-20'),
    },
  ];

  beforeEach(() => {
    mockProjectRepository = {
      getAllProjects: jest.fn(),
      getProjectById: jest.fn(),
    };
    getFeaturedProjectsUseCase = new GetFeaturedProjectsUseCase(mockProjectRepository);
  });

  // 1. ユースケースが正しくインスタンス化されるか
  test('should be defined', () => {
    expect(getFeaturedProjectsUseCase).toBeDefined();
  });

  // 2. 注目作品のみをフィルタリングして返すか
  test('should return only featured projects', async () => {
    // リポジトリが全てのダミープロジェクトを返すように設定
    mockProjectRepository.getAllProjects.mockResolvedValue(dummyProjects);

    const result = await getFeaturedProjectsUseCase.execute();

    // 期待される結果: isFeatured が true のプロジェクトのみ
    const expectedFeaturedProjects = dummyProjects.filter(p => p.isFeatured);

    expect(result).toEqual(expectedFeaturedProjects);
    expect(mockProjectRepository.getAllProjects).toHaveBeenCalledTimes(1); // リポジトリのgetAllProjectsが呼ばれたことを確認
  });

  // 3. 注目作品がない場合に空の配列を返すか
  test('should return an empty array if no featured projects are found', async () => {

    const noFeaturedProjects: Project[] = dummyProjects.map(p => ({ ...p, isFeatured: false }));    // isFeatured が全て false のダミーデータを作成
    mockProjectRepository.getAllProjects.mockResolvedValue(noFeaturedProjects); // リポジトリがダミープロジェクトを返すように設定

    const result = await getFeaturedProjectsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockProjectRepository.getAllProjects).toHaveBeenCalledTimes(1);
  });

  // 4. リポジトリが空のプロジェクトリストを返した場合
  test('should return an empty array if the repository returns an empty list', async () => {
    mockProjectRepository.getAllProjects.mockResolvedValue([]);// リポジトリが空の配列を返すように設定

    const result = await getFeaturedProjectsUseCase.execute();

    expect(result).toEqual([]);
    expect(mockProjectRepository.getAllProjects).toHaveBeenCalledTimes(1);
  });
});