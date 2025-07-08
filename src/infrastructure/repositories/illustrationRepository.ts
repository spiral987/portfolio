import { Illustration } from "../../domain/entities/illustration";

export interface IIllustrationRepository {
    /**
     * すべてのイラストを取得します。
     * @returns Illustrationエンティティの配列を解決するPromise。
     */
    getAllIllustrations(): Promise<Illustration[]>;
    
    /**
     * 指定されたIDのイラストを取得します。
     * @param id - 取得するイラストのID。
     * @returns 指定されたIDのIllustrationエンティティ、または見つからない場合はnullを解決するPromise。
     */
    getIllustrationById(id: string): Promise<Illustration | null>;
}
