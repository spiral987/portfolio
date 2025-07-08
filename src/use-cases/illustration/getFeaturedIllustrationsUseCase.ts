import { Illustration } from "@/domain/entities/illustration";
import { IIllustrationRepository } from "@/infrastructure/repositories/illustrationRepository";



export class GetFeaturedIllustrationsUseCase{
    private readonly illustrationRepository: IIllustrationRepository;


/** * 注目のイラストを取得するためのユースケース。
 * アプリケーション固有のビジネスロジック（この場合は注目のイラストを取得する）をカプセル化します。
 */
    constructor(illustrationRepository: IIllustrationRepository) {
        this.illustrationRepository = illustrationRepository;
    }
    /**
     * ユースケースを実行し、注目のイラストを取得します。
     * @returns 注目のイラストの配列を解決するPromise。
     */
    async execute(): Promise<Illustration[]> {
        // ここで注目のイラストを取得するロジックを実装します。
        // 例えば、リポジトリからすべてのイラストを取得し、isFeaturedがtrueのものだけをフィルタリングするなど。
        const allIllustrations = await this.illustrationRepository.getAllIllustrations();
        // isFeaturedがtrueのイラストのみをフィルタリング
        // ここでは、isFeaturedプロパティがtrueのイラストのみをフィルタリング
        const featuredIllustrations = allIllustrations.filter(illustration => illustration.isFeatured);
        
        return featuredIllustrations;
    }
}