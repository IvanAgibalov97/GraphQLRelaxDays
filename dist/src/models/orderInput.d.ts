export declare enum SortingEnumType {
    ASC = "ASC",
    DESC = "DESC"
}
export declare type TOrderInput = {
    title?: SortingEnumType;
    price?: SortingEnumType;
    description?: SortingEnumType;
    ean?: SortingEnumType;
};
