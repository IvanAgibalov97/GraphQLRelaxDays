import { TVariant } from "../../types/TVariant";
export declare type TDeleteVariantInput = {
    variant: TVariant & {
        parent: {
            ean: string;
        };
    };
    user?: string;
};
