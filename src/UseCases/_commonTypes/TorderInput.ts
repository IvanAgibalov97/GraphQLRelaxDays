import { SortingEnumType } from "../../enums/SortingEnumType";

export type TOrderInput = {
    title?: SortingEnumType;
    price?: SortingEnumType;
    description?: SortingEnumType;
    ean?: SortingEnumType;
    lastChangedBy?: SortingEnumType;
    lastChangedAt?: SortingEnumType;
    createdBy?: SortingEnumType;
    createdAt?: SortingEnumType;
};
