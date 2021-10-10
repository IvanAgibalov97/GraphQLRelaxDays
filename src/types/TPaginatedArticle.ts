import { TArticle } from "./TArticle";
import { TPageInfo } from "./TPageInfo";

export type TPaginatedArticle = {
    items: TArticle[];
    pageInfo: TPageInfo;
    totalCount: number;
};
