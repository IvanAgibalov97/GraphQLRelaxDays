import { UseCase } from "../../Common/UseCase";

export class AddTranslationUseCase extends UseCase<any, any> {
    public override handle(args: any): any {}
    public override warningHandle(warningsArray: string[], query: string): void {}
}
