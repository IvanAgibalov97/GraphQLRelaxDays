import { TArticle } from "../../src/types/TArticle";
import { DatabankController } from "../../src/Controllers/DatabankCtrlr.ts/databankController";
export declare class TestDatabase extends DatabankController {
    private _connection;
    private _app;
    constructor();
    createDatabase(articles: TArticle[]): Promise<void>;
    closeConnection(): Promise<void>;
}
