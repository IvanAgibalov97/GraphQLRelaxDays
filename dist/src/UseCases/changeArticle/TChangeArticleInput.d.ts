import { TArticle } from "../../types/TArticle";
export declare type TChangeArticleInput = {
    article: Pick<TArticle, "description" | "ean" | "price" | "title">;
    user?: string;
};
