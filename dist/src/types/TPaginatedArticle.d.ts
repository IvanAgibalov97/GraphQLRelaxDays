import { TArticle } from "./TArticle";
import { TPageInfo } from "./TPageInfo";
export declare type TPaginatedArticle = {
    items: TArticle[];
    pageInfo: TPageInfo;
    totalCount: number;
};
