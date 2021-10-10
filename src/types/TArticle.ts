import { TCurrencies } from "./TCurrencies";
import { TDescriptionTranslations } from "./TDescriptionTranslations";
import { TModifyInfo } from "./TModifyInfo";
import { TTitleTranslations } from "./TTitleTranslations";
import { TVariant } from "./TVariant";

export type TArticle = {
    title?: string;
    description?: string;
    price?: number;
    ean: string;
    variants: TVariant[];
} & TCurrencies &
    TModifyInfo &
    TDescriptionTranslations &
    TTitleTranslations;
