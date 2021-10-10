import { TVariant } from "../../types/TVariant";

export type TDeleteVariantInput = {
    variant: TVariant & { parent: { ean: string } };
    user?: string;
};
