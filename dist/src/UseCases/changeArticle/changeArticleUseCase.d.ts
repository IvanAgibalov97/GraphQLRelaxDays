import { UseCase } from "../../Common/UseCase";
import { TChangeArticleInput } from "./TChangeArticleInput";
export declare class ChangeArticleUseCase extends UseCase<TChangeArticleInput, object> {
    handle(args: TChangeArticleInput): object;
    warningHandle(warningsArray: string[], query: string): void;
}
