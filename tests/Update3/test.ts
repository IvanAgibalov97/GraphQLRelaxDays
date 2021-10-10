import axios from "axios";
import { expect } from "chai";
import { TArticle } from "../../src/types/TArticle";
import { TVariant } from "../../src/types/TVariant";
import { TestDatabase } from "../testDataBases/createTestDatabase";
import { HelpFunctions } from "../testDataBases/HelpFunction";
import { articles } from "../testDataBases/simpleDatabase";
import { timeStapedArticles } from "../testDataBases/update3Database";

describe("Update 3", async () => {
    describe("new extensions", async () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(articles);
        });
        after(async () => {
            await a.closeConnection();
        });

        it("changeArticle - ean exists", async () => {
            let result: TArticle = {} as TArticle;

            const expectedResult: TArticle = {
                ean: "someEan1",
                price: 10000.0,
                description: "newDescr",
                title: "newTitle",
                variants: [],
            };
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        changeArticle(article:{
                            ean:"${expectedResult.ean}", 
                            price:${expectedResult.price}, 
                            description : "${expectedResult.description}",
                            title: "${expectedResult.title}"}){
                          title,
                          description,
                          price,
                          ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["changeArticle"] as TArticle;
                });
            expect(result.ean).equal(expectedResult.ean, "EAN should be same");
            expect(result.description).equal(
                expectedResult.description,
                "Description should be same"
            );
            expect(result.price).equal(expectedResult.price, "prive should be same");
            expect(result.title).equal(expectedResult.title, "title should be same");
        });
        it("changeArticle - ean doesn't exist", async () => {
            let result: any = undefined;

            const expectedResult: TArticle = articles[0];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        changeArticle(article:{
                            ean:"${expectedResult.ean}1231", 
                            }){
                          title,
                          description,
                          price,
                          ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {})
                .catch((err) => {
                    result = err.response.data.errors;
                });
            expect(result == undefined).equal(false, "errors in response should be defined");
        });
        it("changeArticel - no other attributes", async () => {
            let result: TArticle = {} as TArticle;

            const expectedResult: TArticle = articles[4];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        changeArticle(article:{
                            ean:"${expectedResult.ean}", 
                            }){
                          title,
                          description,
                          price,
                          ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["changeArticle"] as TArticle;
                });

            expect(result.ean).equal(expectedResult.ean, "EAN should be same");
            expect(result.description).equal(
                expectedResult.description,
                "Description should be same"
            );
            expect(result.price).equal(expectedResult.price, "prive should be same");
            expect(result.title).equal(expectedResult.title, "title should be same");
        });

        it("deleteVariant - parent exists, char exists", async () => {
            let result: TArticle = {} as TArticle;

            const expectedResult: TArticle = articles[5];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        deleteVariant(variant:{
                                characteristic:"toDelete", 
                                parent: {ean:"${expectedResult.ean}"}}){
                        title,
                        description,
                        price,
                        ean, variants{
                            characteristic
                          }
                      }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["deleteVariant"] as TArticle;
                });
            expect(result.ean).equal(expectedResult.ean, "EAN should be same");
            expect(result.description).equal(
                expectedResult.description,
                "Description should be same"
            );
            expect(result.price).equal(expectedResult.price, "prive should be same");
            expect(result.title).equal(expectedResult.title, "title should be same");
            expect(result.variants.length).equal(0, "it should be 0 returned variants");
        });
        it("deleteVariant - parent exists, char doesn't exist", async () => {
            let result: any = undefined;

            const expectedResult: TArticle = articles[0];

            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        deleteVariant(variant:{
                                characteristic:"someChasadasdasdasdr", 
                                parent: {ean:"${expectedResult.ean}"}}){
                        title,
                        description,
                        price,
                        ean
                      }
                    }`,
                    variables: null,
                })
                .then((res) => {})
                .catch((err) => {
                    result = err.response.data.errors;
                });
            expect(result == undefined).equal(false, "errors in result should be defined");
        });
        it("deleteVariant - parent doesn't exist", async () => {
            let result: any = undefined;

            const expectedResult: TArticle = articles[0];

            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        deleteVariant(variant:{
                                characteristic:"someChar", 
                                parent: {ean:"someEanjhjjjhjh"}}){
                        title,
                        description,
                        price,
                        ean
                      }
                    }`,
                    variables: null,
                })
                .then((res) => {})
                .catch((err) => {
                    result = err.response.data.errors;
                });
            expect(result == undefined).equal(false, "errors in result should be defined");
        });

        it("mutation - addArticle without user - check warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addArticle(article:{title:"newTItel", description:"newDesct", 
                        price:10.0, ean:"newEan" }){
                          ean
                        }
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(false, "warning in result should be defined");
        });
        it("mutation - addVariant without user - check warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addVariant(variant:{characteristic:"someChar", parent:{ean:"newEan"}}){
                          ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(false, "warning in result should be defined");
        });
        it("mutation - changeArticle without user - check warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        changeArticle(article: {ean: "newEan"}) {
                            ean
                          }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(false, "warning in result should be defined");
        });
        it("mutation - deleteVariant without user - check warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation {
                        deleteVariant(variant:{characteristic:"someChar", parent:{ean:"newEan"}}){
                        ean
                      }
                    }
                    `,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(false, "warning in result should be defined");
        });

        it("mutation - addArticle with user - no warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addArticle(user:"someUser",article:{title:"newTItel", description:"newDesct", 
                        price:10.0, ean:"newEanUnique1123456" }){
                          ean
                        }
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(true, "warning in result should be not defined");
        });
        it("mutation - addVariant with user - no warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addVariant(user:"someUser",variant:{characteristic:"someChar", parent:{ean:"newEan"}}){
                          ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(true, "warning in result should be not defined");
        });
        it("mutation - changeArticle with user - no warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        changeArticle(user:"someUser",article: {ean: "newEan"}) {
                            ean
                          }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(true, "warning in result should be not defined");
        });
        it("mutation - deleteVariant with user - no warning", async () => {
            let result: any = undefined;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation {
                        deleteVariant(user:"someUser",variant:{characteristic:"someChar", parent:{ean:"newEan"}}){
                        ean
                      }
                    }
                    `,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as any;
                });
            expect(result == undefined).equal(true, "warning in result should be not defined");
        });

        it("mutation - addArticle with user - createdBy... are not empty", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addArticle(article:{title:"newTitle", description:"newDesc", price:1.0, ean:"newEAN"}, user:"myUSer"){
                          createdBy,
                          createdAt,
                          lastChangedAt,
                          lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["addArticle"] as TArticle;
                });

            expect(result.createdBy == undefined).equal(false, "createdBy should be defined");
            expect(result.createdAt == undefined).equal(false, "createdAt should be defined");
            expect(result.lastChangedAt == undefined).equal(
                false,
                "lastChangedAt should be defined"
            );
            expect(result.lastChangedBy == undefined).equal(
                false,
                "lastChangedBy should be defined"
            );
        });
        it("mutation - addVariant with user - createdBy... are not empty", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addVariant(variant:{characteristic:"someNewChar", parent:{ean:"newEan"}}, user:"newUser"){
                          variants{
                          createdBy,
                            createdAt,
                            lastChangedAt,
                            lastChangedBy
                        }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["addVariant"]["variants"][0] as TVariant;
                });
            expect(result.createdBy == undefined).equal(false, "createdBy should be defined");
            expect(result.createdAt == undefined).equal(false, "createdAt should be defined");
            expect(result.lastChangedAt == undefined).equal(
                false,
                "lastChangedAt should be defined"
            );
            expect(result.lastChangedBy == undefined).equal(
                false,
                "lastChangedBy should be defined"
            );
        });
        it("mutation - changeArticle with user - changedBy and ChangedAt are not empty", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        changeArticle(article:{ean:"newEan"}, user:"myUser"){
                        lastChangedAt,
                        lastChangedBy
                      }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["changeArticle"] as TArticle;
                });
            expect(result.lastChangedAt == undefined).equal(
                false,
                "lastChangedAt should be defined"
            );
            expect(result.lastChangedBy == undefined).equal(
                false,
                "lastChangedBy should be defined"
            );
        });
        it("mutation - deleteVariant with user - changedBy and CreatedBy are not empty", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        deleteVariant(variant:{characteristic:"someNewChar", parent:{ean:"newEan"}}, user:"myNewUser"){
                        lastChangedAt,
                        lastChangedBy
                      }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["deleteVariant"] as TArticle;
                });

            expect(result.lastChangedBy == "myNewUser").equal(
                true,
                "lastChangedBy should be 'myNewUser'"
            );
        });
    });
    describe("update 2 properties work correct", () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(articles);
        });
        after(async () => {
            await a.closeConnection();
        });

        it("changedBy(articles) of Articel is empty - null is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        lastChangedBy}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0] as TArticle;
                });
            expect(result.lastChangedBy).equal(null, "lastChangedBy should be null");
        });
        it("createdBy(articles) of Articel is empty - null is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        createdBy}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0] as TArticle;
                });

            expect(result.createdBy).equal(null, "lastChangedBy should be null");
        });
        it("changeAt(articles) of Articel is empty - unix epoch is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        lastChangedAt}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0] as TArticle;
                });

            expect(result.lastChangedAt).equal(
                new Date(0).toISOString(),
                "lastChangedBy should be 1970"
            );
        });
        it("createdAt(articles) of Articel is empty - unix epoch is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        createdAt}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0] as TArticle;
                });

            expect(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
        });

        it("changedBy(paginatedArticles) of Articel is empty - null is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            createdBy
                            createdAt
                            lastChangedAt
                            lastChangedBy
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.lastChangedBy).equal(null, "lastChangedBy should be null");
        });
        it("createdBy(paginatedArticles) of Articel is empty - null is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            createdBy
                            createdAt
                            lastChangedAt
                            lastChangedBy
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });

            expect(result.createdBy).equal(null, "lastChangedBy should be null");
        });
        it("changeAt(paginatedArticles) of Articel is empty - unix epoch is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            createdBy
                            createdAt
                            lastChangedAt
                            lastChangedBy
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });

            expect(result.lastChangedAt).equal(
                new Date(0).toISOString(),
                "lastChangedBy should be 1970"
            );
        });
        it("createdAt(paginatedArticles) of Articel is empty - unix epoch is expected", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                            createdBy
                            createdAt
                            lastChangedAt
                            lastChangedBy
                          }}
                        }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0] as TArticle;
                });
            expect(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
        });

        it("changedBy(articles) of Variant is empty - null is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        variants{
                          createdBy,
                          createdAt,
                          lastChangedAt,
                          lastChangedBy
                        }}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0]["variants"][0] as TVariant;
                });
            expect(result.lastChangedBy).equal(null, "lastChangedBy should be null");
        });
        it("createdBy(articles) of Variant is empty - null is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        variants{
                          createdBy,
                          createdAt,
                          lastChangedAt,
                          lastChangedBy
                        }}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0]["variants"][0] as TVariant;
                });

            expect(result.createdBy).equal(null, "lastChangedBy should be null");
        });
        it("changeAt(articles) of Variant is empty - unix epoch is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        variants{
                          createdBy,
                          createdAt,
                          lastChangedAt,
                          lastChangedBy
                        }}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0]["variants"][0] as TVariant;
                });

            expect(result.lastChangedAt).equal(
                new Date(0).toISOString(),
                "lastChangedBy should be 1970"
            );
        });
        it("createdAt(articles) of Variant is empty - unix epoch is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                        variants{
                          createdBy,
                          createdAt,
                          lastChangedAt,
                          lastChangedBy
                        }}}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"][0]["variants"][0] as TVariant;
                });

            expect(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
        });

        it("changedBy(paginatedArticles) of Variant is empty - null is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                        variants{
                        createdBy
                        createdAt
                        lastChangedAt
                        lastChangedBy}}
                        }}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "variants"
                    ][0] as TVariant;
                });
            expect(result.lastChangedBy).equal(null, "lastChangedBy should be null");
        });
        it("createdBy(paginatedArticles) of Variant is empty - null is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                        variants{
                        createdBy
                        createdAt
                        lastChangedAt
                        lastChangedBy}}
                        }}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "variants"
                    ][0] as TVariant;
                });

            expect(result.createdBy).equal(null, "lastChangedBy should be null");
        });
        it("changeAt(paginatedArticles) of Variant is empty - unix epoch is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                        variants{
                        createdBy
                        createdAt
                        lastChangedAt
                        lastChangedBy}}
                        }}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "variants"
                    ][0] as TVariant;
                });

            expect(result.lastChangedAt).equal(
                new Date(0).toISOString(),
                "lastChangedBy should be 1970"
            );
        });
        it("createdAt(paginatedArticles) of Variant is empty - unix epoch is expected", async () => {
            let result: TVariant = {} as TVariant;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
                          items{
                        variants{
                        createdBy
                        createdAt
                        lastChangedAt
                        lastChangedBy}}
                        }}`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "variants"
                    ][0] as TVariant;
                });
            expect(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
        });
    });
    describe("old compatibilities", () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(timeStapedArticles);
        });
        after(async () => {
            await a.closeConnection();
        });
        it("changedBy - sorted (ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{lastChangedBy:ASC}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.lastChangedBySortedASC(result)).equal(true, `changers not sorted`);
        });
        it("changedBy - sorted (DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{lastChangedBy:DESC}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.lastChangedBySortedDESC(result)).equal(
                true,
                `changers not sorted`
            );
        });
        it("createdBy - sorted (ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{createdBy:ASC}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.createdBySortedASC(result)).equal(true, `creators are not sorted`);
        });
        it("createdBy - sorted (DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{createdBy:DESC}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.createdBySortedDESC(result)).equal(
                true,
                `creators are not sorted`
            );
        });

        it("createdAt - sorted (ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{createdAt:ASC}){
                            createdAt
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.createdAtSortedASC(result)).equal(
                true,
                `create times are not sorted`
            );
        });
        it("createdAt - sorted (DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{createdAt:DESC}){
                            createdAt
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.createdAtSortedDESC(result)).equal(
                true,
                `create times are not sorted`
            );
        });
        it("changedAt - sorted (ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{lastChangedAt:ASC}){
                            lastChangedAt
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.lastChangedAtSortedASC(result)).equal(
                true,
                `change times are not sorted`
            );
        });
        it("changedAt - sorted (DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{lastChangedAt:DESC}){
                            lastChangedAt
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.lastChangedAtSortedDESC(result)).equal(
                true,
                `change times are not sorted`
            );
        });

        it("createdBy - filtered 'eq' empty", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{createdBy:{eq:"bmw x3"}}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.createdBy == "bmw x3";
                }, result)
            ).equal(result.length, "count of objects with 'bmw x3' should be 0");
        });
        it("createdBy - filtered 'eq' 1 result", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{createdBy:{eq:"Milana"}}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.createdBy == "Milana";
                }, result)
            ).equal(result.length, "count of objects with 'Milana' should be 1");
        });
        it("createdBy - filtered 'eq' 2 or more results", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{createdBy:{eq:"Ivan"}}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.createdBy == "Ivan";
                }, result)
            ).equal(result.length, "count of objects with 'Ivan' should be more as 2");
        });
        it("createdBy - filtered 'contains' empty", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{createdBy:{contains:"bmw"}}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.createdBy) return article.createdBy.indexOf("bmw") != -1;
                    return false;
                }, result)
            ).equal(result.length, "count of objects with 'bmw' should be 0");
        });
        it("createdBy - filtered 'contains' 1 result", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{createdBy:{contains:"Nasty"}}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.createdBy) return article.createdBy.indexOf("Nasty") != -1;
                    return false;
                }, result)
            ).equal(result.length, "count of objects with 'Nasty' should be 1");
        });
        it("createdBy - filtered 'contains' 2 or more results", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{createdBy:{contains:"Iva"}}){
                            createdBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.createdBy) return article.createdBy.indexOf("Iva") != -1;
                    return false;
                }, result)
            ).equal(result.length, "count of objects with 'Iva' should be more as 2");
        });

        it("lastChangedBy - filtered 'eq' empty", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{lastChangedBy:{eq:"bmw x3"}}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.lastChangedBy == "bmw x3";
                }, result)
            ).equal(result.length, "count of objects with 'bmw x3' should be 0");
        });
        it("lastChangedBy - filtered 'eq' 1 result", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{lastChangedBy:{eq:"Alica"}}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.lastChangedBy == "Alica";
                }, result)
            ).equal(result.length, "count of objects with 'Alica' should be 1");
        });
        it("lastChangedBy - filtered 'eq' 2 or more results", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{createdBy:{eq:"Alex"}}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.lastChangedBy == "Alex";
                }, result)
            ).equal(result.length, "count of objects with 'Alex' should be more as 2");
        });
        it("lastChangedBy - filtered 'contains' empty", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{lastChangedBy:{contains:"bmw"}}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.lastChangedBy) return article.lastChangedBy.indexOf("bmw") != -1;
                    return false;
                }, result)
            ).equal(result.length, "count of objects with 'bmw x3' should be 0");
        });
        it("lastChangedBy - filtered 'contains' 1 result", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{lastChangedBy:{contains:"tepan"}}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.lastChangedBy) return article.lastChangedBy.indexOf("tepan") != -1;
                    return false;
                }, result)
            ).equal(result.length, "count of objects with 'tepan' should be 1");
        });
        it("lastChangedBy - filtered 'contains' 2 or more results", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{lastChangedBy:{contains:"Ale"}}){
                            lastChangedBy
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.lastChangedBy) return article.lastChangedBy.indexOf("Ale") != -1;
                    return false;
                }, result)
            ).equal(result.length, "count of objects with 'Ale' should be more as 2");
        });

        it("createdAt - filtered 'eq' empty");
        it("createdAt - filtered 'eq' 1 result");
        it("createdAt - filtered 'eq' 2 or more results");
        it("createdAt - filtered 'gte' empty");
        it("createdAt - filtered 'gte' 1 result");
        it("createdAt - filtered 'gte' 2 or more results");
        it("createdAt - filtered 'lte' empty");
        it("createdAt - filtered 'lte' 1 result");
        it("createdAt - filtered 'lte' 2 or more results");

        it("changedAt - filtered 'eq' empty");
        it("changedAt - filtered 'eq' 1 result");
        it("changedAt - filtered 'eq' 2 or more results");
        it("changedAt - filtered 'gte' empty");
        it("changedAt - filtered 'gte' 1 result");
        it("changedAt - filtered 'gte' 2 or more results");
        it("changedAt - filtered 'lte' empty");
        it("changedAt - filtered 'lte' 1 result");
        it("changedAt - filtered 'lte' 2 or more results");

        it("some complex with $or and $and");
    });
});
