import { TArticle } from "./TArticle";

export type TVariantInput = {
    characteristic: string;
    parent: Pick<TArticle, "ean">;
};
