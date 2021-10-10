import { DatabankController } from "../../Controllers/DatabankCtrlr.ts/databankController";
import { UseCase } from "../../Common/UseCase";
import { TArticlesInput } from "./TArticlesInput";
export declare class ArticlesUseCase extends UseCase<TArticlesInput, object> {
    private _databankController;
    constructor(databankController: DatabankController);
    handle(args: TArticlesInput): object;
    warningHandle(warningsArray: string[], query: string): void;
}
