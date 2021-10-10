import { APIController } from "../../Common/APIController";
import { TControllerList } from "../../Common/TControllerList";
import { TArticle } from "../../types/TArticle";
import { TArticleFilterInput } from "../../UseCases/_commonTypes/TArticleFilterInput";
import { TOrderInput } from "../../UseCases/_commonTypes/TorderInput";
export declare type inputParameters = {
    mongoUrl: string;
    dbName: string;
    port: number;
};
export declare class DatabankController extends APIController {
    private _args;
    private _currencyController;
    createConnection(controllers: TControllerList): void;
    start(): Promise<void>;
    constructor(args: inputParameters);
    createMongoDBRequest(where: TArticleFilterInput | undefined, addAlone?: boolean): Record<string, any>;
    sortResult(order: TOrderInput | undefined): Partial<Record<keyof TOrderInput, 1 | -1>>;
    getCorrectedArticle(article: TArticle): void;
}
