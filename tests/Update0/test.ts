import { TestDatabase } from "../testDataBases/createTestDatabase";
import { articles } from "../testDataBases/simpleDatabase";
import axios from "axios";
import { expect } from "chai";
import { HelpFunctions } from "../testDataBases/HelpFunction";
import { TArticle } from "../../src/types/TArticle";

describe("testing Update 0", async () => {
    describe("", () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(articles);
            console.log(1);
        });
        after(async () => {
            await a.closeConnection();
        });
        it("get all objects not sorted", async () => {
            console.log(2);
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: "query{articles{title, description, price ,ean}}",
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });
            expect(result.length).equal(
                articles.length,
                `it should be ${articles.length} elements`
            );
        });

        it("get all objects sorted by price(ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{price:ASC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.pricesAreSortedASC(result)).equal(true, `prices are not sorted`);
        });
        it("get all objects sorted by price(DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{price:DESC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.pricesAreSortedDESC(result)).equal(true, `prices are not sorted`);
        });
        it("get all objects sorted by description (ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{description:ASC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.descriptionsAreSortedASC(result)).equal(
                true,
                `change times are not sorted`
            );
        });
        it("get all objects sorted by description (DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{description:DESC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.descriptionsAreSortedDESC(result)).equal(
                true,
                `change times are not sorted`
            );
        });
        it("get all objects sorted by title (ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{title:ASC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.titlesAreSortedASC(result)).equal(
                true,
                `change times are not sorted`
            );
        });
        it("get all objects sorted by title (DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{title:DESC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.titlesAreSortedDESC(result)).equal(
                true,
                `change times are not sorted`
            );
        });
        it("get all objects sorted by ean (ASC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{ean:ASC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.eanAreSortedASC(result)).equal(
                true,
                `change times are not sorted`
            );
        });
        it("get all objects sorted by ean (DESC)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(order:{ean:DESC}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(HelpFunctions.eanAreSortedDESC(result)).equal(
                true,
                `change times are not sorted`
            );
        });

        it("get all objects, which title 'bmw x3'", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{title:{eq:"bmw x3"}}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.title == "bmw x3";
                }, result)
            ).equal(result.length, "count of objects with 'bmw x3' should be 1");
        });
        it("get all objects, which title contains bmw", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{title:{contains:"bmw"}}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.title) return article.title.indexOf("bmw") != -1;
                    return false;
                }, articles)
            ).equal(result.length, "count of objects which contain 'bmw' should be 5");
        });
        it("get all objects, which price is 100.0", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{price:{eq:100}}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    return article.price == 100;
                }, articles)
            ).equal(result.length, "count of objects which price is 100.0 should be 1");
        });
        it("get all objects, which price is between 50 and 130", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{price:{lte:130, gte: 50}}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.price) return article.price >= 50 && article.price <= 130;
                    return false;
                }, articles)
            ).equal(result.length, "count of objects which price is 100.0 should be 1");
        });
        it("get all objects, which ean contains 'someEan' and description contains 'plane'", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{ean:{contains:"someEan"}, description:{contains:"plane"}}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.description)
                        return (
                            article.ean.indexOf("someEan") != -1 &&
                            article.description.indexOf("plane") != -1
                        );
                    return false;
                }, articles)
            ).equal(result.length, "count of object should be 5");
        });
        it("get all objects, which description contains 'car' or price is more than 500", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles(where:{ or:{
                            description:{contains:"car"},price:{
                            gte:500
                          }
                        }}){
                          title,
                          description,
                          price, ean
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["articles"] as TArticle[];
                });

            expect(
                HelpFunctions.countOfObjetsIsSame((article: TArticle) => {
                    if (article.description && article.price)
                        return article.description.indexOf("car") != -1 || article.price >= 500;
                    return false;
                }, articles)
            ).equal(result.length, "count of object should be 5");
        });
    });
});
