import { UseCase } from "../../Common/UseCase";
import { TDeleteVariantInput } from "./TDeleteVariantInput";
export declare class DeleteVariantUseCase extends UseCase<TDeleteVariantInput, object> {
    handle(args: TDeleteVariantInput): object;
    warningHandle(warningsArray: string[], query: string): void;
}
