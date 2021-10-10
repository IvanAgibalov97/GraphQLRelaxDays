import { UseCase } from "../../Common/UseCase";
import { TAddVariantInput } from "./TAddVariantInput";
export declare class AddVariantUseCase extends UseCase<TAddVariantInput, object> {
    handle(args: TAddVariantInput): object;
    warningHandle(warningsArray: string[], query: string): void;
}
