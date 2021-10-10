import * as https from "https";
import { IncomingMessage } from "http";
import parser from "fast-xml-parser";
import NodeCache from "node-cache";
import { TCurrencyNames } from "./types/TCurrencyNames";
import { TCurrencyCache } from "./types/TCurrencyCache";
import { APIController } from "../../Common/APIController";
import { TControllerList } from "../../Common/TControllerList";

export class CurrencyController extends APIController {
    private _currencies: TCurrencyCache;

    constructor() {
        super();
        this._currencies = {
            time: "",
            currencies: {
                EUR: 1,
                AUD: -1,
                BGN: -1,
                BRL: -1,
                CAD: -1,
                CHF: -1,
                CNY: -1,
                CZK: -1,
                DKK: -1,
                GBP: -1,
                HKD: -1,
                HRK: -1,
                HUF: -1,
                IDR: -1,
                ILS: -1,
                INR: -1,
                ISK: -1,
                JPY: -1,
                KRW: -1,
                MXN: -1,
                MYR: -1,
                NOK: -1,
                NZD: -1,
                PHP: -1,
                PLN: -1,
                RON: -1,
                RUB: -1,
                SEK: -1,
                SGD: -1,
                THB: -1,
                TRY: -1,
                USD: -1,
                ZAR: -1,
            },
        };
    }

    public async init(): Promise<void> {
        const cache: TCurrencyCache | undefined = await this._readDataFromCache();
        if (cache == undefined) {
            await this._readFromServer();
        } else {
            this._currencies = cache;
        }
    }

    private async _readFromServer(): Promise<void> {
        return new Promise((resolve, rej) => {
            https.get(
                "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml",
                (res: IncomingMessage) => {
                    res.on("data", (chunk) => {
                        const xmlString: string = chunk.toString();
                        const jsonObject: {
                            "@_time": string;
                            Cube: { "@_currency": TCurrencyNames; "@_rate": string }[];
                        } = parser.parse(xmlString, {
                            ignoreAttributes: false,
                        })["gesmes:Envelope"]["Cube"]["Cube"];

                        this._currencies.time = jsonObject["@_time"];
                        for (const cur of jsonObject.Cube) {
                            this._currencies.currencies[cur["@_currency"]] = Number(cur["@_rate"]);
                        }

                        this._saveDataInCache();

                        resolve();
                    });
                }
            );
        });
    }

    private _readDataFromCache(): TCurrencyCache | undefined {
        const result: TCurrencyCache | undefined = new NodeCache().get("currency");

        if (result == undefined) {
            return undefined;
        }
        if (Date.parse(result.time) - new Date().getTime() > 86400000) {
            return undefined;
        }
        return result;
    }

    private _saveDataInCache(): boolean {
        const b = new NodeCache();
        const a = b.set("currency", this._currencies);
        return true;
    }

    public getRateOfCurrency(currency: TCurrencyNames): number {
        return this._currencies.currencies[currency];
    }

    public getPrices(price: number): Record<TCurrencyNames, number> {
        return {
            EUR: price,
            AUD: price * this._currencies.currencies.AUD,
            BGN: price * this._currencies.currencies.BGN,
            BRL: price * this._currencies.currencies.BRL,
            CAD: price * this._currencies.currencies.CAD,
            CHF: price * this._currencies.currencies.CHF,
            CNY: price * this._currencies.currencies.CNY,
            CZK: price * this._currencies.currencies.CZK,
            DKK: price * this._currencies.currencies.DKK,
            GBP: price * this._currencies.currencies.GBP,
            HKD: price * this._currencies.currencies.HKD,
            HRK: price * this._currencies.currencies.HRK,
            HUF: price * this._currencies.currencies.HUF,
            IDR: price * this._currencies.currencies.IDR,
            ILS: price * this._currencies.currencies.ILS,
            INR: price * this._currencies.currencies.INR,
            ISK: price * this._currencies.currencies.ISK,
            JPY: price * this._currencies.currencies.JPY,
            KRW: price * this._currencies.currencies.KRW,
            MXN: price * this._currencies.currencies.MXN,
            MYR: price * this._currencies.currencies.MYR,
            NOK: price * this._currencies.currencies.NOK,
            NZD: price * this._currencies.currencies.NZD,
            PHP: price * this._currencies.currencies.PHP,
            PLN: price * this._currencies.currencies.PLN,
            RON: price * this._currencies.currencies.RON,
            RUB: price * this._currencies.currencies.RUB,
            SEK: price * this._currencies.currencies.SEK,
            SGD: price * this._currencies.currencies.SGD,
            THB: price * this._currencies.currencies.THB,
            TRY: price * this._currencies.currencies.TRY,
            USD: price * this._currencies.currencies.USD,
            ZAR: price * this._currencies.currencies.ZAR,
        };
    }

    public override createConnection(controllers: TControllerList): void {}
    public override async start(): Promise<void> {}
}
