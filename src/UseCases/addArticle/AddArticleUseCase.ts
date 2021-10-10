import { languagesList } from "../../Controllers/TranslationCtrlr/consts/Languages";
import { TranslationController } from "../../Controllers/TranslationCtrlr/translationController";
import { ArticleModel } from "../../models/article";
import { TArticle } from "../../types/TArticle";
import { TDescriptionTranslations } from "../../types/TDescriptionTranslations";
import { TTitleTranslations } from "../../types/TTitleTranslations";
import { UseCase } from "../../Common/UseCase";
import { TAddArticlesInput } from "./TAddArticleInput";

export class AddArticleUseCase extends UseCase<TAddArticlesInput, object> {
    private _translationController: TranslationController;
    constructor(translationController: TranslationController) {
        super();
        this._translationController = translationController;
    }
    public override handle(args: TAddArticlesInput): object {
        const newArticle: TArticle = {
            ean: args.article.ean,
            description: args.article.description,
            price: args.article.price,
            title: args.article.title,
            variants: [],
            createdBy: args.user,
            createdAt: new Date().toISOString(),
            lastChangedBy: args.user,
            lastChangedAt: new Date().toISOString(),
        };
        this._addTranslationToArticle(newArticle);

        const article = new ArticleModel(newArticle);

        return article
            .save()
            .then((result) => {
                return result;
            })
            .catch((err) => {
                //console.log(err);
                throw err;
            });
    }
    public override warningHandle(warningsArray: string[], query: string): void {
        if (query.indexOf("addArticle") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("addArticle should be called with a user");
        }
    }

    private _addTranslationToArticle(article: TArticle): void {
        for (const language of languagesList) {
            article[("description" + language.toUpperCase()) as keyof TDescriptionTranslations] = {
                article: {
                    ean: article.ean,
                },
                content: this._translationController.translate(
                    "de",
                    language,
                    article.description == undefined ? "" : article.description
                ),
                createdAt: article.createdAt == undefined ? "" : article.createdAt,
                createdBy: article.createdBy == undefined ? "" : article.createdBy,
                field: "description",
                language: language,
                manuallyTranslated: false,
            };

            article[("title" + language.toUpperCase()) as keyof TTitleTranslations] = {
                article: {
                    ean: article.ean,
                },
                content: this._translationController.translate(
                    "de",
                    language,
                    article.title == undefined ? "" : article.title
                ),
                createdAt: article.createdAt == undefined ? "" : article.createdAt,
                createdBy: article.createdBy == undefined ? "" : article.createdBy,
                field: "title",
                language: language,
                manuallyTranslated: false,
            };
        }
    }
}
