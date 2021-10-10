import { ArticleModel } from "../../models/article";
import { TArticle } from "../../types/TArticle";
import { UseCase } from "../../Common/UseCase";
import { TChangeArticleInput } from "./TChangeArticleInput";

export class ChangeArticleUseCase extends UseCase<TChangeArticleInput, object> {
    public override handle(args: TChangeArticleInput): object {
        const updateQuery: Pick<
            TArticle,
            "description" | "ean" | "price" | "title" | "lastChangedAt" | "lastChangedBy"
        > = { ...args.article };
        updateQuery.lastChangedAt = new Date().toISOString();
        if (args.user != undefined) {
            updateQuery.lastChangedBy = args.user;
        }

        return ArticleModel.findOneAndUpdate(
            {
                ean: args.article.ean,
            },
            { $set: updateQuery },
            { new: true }
        ).then((res) => {
            if (res == null) {
                throw new Error("no article with given ean");
            }
            return res;
        });
    }
    public override warningHandle(warningsArray: string[], query: string): void {
        if (query.indexOf("changeArticle") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("changeArticle should be called with a user.");
        }
    }
}
