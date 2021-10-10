import axios from "axios";
import { expect } from "chai";
import { CurrencyController } from "../../src/Controllers/CurrencyCtrlr/currencyController";
import { TestDatabase } from "../testDataBases/createTestDatabase";
import { timeStapedArticles } from "../testDataBases/update3Database";
import NodeCache from "node-cache";
import { uncompletedArticles } from "./uncompletedArticles";
import { TArticle } from "../../src/types/TArticle";
import { TCurrencyNames } from "../../src/Controllers/CurrencyCtrlr/types/TCurrencyNames";

function clearCache() {
    new NodeCache().del("currency");
}

describe("update 4", () => {
    describe("currencyController", () => {
        it("load from server", async () => {
            const currencyController = new CurrencyController();
            //@ts-ignore
            await currencyController._readFromServer();
            //@ts-ignore
            const loadCurrencies: TCurrencyCache = currencyController._currencies;

            expect(loadCurrencies.time).not.equal("", "time doesn't allow to be empty");
            for (const curKey in loadCurrencies.currencies) {
                expect(loadCurrencies.currencies[curKey as TCurrencyNames]).not.equal(
                    -1,
                    "currency doesn't allow to be default value -1"
                );
            }

            clearCache();
        });
        it("save data in cache", async () => {
            const ctrl_1 = new CurrencyController();
            //@ts-ignore
            await ctrl_1._readFromServer();
            //@ts-ignore
            const loadCurrencies: TCurrencyCache = ctrl_1._currencies;

            expect(loadCurrencies).not.equal(undefined, "load currencies shouldn't be undefined");
            expect(loadCurrencies.time).not.equal("", "time doesn't allow to be empty");
            for (const curKey in loadCurrencies.currencies) {
                expect(loadCurrencies.currencies[curKey as TCurrencyNames]).not.equal(
                    -1,
                    "currency doesn't allow to be default value -1"
                );
            }

            clearCache();
        });
        /*
        it("load from Cache", async () => {
            const ctrl_1 = new CurrencyController();
            //@ts-ignore
            await ctrl_1._readFromServer();
            //@ts-ignore
            const ctrl_2 = new CurrencyController();
            //@ts-ignore
            const loadCurrencies: TCurrencyCache =
                //@ts-ignore
                ctrl_2._readDataFromCache();

            expect(loadCurrencies).not.equal(undefined, "load currencies shouldn't be undefined");
            expect(loadCurrencies.time).not.equal("", "time doesn't allow to be empty");
            for (const curKey in loadCurrencies.currencies) {
                expect(loadCurrencies.currencies[curKey as TCurrencyNames]).not.equal(
                    -1,
                    "currency doesn't allow to be default value -1"
                );
            }

            clearCache();
        });*/
        it("load currencies (from server, cache is expired)");
        it("load currencies (from cache, cache is actual)");
    });
    describe("new extensions", () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(uncompletedArticles);
        });
        after(async () => {
            await a.closeConnection();
        });
        it("return only completed articles", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{complete:{eq:true}}){
                          title,
                          description,
                          price, ean,
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });
            expect(result.length).equal(7, "it should be only 7 completed articles");
        });
        it("return not only completed articles", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{complete:{eq:false}}){
                          title,
                          description,
                          price, ean,
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });
            expect(result.length).equal(15, "it should be only 15 completed articles");
        });
        it("show warning if price by articles is required", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{complete:{eq:false}}){
	                        price
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as string;
                });
            expect(result).not.equal(undefined, "warning should be defined");
            expect(result.length).not.equal(0, "warning shouldn't be empty");
        });
        it("show no warning if another price by paginatedArticles is required", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{complete:{eq:false}}){
	                        priceEUR
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as string;
                });
            expect(result).not.equal(undefined, "warning should be undefined");
            expect(result.indexOf("deprecated")).not.equal(
                -1,
                "it should return warning but not about price"
            );
        });
        it("show warning if price by paginatedArticles is asked", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:0, where:{complete:{eq:false}}){
	                        items{
                                price
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as string;
                });
            expect(result).not.equal(undefined, "warning should be defined");
            expect(result.length).not.equal(0, "warning shouldn't be empty");
        });
        it("show no warning if another price by articles is required", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:0, where:{complete:{eq:false}}){
	                        items{
                                priceEUR
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as string;
                });
            expect(result).equal(undefined, "warning should be undefined");
        });
    });
    describe("new extensions", () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(timeStapedArticles);
        });
        after(async () => {
            await a.closeConnection();
        });
        it("check priceEUR", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceEUR
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceEUR != null && Number(result.priceEUR) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceUSD", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceUSD
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceUSD != null && Number(result.priceUSD) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceJPY", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceJPY
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceJPY != null && Number(result.priceJPY) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceBGN", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceBGN
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceBGN != null && Number(result.priceBGN) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceCZK", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceCZK
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceCZK != null && Number(result.priceCZK) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceDKK", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceDKK
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceDKK != null && Number(result.priceDKK) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceGBP", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceGBP
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceGBP != null && Number(result.priceGBP) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceHUF", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceHUF
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceHUF != null && Number(result.priceHUF) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check pricePLN", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            pricePLN
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.pricePLN != null && Number(result.pricePLN) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceRON", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceRON
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceRON != null && Number(result.priceRON) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceSEK", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceSEK
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceSEK != null && Number(result.priceSEK) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceCHF", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceCHF
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceCHF != null && Number(result.priceCHF) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceISK", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceISK
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceISK != null && Number(result.priceISK) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceNOK", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceNOK
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceNOK != null && Number(result.priceNOK) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceHRK", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceHRK
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceHRK != null && Number(result.priceHRK) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceRUB", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceRUB
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceRUB != null && Number(result.priceRUB) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceTRY", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceTRY
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceTRY != null && Number(result.priceTRY) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceAUD", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceAUD
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceAUD != null && Number(result.priceAUD) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceBRL", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceBRL
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceBRL != null && Number(result.priceBRL) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceCAD", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceCAD
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceCAD != null && Number(result.priceCAD) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceCNY", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceCNY
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceCNY != null && Number(result.priceCNY) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceHKD", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceHKD
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceHKD != null && Number(result.priceHKD) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceIDR", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceIDR
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceIDR != null && Number(result.priceIDR) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceILS", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceILS
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceILS != null && Number(result.priceILS) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceINR", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceINR
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceINR != null && Number(result.priceINR) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceKRW", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceKRW
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceKRW != null && Number(result.priceKRW) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceMXN", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceMXN
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceMXN != null && Number(result.priceMXN) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceMYR", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceMYR
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceMYR != null && Number(result.priceMYR) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceNZD", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceNZD
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceNZD != null && Number(result.priceNZD) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check pricePHP", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            pricePHP
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.pricePHP != null && Number(result.pricePHP) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceSGD", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceSGD
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceSGD != null && Number(result.priceSGD) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceTHB", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceTHB
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceTHB != null && Number(result.priceTHB) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
        it("check priceZAR", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            priceZAR
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.priceZAR != null && Number(result.priceZAR) > 0).equal(
                true,
                "price shouldn't be null or negative"
            );
        });
    });
    describe("old compatibilities", () => {});
});
