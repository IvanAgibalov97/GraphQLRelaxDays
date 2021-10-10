import { TLanguage } from "../Controllers/TranslationCtrlr/types/TLanguage";
import { TArticle } from "./TArticle";
export declare type TTranslation = {
    article: Pick<TArticle, "ean">;
    field: string;
    language: TLanguage;
    content: string;
    createdAt: string;
    createdBy: string;
    manuallyTranslated: boolean;
};
