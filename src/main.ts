import { GraphQLAPI } from "./app";
import { TControllerList } from "./Common/TControllerList";
import { CurrencyController } from "./Controllers/CurrencyCtrlr/currencyController";
import { DatabankController } from "./Controllers/DatabankCtrlr.ts/databankController";
import { TranslationController } from "./Controllers/TranslationCtrlr/translationController";

async function start() {
    const controllers: TControllerList = {
        databankController: new DatabankController({
            dbName: String(process.env.MONGO_DB == null ? "articles" : process.env.MONGO_DB),
            mongoUrl: String(
                process.env.MONGO_URL == null ? "mongodb://127.0.0.1:27017" : process.env.MONGO_DB
            ),
            port: Number(process.env.PORT == null ? 8000 : process.env.MONGO_DB),
        }),
        currencyController: new CurrencyController(),
        graphqlAPI: new GraphQLAPI(Number(process.env.PORT == null ? 8000 : process.env.MONGO_DB)),
        translationController: new TranslationController(5000),
    };

    for (const ctrlrKey in controllers) {
        controllers[ctrlrKey].createConnection(controllers);
    }

    await controllers.currencyController.init();

    await controllers.databankController.start();
    await controllers.currencyController.start();
    await controllers.translationController.start();
    await controllers.graphqlAPI.start();
}

start();
