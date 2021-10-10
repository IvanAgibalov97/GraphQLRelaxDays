import { AddArticleUseCase } from "../UseCases/addArticle/AddArticleUseCase";
import { AddTranslationUseCase } from "../UseCases/addTranslation/AddTranslationUseCase";
import { AddVariantUseCase } from "../UseCases/addVariant/AddVariantUseCase";
import { ArticlesUseCase } from "../UseCases/articles/ArticlesUseCase";
import { ChangeArticleUseCase } from "../UseCases/changeArticle/changeArticleUseCase";
import { DeleteVariantUseCase } from "../UseCases/deleteVariant/DeleteVariantUseCase";
import { DeleteVariantByIdUseCase } from "../UseCases/deleteVariantById/DeleteVariantByIdUseCase";
import { PaginatedArticlesUseCase } from "../UseCases/paginatedArticles/PaginatedArticlesUseCase";
import { UseCase } from "./UseCase";
export interface TUseCaseList extends Record<string, UseCase<any, any>> {
    addArticle: AddArticleUseCase;
    addTranslation: AddTranslationUseCase;
    deleteVariantById: DeleteVariantByIdUseCase;
    deleteVariant: DeleteVariantUseCase;
    changeArticle: ChangeArticleUseCase;
    addVariant: AddVariantUseCase;
    articles: ArticlesUseCase;
    paginatedArticles: PaginatedArticlesUseCase;
}
