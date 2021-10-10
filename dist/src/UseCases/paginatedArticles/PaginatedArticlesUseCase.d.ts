import { DatabankController } from "../../Controllers/DatabankCtrlr.ts/databankController";
import { UseCase } from "../../Common/UseCase";
import { TPaginatedArticlesInput } from "./TPaginatedArticlesInput";
export declare class PaginatedArticlesUseCase extends UseCase<TPaginatedArticlesInput, object> {
    private _databankController;
    constructor(databankController: DatabankController);
    handle(args: TPaginatedArticlesInput): Promise<object>;
    warningHandle(warningsArray: string[], query: string): void;
}
