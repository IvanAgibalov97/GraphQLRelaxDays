import { TArticle } from "../../types/TArticle";

export type TChangeArticleInput = {
    article: Pick<TArticle, "description" | "ean" | "price" | "title">;
    user?: string;
};
