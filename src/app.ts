import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, GraphQLError } from "graphql";
import { importSchema } from "graphql-import";
import * as http from "http";

import { TArticlesInput } from "./UseCases/articles/TArticlesInput";
import { TranslationController } from "./Controllers/TranslationCtrlr/translationController";
import { AddArticleUseCase } from "./UseCases/addArticle/AddArticleUseCase";
import { TAddArticlesInput } from "./UseCases/addArticle/TAddArticleInput";
import { AddTranslationUseCase } from "./UseCases/addTranslation/AddTranslationUseCase";
import { DeleteVariantByIdUseCase } from "./UseCases/deleteVariantById/DeleteVariantByIdUseCase";
import { TDeleteVariantInput } from "./UseCases/deleteVariant/TDeleteVariantInput";
import { DeleteVariantUseCase } from "./UseCases/deleteVariant/DeleteVariantUseCase";
import { TChangeArticleInput } from "./UseCases/changeArticle/TChangeArticleInput";
import { ChangeArticleUseCase } from "./UseCases/changeArticle/changeArticleUseCase";
import { AddVariantUseCase } from "./UseCases/addVariant/AddVariantUseCase";
import { TAddVariantInput } from "./UseCases/addVariant/TAddVariantInput";
import { ArticlesUseCase } from "./UseCases/articles/ArticlesUseCase";
import { PaginatedArticlesUseCase } from "./UseCases/paginatedArticles/PaginatedArticlesUseCase";
import { DatabankController } from "./Controllers/DatabankCtrlr.ts/databankController";
import { TPaginatedArticlesInput } from "./UseCases/paginatedArticles/TPaginatedArticlesInput";
import { TUseCaseList } from "./Common/TUseCaseList";
import { APIController } from "./Common/APIController";
import { TControllerList } from "./Common/TControllerList";

export class GraphQLAPI extends APIController {
    private _translationController: TranslationController = {} as any;
    private _databankController: DatabankController = {} as any;
    private _app: express.Application;
    private _server: http.Server = {} as any;
    private _port: number;

    private _useCaseList: TUseCaseList = {} as any;

    constructor(port: number) {
        super();
        this._app = express();
        this._port = port;
    }

    public override createConnection(controllers: TControllerList): void {
        this._translationController = controllers.translationController;
        this._databankController = controllers.databankController;

        this._useCaseList = {
            addArticle: new AddArticleUseCase(this._translationController),
            addTranslation: new AddTranslationUseCase(),
            deleteVariantById: new DeleteVariantByIdUseCase(),
            deleteVariant: new DeleteVariantUseCase(),
            changeArticle: new ChangeArticleUseCase(),
            addVariant: new AddVariantUseCase(),
            articles: new ArticlesUseCase(this._databankController),
            paginatedArticles: new PaginatedArticlesUseCase(this._databankController),
        };
    }
    public override async start(): Promise<void> {
        this._initializeControllers();
        this._server = this._app.listen(this._port);

        console.log("Server is listening on port " + this._port);
    }

    public close() {
        this._server.close();
    }

    private _initializeControllers(): void {
        this._app.use(express.json());
        this._app.use(express.urlencoded({ extended: true }));

        this._defineGraphQL();
    }

    private _defineGraphQL() {
        const THIS = this;
        this._app.use(
            "/graphql",
            graphqlHTTP((request, response) => {
                return {
                    schema: buildSchema(importSchema("GraphQL/schema.gql")),
                    graphiql: true,
                    extensions({ document, variables, operationName, result, context }) {
                        //@ts-ignore
                        let query: string = context.body.query;
                        let warnings: string[] = [];

                        for (let key in THIS._useCaseList)
                            THIS._useCaseList[key].warningHandle(warnings, query);

                        if (warnings.length != 0)
                            //@ts-ignore
                            result["warning"] = warnings.join("\n");

                        return {};
                    },
                    customFormatErrorFn: (err: GraphQLError) => {
                        return err;
                    },
                    rootValue: {
                        articles: (args: TArticlesInput): object => {
                            return this._useCaseList.articles.handle(args);
                        },
                        addArticle: (args: TAddArticlesInput): object => {
                            return this._useCaseList.addArticle.handle(args);
                        },
                        addVariant: (args: TAddVariantInput): object => {
                            return this._useCaseList.addVariant.handle(args);
                        },
                        paginatedArticles: async (
                            args: TPaginatedArticlesInput
                        ): Promise<object> => {
                            return await this._useCaseList.paginatedArticles.handle(args);
                        },

                        changeArticle: (args: TChangeArticleInput): object => {
                            return this._useCaseList.changeArticle.handle(args);
                        },
                        deleteVariant: (args: TDeleteVariantInput): object => {
                            return this._useCaseList.deleteVariant.handle(args);
                        },
                        addTranslation: (args: any): object => {
                            return this._useCaseList.addTranslation.handle(args);
                        },
                        deleteVariantById: (args: any): object => {
                            return this._useCaseList.deleteVariantById.handle(args);
                        },
                    },
                };
            })
        );
    }
}
