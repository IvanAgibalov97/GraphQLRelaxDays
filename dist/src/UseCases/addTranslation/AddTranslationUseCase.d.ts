import { UseCase } from "../../Common/UseCase";
export declare class AddTranslationUseCase extends UseCase<any, any> {
    handle(args: any): any;
    warningHandle(warningsArray: string[], query: string): void;
}
