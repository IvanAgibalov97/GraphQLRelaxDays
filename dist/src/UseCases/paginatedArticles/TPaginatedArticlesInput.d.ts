import { TArticleFilterInput } from "../_commonTypes/TArticleFilterInput";
import { TOrderInput } from "../_commonTypes/TorderInput";
export declare type TPaginatedArticlesInput = {
    skip: number;
    take: number;
    order: TOrderInput;
    where: TArticleFilterInput;
};
