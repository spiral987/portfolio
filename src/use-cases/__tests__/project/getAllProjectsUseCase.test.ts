import { IProjectRepository } from "@/infrastructure/repositories/projectRepository"
import { GetAllProjectsUseCase } from "../../project/getAllProjectsUseCase";
import { Project } from "../../../domain/entities/project";
import { Image } from "../../../domain/value-objects/image";
import { Url } from "../../../domain/value-objects/url";

describe('GetAllProjectsUseCase', () =>{
    let mockProjectRepository: jest.Mocked<IProjectRepository>;
    let getAllProjectsUseCase: GetAllProjectsUseCase;

    beforeEach(()=>{
        mockProjectRepository = {
            getAllProjects: jest.fn(),
            getProjectById: jest.fn(),
        };

        //ユースケースのインスタンスを作成し、モックを注入する
        getAllProjectsUseCase = new GetAllProjectsUseCase(mockProjectRepository);
    });

    // 1. ユースケースが正しくインスタンス化されるか(nullやundefinedでないことを確認)
    test('should be defined', ()=> {
        expect(getAllProjectsUseCase).toBeDefined();
    });


     // 2. `execute` メソッドが期待通りにリポジトリからデータを取得し、適切な結果を返すか
  test('should return all projects from the repository', async () => {
    // テスト用のダミープロジェクトデータ
    const dummyProjects: Project[] = [
      {
        id: '1',
        title: 'Project A',
        description: 'Desc A',
        fullDescription: 'Full Desc A',
        images: [Image.create({ url: 'https://example.com/a.jpg', altText: 'Image A' })],
        techStack: ['React'],
        projectUrl: Url.create('https://proj.com/a'),
        githubUrl: null,
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'Project B',
        description: 'Desc B',
        fullDescription: 'Full Desc B',
        images: [Image.create({ url: 'https://example.com/b.jpg', altText: 'Image B' })],
        techStack: ['Vue'],
        projectUrl: null,
        githubUrl: Url.create('https://github.com/proj/b'),
        isFeatured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // mockProjectRepository.getAllProjects が呼び出されたときに、
    // dummyProjects を返すように設定
    mockProjectRepository.getAllProjects.mockResolvedValue(dummyProjects);

    // ユースケースの実行
    const result = await getAllProjectsUseCase.execute();

    // 期待される結果の検証
    expect(result).toEqual(dummyProjects); // 返されたデータがダミーデータと一致するか
    expect(mockProjectRepository.getAllProjects).toHaveBeenCalledTimes(1); // リポジトリのメソッドが1回だけ呼び出されたか
    expect(mockProjectRepository.getAllProjects).toHaveBeenCalled(); // リポジトリのメソッドが呼び出されたか
  });




})