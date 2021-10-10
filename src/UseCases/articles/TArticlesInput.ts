import { TArticleFilterInput } from "../_commonTypes/TArticleFilterInput";
import { TOrderInput } from "../_commonTypes/TorderInput";

export type TArticlesInput = {
    order: TOrderInput;
    where: TArticleFilterInput;
};
