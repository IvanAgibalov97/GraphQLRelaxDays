import { TArticle } from "./article";
export declare type TPageInfo = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
export declare type TPaginatedArticle = {
    items: TArticle[];
    pageInfo: TPageInfo;
    totalCount: number;
};
