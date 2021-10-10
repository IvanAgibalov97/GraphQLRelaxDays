import mongoose from "mongoose";
import { GraphQLAPI } from "../../src/app";
import { CurrencyController } from "../../src/Controllers/CurrencyCtrlr/currencyController";
import { ArticleModel } from "../../src/models/article";
import { TranslationController } from "../../src/Controllers/TranslationCtrlr/translationController";
import { TArticle } from "../../src/types/TArticle";
import { DatabankController } from "../../src/Controllers/DatabankCtrlr.ts/databankController";
import { TControllerList } from "../../src/Common/TControllerList";
export class TestDatabase extends DatabankController {
    private _connection: typeof mongoose | undefined;
    private _app: GraphQLAPI | undefined;
    constructor() {
        super({
            dbName: "",
            mongoUrl: "",
            port: 0,
        });
    }
    public async createDatabase(articles: TArticle[]): Promise<void> {
        //drop 'old' database
        return mongoose
            .connect("mongodb://127.0.0.1:27017/testDB?retryWrites=true")
            .then(async (connection) => {
                this._connection = connection;
                await connection.connection.db.dropDatabase();
                for (const article of articles) {
                    await new ArticleModel(article).save();
                }

                const controllers: TControllerList = {
                    currencyController: new CurrencyController(),
                    translationController: new TranslationController(5000),
                    graphqlAPI: new GraphQLAPI(8080),
                    databankController: this,
                };

                this._app = controllers.graphqlAPI;

                await controllers.currencyController.init();

                for (const ctrlrKey in controllers) {
                    controllers[ctrlrKey].createConnection(controllers);
                }
                //await controllers.databankController.start();
                await controllers.currencyController.start();
                await controllers.translationController.start();
                await controllers.graphqlAPI.start();
            });
    }

    public async closeConnection(): Promise<void> {
        if (this._app != undefined) {
            this._app.close();
        }
        if (this._connection != undefined) return this._connection.connection.close();
        return;
    }
}
