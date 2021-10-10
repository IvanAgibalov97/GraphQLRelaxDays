import { TranslationController } from "../../Controllers/TranslationCtrlr/translationController";
import { UseCase } from "../../Common/UseCase";
import { TAddArticlesInput } from "./TAddArticleInput";
export declare class AddArticleUseCase extends UseCase<TAddArticlesInput, object> {
    private _translationController;
    constructor(translationController: TranslationController);
    handle(args: TAddArticlesInput): object;
    warningHandle(warningsArray: string[], query: string): void;
    private _addTranslationToArticle;
}
