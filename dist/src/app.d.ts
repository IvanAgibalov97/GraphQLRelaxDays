import { APIController } from "./Common/APIController";
import { TControllerList } from "./Common/TControllerList";
export declare class GraphQLAPI extends APIController {
    private _translationController;
    private _databankController;
    private _app;
    private _server;
    private _port;
    private _useCaseList;
    constructor(port: number);
    createConnection(controllers: TControllerList): void;
    start(): Promise<void>;
    close(): void;
    private _initializeControllers;
    private _defineGraphQL;
}
