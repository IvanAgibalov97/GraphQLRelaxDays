export declare type TStringOperationFilterInput = {
    eq?: string;
    contains?: string;
};
export declare type TComparableDecimalOperationFilterInput = {
    eq?: Number;
    gte?: Number;
    lte?: Number;
};
export declare type TStringInputs = {
    ean: TStringOperationFilterInput;
    title: TStringOperationFilterInput;
    description: TStringOperationFilterInput;
    lastChangedBy: TStringOperationFilterInput;
    createdBy: TStringOperationFilterInput;
};
export declare type TDecimalInputs = {
    price: TComparableDecimalOperationFilterInput;
};
export declare type TComplexInputs = {
    and: TArticleFilterInput[];
    or: TArticleFilterInput[];
};
export declare type TCompleteInput = {
    complete: {
        eq: boolean;
    };
};
export declare type TArticleFilterInput = TStringInputs & TDecimalInputs & TComplexInputs & TCompleteInput;
