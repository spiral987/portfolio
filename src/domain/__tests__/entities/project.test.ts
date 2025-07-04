// src/domain/__tests__/entities/project.test.ts

import { Project, isValidProject } from '../../entities/project';
import { Image } from '../../value-objects/image';
import { Url } from '../../value-objects/url';

// テスト用のダミーの有効なImageとUrlインスタンスを生成するヘルパー関数
// これにより、テストケースごとに複雑なImageやUrlのデータを作成する手間を省く
const createValidImage = (url: string = 'https://example.com/image.jpg', altText: string = 'Test Image'): Image => {
  return Image.create({ url, altText });
};

const createValidUrl = (url: string = 'https://example.com/project'): Url => {
  return Url.create(url);
};

describe('Project Entity Validation', () => {
  let validProjectData: Project;

  // 各テストの前に、有効なプロジェクトのデータを初期化する
  beforeEach(() => {
    validProjectData = {
      id: 'proj-123',
      title: 'My Awesome Project',
      description: 'A short description.',
      fullDescription: 'This is a very long and detailed description of the project.',
      images: [createValidImage()], // 有効なImageインスタンス
      techStack: ['React', 'TypeScript', 'Node.js'],
      projectUrl: createValidUrl('https://myproject.com'), // 有効なUrlインスタンス
      githubUrl: createValidUrl('https://github.com/my/project'), // 有効なUrlインスタンス
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  // 1. 有効なデータで有効と判断されるか
  test('should return true for a valid project', () => {
    expect(isValidProject(validProjectData)).toBe(true);
  });

  // 2. 無効なデータで無効と判断されるか
  test('should return false if project title is empty', () => {
    const invalidProject = { ...validProjectData, title: '' };
    expect(isValidProject(invalidProject)).toBe(false);
  });

  test('should return false if project description is empty', () => {
    const invalidProject = { ...validProjectData, description: '   ' }; // 空白のみ
    expect(isValidProject(invalidProject)).toBe(false);
  });

  test('should return false if images array is empty', () => {
    const invalidProject = { ...validProjectData, images: [] };
    expect(isValidProject(invalidProject)).toBe(false);
  });

  test('should return false if any image in the array is invalid', () => {
    const invalidImage = createValidImage('https://invalid.com/img.gif', 'Alt Text'); // 無効な形式の画像URL
    const projectWithInvalidImage = { ...validProjectData, images: [validProjectData.images[0], invalidImage] };
    expect(isValidProject(projectWithInvalidImage)).toBe(false);
  });

  test('should return false if projectUrl is provided but invalid', () => {
    const invalidUrlValue = 'invalid-url';
    const projectWithInvalidUrl = { ...validProjectData, projectUrl: {value: invalidUrlValue} as Url }; // Urlバリューオブジェクトがエラーをスローするケースを直接渡す
    expect(isValidProject(projectWithInvalidUrl)).toBe(false);
  });
  
  test('should return false if githubUrl is provided but invalid', () => {
    const invalidUrlValue = 'invalid-github-url';
    const projectWithInvalidGithubUrl = { ...validProjectData, githubUrl: {value: invalidUrlValue} as Url }; // Urlバリューオブジェクトがエラーをスローするケースを直接渡す
    expect(isValidProject(projectWithInvalidGithubUrl)).toBe(false);
  });

  // null のURLが有効と判断されるか
  test('should return true if projectUrl and githubUrl are null', () => {
    const projectWithNullUrls = { ...validProjectData, projectUrl: null, githubUrl: null };
    expect(isValidProject(projectWithNullUrls)).toBe(true);
  });
});