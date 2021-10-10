import { TCurrencyNames } from "./types/TCurrencyNames";
import { APIController } from "../../Common/APIController";
import { TControllerList } from "../../Common/TControllerList";
export declare class CurrencyController extends APIController {
    private _currencies;
    constructor();
    init(): Promise<void>;
    private _readFromServer;
    private _readDataFromCache;
    private _saveDataInCache;
    getRateOfCurrency(currency: TCurrencyNames): number;
    getPrices(price: number): Record<TCurrencyNames, number>;
    createConnection(controllers: TControllerList): void;
    start(): Promise<void>;
}
