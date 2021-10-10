import { DatabankController } from "../../Controllers/DatabankCtrlr.ts/databankController";
import { ArticleModel } from "../../models/article";
import { TArticle } from "../../types/TArticle";
import { UseCase } from "../../Common/UseCase";
import { TArticlesInput } from "./TArticlesInput";

export class ArticlesUseCase extends UseCase<TArticlesInput, object> {
    private _databankController: DatabankController;

    constructor(databankController: DatabankController) {
        super();
        this._databankController = databankController;
    }
    public override handle(args: TArticlesInput): object {
        return ArticleModel.find(this._databankController.createMongoDBRequest(args.where))
            .sort(this._databankController.sortResult(args.order))
            .then((result) => {
                for (const article of result as TArticle[]) {
                    this._databankController.getCorrectedArticle(article);
                }
                return result;
            })
            .catch((err) => {
                throw err;
            });
    }
    public override warningHandle(warningsArray: string[], query: string): void {
        if (query.indexOf("articles") != -1) {
            warningsArray.push("articles is deprecated. Switch to paginatedArticles");
        }
        if (query.indexOf("articles") != -1 && query.search(/price[^A-Z]/) != -1) {
            warningsArray.push("The price attribute will be removed. Use priceEUR instead.");
        }
        if (query.indexOf("articles") != -1 && query.search(/description[^A-Z]/) != -1)
            warningsArray.push("The title description will be removed. Use descriptionDE instead.");
        if (query.indexOf("articles") != -1 && query.search(/title[^A-Z]/) != -1)
            warningsArray.push("The title title will be removed. Use titleDE instead.");
    }
}
