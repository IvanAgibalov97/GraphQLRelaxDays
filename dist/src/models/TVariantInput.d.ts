import { TArticle } from "./article";
export declare type TVariantInput = {
    characteristic: string;
    parent: Pick<TArticle, "ean">;
};
