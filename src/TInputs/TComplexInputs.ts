import { TArticleFilterInput } from "../UseCases/_commonTypes/TArticleFilterInput";

export type TComplexInputs = {
    and: TArticleFilterInput[];
    or: TArticleFilterInput[];
};
