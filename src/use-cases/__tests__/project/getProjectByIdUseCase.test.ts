// src/use-cases/__tests__/project/getProjectByIdUseCase.test.ts

import { GetProjectByIdUseCase } from '../../project/getProjectByIdUseCase';
import { IProjectRepository } from '../../../infrastructure/repositories/projectRepository';
import { Project } from '../../../domain/entities/project';
import { Image } from '../../../domain/value-objects/image';
import { Url } from '../../../domain/value-objects/url';

describe('GetProjectByIdUseCase', () => {
  let mockProjectRepository: jest.Mocked<IProjectRepository>;
  let getProjectByIdUseCase: GetProjectByIdUseCase;

  // テスト用のダミープロジェクトデータ
  const dummyProject: Project = {
    id: 'test-project-1',
    title: 'Test Project Title',
    description: 'A brief description.',
    fullDescription: 'A more detailed description for the test project.',
    images: [Image.create({ url: 'https://example.com/test-img.jpg', altText: 'Test Image' })],
    techStack: ['Jest', 'TypeScript'],
    projectUrl: Url.create('https://test-project.com'),
    githubUrl: null,
    isFeatured: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    mockProjectRepository = {
      getAllProjects: jest.fn(),
      getProjectById: jest.fn(), // getProjectById メソッドをモック
    };
    getProjectByIdUseCase = new GetProjectByIdUseCase(mockProjectRepository);
  });

  // 1. ユースケースが正しくインスタンス化されるか
  test('should be defined', () => {
    expect(getProjectByIdUseCase).toBeDefined();
  });

  // 2. 指定したIDのプロジェクトを正しく返すか
  test('should return the project with the specified ID', async () => {
    // mockProjectRepository.getProjectById がダミープロジェクトを返すように設定
    mockProjectRepository.getProjectById.mockResolvedValue(dummyProject);

    const result = await getProjectByIdUseCase.execute('test-project-1');

    // 期待される結果の検証
    expect(result).toEqual(dummyProject); // 返されたデータがダミーデータと一致するか
    expect(mockProjectRepository.getProjectById).toHaveBeenCalledTimes(1); // リポジトリのメソッドが1回だけ呼び出されたか
    expect(mockProjectRepository.getProjectById).toHaveBeenCalledWith('test-project-1'); // 引数が正しいか
  });

  // 3. プロジェクトが見つからない場合にnullを返すか
  test('should return null if the project is not found', async () => {
    // mockProjectRepository.getProjectById がnullを返すように設定
    mockProjectRepository.getProjectById.mockResolvedValue(null);

    const result = await getProjectByIdUseCase.execute('non-existent-id');

    expect(result).toBeNull(); // nullが返されるか
    expect(mockProjectRepository.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectRepository.getProjectById).toHaveBeenCalledWith('non-existent-id');
  });

  // 4. 無効なIDが与えられた場合の動作 (このユースケースではリポジトリがnullを返すので特別なエラーは不要)
  test('should return null for an invalid format ID (if repository returns null)', async () => {
    // 例えば、IDの形式バリデーションをユースケース層で追加しない場合
    mockProjectRepository.getProjectById.mockResolvedValue(null);

    const result = await getProjectByIdUseCase.execute('!@#invalid-id%^&*'); // 無効な形式のID

    expect(result).toBeNull();
    expect(mockProjectRepository.getProjectById).toHaveBeenCalledTimes(1);
    expect(mockProjectRepository.getProjectById).toHaveBeenCalledWith('!@#invalid-id%^&*');
  });
});