import { DatabankController } from "../../Controllers/DatabankCtrlr.ts/databankController";
import { ArticleModel } from "../../models/article";
import { TArticle } from "../../types/TArticle";
import { UseCase } from "../../Common/UseCase";
import { TPaginatedArticlesInput } from "./TPaginatedArticlesInput";

export class PaginatedArticlesUseCase extends UseCase<TPaginatedArticlesInput, object> {
    private _databankController: DatabankController;

    constructor(databankController: DatabankController) {
        super();
        this._databankController = databankController;
    }
    public override async handle(args: TPaginatedArticlesInput): Promise<object> {
        let countOfAllArticles: number = await ArticleModel.count().exec();
        return ArticleModel.find(this._databankController.createMongoDBRequest(args.where))
            .sort(this._databankController.sortResult(args.order))
            .skip(args.skip)
            .limit(args.take)
            .then(async (result) => {
                for (const article of result as TArticle[]) {
                    this._databankController.getCorrectedArticle(article);
                }

                const res: any = {
                    items: result as TArticle[],
                    pageInfo: {
                        hasNextPage: countOfAllArticles - args.skip - args.take > 0,
                        hasPreviousPage:
                            args.skip - args.take < countOfAllArticles && args.skip != 0,
                    },
                    totalCount: countOfAllArticles,
                };
                return res;
            })
            .catch((err) => {
                throw err;
            });
    }
    public override warningHandle(warningsArray: string[], query: string): void {
        if (query.indexOf("paginatedArticles") != -1 && query.search(/price[^A-Z]/) != -1)
            warningsArray.push("The price attribute will be removed. Use priceEUR instead.");
        if (query.indexOf("paginatedArticles") != -1 && query.search(/description[^A-Z]/) != -1)
            warningsArray.push("The title description will be removed. Use descriptionDE instead.");
        if (query.indexOf("paginatedArticles") != -1 && query.search(/title[^A-Z]/) != -1)
            warningsArray.push("The title title will be removed. Use titleDE instead.");
    }
}
