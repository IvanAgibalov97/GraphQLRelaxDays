export declare type TCurrencyNames = "USD" | "JPY" | "BGN" | "CZK" | "DKK" | "GBP" | "HUF" | "PLN" | "RON" | "SEK" | "CHF" | "ISK" | "NOK" | "HRK" | "RUB" | "TRY" | "AUD" | "BRL" | "CAD" | "CNY" | "HKD" | "IDR" | "ILS" | "INR" | "KRW" | "MXN" | "MYR" | "NZD" | "PHP" | "SGD" | "THB" | "ZAR" | "EUR";
export declare const definedCurrencies: TCurrencyNames[];
export declare type TCurrencyCache = {
    time: string;
    currencies: Record<TCurrencyNames, number>;
};
export declare class CurrencyController {
    private _currencies;
    constructor();
    init(): Promise<void>;
    private _readFromServer;
    private _readDataFromCache;
    private _saveDataInCache;
    getRateOfCurrency(currency: TCurrencyNames): number;
    getPrices(price: number): Record<TCurrencyNames, number>;
}
