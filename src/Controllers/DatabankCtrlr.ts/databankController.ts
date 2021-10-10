import mongoose from "mongoose";
import { GraphQLAPI } from "../../app";
import { APIController } from "../../Common/APIController";
import { TControllerList } from "../../Common/TControllerList";
import { SortingEnumType } from "../../enums/SortingEnumType";
import { TArticle } from "../../types/TArticle";
import { TVariant } from "../../types/TVariant";
import { TArticleFilterInput } from "../../UseCases/_commonTypes/TArticleFilterInput";
import { TOrderInput } from "../../UseCases/_commonTypes/TorderInput";
import { CurrencyController } from "../CurrencyCtrlr/currencyController";

export type inputParameters = {
    mongoUrl: string;
    dbName: string;
    port: number;
};

export class DatabankController extends APIController {
    private _args: inputParameters;

    private _currencyController: CurrencyController = {} as any;
    //private _translationController: TranslationController = {} as any;
    //private _graphQLAPI: GraphQLAPI = {} as any;

    public override createConnection(controllers: TControllerList): void {
        this._currencyController = controllers.currencyController;
        //this._translationController = controllers.translationController;
        //this._graphQLAPI = controllers.graphqlAPI;
    }
    public override async start(): Promise<void> {
        return new Promise((res, rej) => {
            mongoose
                .connect(String(this._args.mongoUrl) + `/${this._args.dbName}?retryWrites=true`)
                .then(() => {
                    res();
                })
                .catch((err) => {
                    console.log(err);
                    rej();
                });
        });
    }

    constructor(args: inputParameters) {
        super();
        this._args = args;
    }

    /**
     * should be refactored
     * ideas: $and and $or together,
     * price, lastChangedAt, createdAt together
     * description, title, ean, lastChangedBy, createdBy together
     * @param where
     * @param addAlone
     * @returns
     */
    public createMongoDBRequest(where: TArticleFilterInput | undefined, addAlone: boolean = false) {
        let result: Record<string, any> = {};
        if (addAlone) result = [] as any;
        if (where != undefined) {
            if (where.complete && where.complete.eq) {
                result["$and"] = [
                    { description: { $exists: true } },
                    { title: { $exists: true } },
                    { price: { $exists: true } },
                ];
            }
            if (where.and != undefined) {
                if (result["$and"] == undefined) {
                    result["$and"] = [];
                }
                for (const andConcl of where.and) {
                    result["$and"] = this.createMongoDBRequest(andConcl, true);
                }
            }
            if (where.or != undefined) {
                result["$or"] = [];
                for (const orConcl of where.or) {
                    result["$or"] = this.createMongoDBRequest(orConcl, true);
                }
            }

            //do StringOperationFilterInput
            if (where.ean != undefined) {
                let ean: any | undefined = undefined;
                if (where.ean.eq != undefined) {
                    ean = where.ean.eq;
                } else if (where.ean.contains != undefined) {
                    ean = new RegExp(where.ean.contains, "i");
                }

                if (ean != undefined)
                    if (addAlone) {
                        result.push({ ean: ean });
                    } else {
                        result["ean"] = ean;
                    }
            }
            if (where.description != undefined) {
                let descr: any | undefined = undefined;
                if (where.description.eq != undefined) {
                    descr = where.description.eq;
                } else if (where.description.contains != undefined) {
                    descr = new RegExp(where.description.contains, "i");
                }

                if (descr != undefined)
                    if (addAlone) {
                        result.push({ description: descr });
                    } else {
                        result["description"] = descr;
                    }
            }
            if (where.title != undefined) {
                let title: any | undefined = undefined;
                if (where.title.eq != undefined) {
                    title = where.title.eq;
                } else if (where.title.contains != undefined) {
                    title = new RegExp(where.title.contains, "i");
                }

                if (title != undefined)
                    if (addAlone) {
                        result.push({ title: title });
                    } else {
                        result["title"] = title;
                    }
            }
            if (where.lastChangedBy != undefined) {
                let lastChangedBy: any | undefined = undefined;
                if (where.lastChangedBy.eq != undefined) {
                    lastChangedBy = where.lastChangedBy.eq;
                } else if (where.lastChangedBy.contains != undefined) {
                    lastChangedBy = new RegExp(where.lastChangedBy.contains, "i");
                }

                if (lastChangedBy != undefined)
                    if (addAlone) {
                        result.push({ lastChangedBy: lastChangedBy });
                    } else {
                        result["lastChangedBy"] = lastChangedBy;
                    }
            }
            if (where.createdBy != undefined) {
                let createdBy: any | undefined = undefined;
                if (where.createdBy.eq != undefined) {
                    createdBy = where.createdBy.eq;
                } else if (where.createdBy.contains != undefined) {
                    createdBy = new RegExp(where.createdBy.contains, "i");
                }

                if (createdBy != undefined)
                    if (addAlone) {
                        result.push({ createdBy: createdBy });
                    } else {
                        result["createdBy"] = createdBy;
                    }
            }
            //do CompareDecimalOperationFilterInput
            if (where.price != undefined) {
                let price: Record<string, any> = {};
                if (where.price.eq != undefined) {
                    price = { $eq: where.price.eq };
                } else {
                    if (where.price.gte != undefined) {
                        price["$gte"] = where.price.gte;
                    }
                    if (where.price.lte != undefined) {
                        price["$lte"] = where.price.lte;
                    }
                }

                if (JSON.stringify(price) != "{}") {
                    if (addAlone) {
                        result.push({ price: price });
                    } else {
                        result["price"] = price;
                    }
                }
            }
        }
        return result;
    }

    public sortResult(order: TOrderInput | undefined): Partial<Record<keyof TOrderInput, 1 | -1>> {
        const result: Partial<Record<keyof TOrderInput, 1 | -1>> = {};
        if (order != undefined) {
            for (const key in order)
                result[key as keyof TOrderInput] =
                    order[key as keyof TOrderInput] == SortingEnumType.DESC ? -1 : 1;
        }
        return result;
    }

    public getCorrectedArticle(article: TArticle): void {
        //add price
        const prices = this._currencyController.getPrices(
            article.price == undefined ? 0 : article.price
        );
        article.priceEUR = prices.EUR;
        article.priceAUD = prices.AUD;
        article.priceBGN = prices.BGN;
        article.priceBRL = prices.BRL;
        article.priceCAD = prices.CAD;
        article.priceCHF = prices.CHF;
        article.priceCNY = prices.CNY;
        article.priceCZK = prices.CZK;
        article.priceDKK = prices.DKK;
        article.priceGBP = prices.GBP;
        article.priceHKD = prices.HKD;
        article.priceHRK = prices.HRK;
        article.priceHUF = prices.HUF;
        article.priceIDR = prices.IDR;
        article.priceILS = prices.ILS;
        article.priceINR = prices.INR;
        article.priceISK = prices.ISK;
        article.priceJPY = prices.JPY;
        article.priceKRW = prices.KRW;
        article.priceMXN = prices.MXN;
        article.priceMYR = prices.MYR;
        article.priceNOK = prices.NOK;
        article.priceNZD = prices.NZD;
        article.pricePHP = prices.PHP;
        article.pricePLN = prices.PLN;
        article.priceRON = prices.RON;
        article.priceRUB = prices.RUB;
        article.priceSEK = prices.SEK;
        article.priceSGD = prices.SGD;
        article.priceTHB = prices.THB;
        article.priceTRY = prices.TRY;
        article.priceUSD = prices.USD;
        article.priceZAR = prices.ZAR;
        //add default timestamp
        if (article.createdAt == null) {
            article.createdAt = new Date(0).toISOString();
        }
        if (article.lastChangedAt == null) {
            article.lastChangedAt = new Date(0).toISOString();
        }

        if (article.variants != undefined) {
            for (const variant of article.variants as TVariant[]) {
                if (variant.createdAt == null) {
                    variant.createdAt = new Date(0).toISOString();
                }
                if (variant.lastChangedAt == null) {
                    variant.lastChangedAt = new Date(0).toISOString();
                }
            }
        }
    }
}
