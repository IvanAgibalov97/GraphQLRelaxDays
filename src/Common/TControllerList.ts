import { GraphQLAPI } from "../app";
import { CurrencyController } from "../Controllers/CurrencyCtrlr/currencyController";
import { DatabankController } from "../Controllers/DatabankCtrlr.ts/databankController";
import { TranslationController } from "../Controllers/TranslationCtrlr/translationController";
import { APIController } from "./APIController";

export interface TControllerList extends Record<string, APIController> {
    currencyController: CurrencyController;
    translationController: TranslationController;
    databankController: DatabankController;
    graphqlAPI: GraphQLAPI;
}
