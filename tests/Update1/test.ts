import axios from "axios";
import { expect } from "chai";
import { TArticle } from "../../src/types/TArticle";
import { TestDatabase } from "../testDataBases/createTestDatabase";

describe("Update 1", async () => {
    describe("test", async () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase([]);
        });

        it("add article", async () => {
            let result: TArticle = {
                description: "",
                ean: "",
                price: -1,
                title: "",
                variants: [],
            };

            let expectedResult: TArticle = {
                description: "someDescription",
                ean: "someEan",
                price: 11.11,
                title: "someTitle",
                variants: [],
            };

            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addArticle(
                            article:{
                                title: "${expectedResult.title}", 
                                description: "${expectedResult.description}", 
                                price : ${expectedResult.price}, 
                                ean: "${expectedResult.ean}"}){
                        title,
                        description,
                        price,
                        ean
                    }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["addArticle"] as TArticle;
                });

            expect(expectedResult.ean).equal(result.ean, "ean is not the same");
            expect(expectedResult.price).equal(result.price, "price is not the same");
            expect(expectedResult.title).equal(result.title, "title is not the same");
            expect(expectedResult.description).equal(
                result.description,
                "description is not the same"
            );
        });
        it("add 2 article", async () => {
            let result: TArticle = {
                description: "",
                ean: "",
                price: -1,
                title: "",
                variants: [],
            };

            let expectedResult: TArticle = {
                description: "someDescription2",
                ean: "someEan2",
                price: 111.11,
                title: "someTitle2",
                variants: [],
            };

            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addArticle(
                            article:{
                                title: "${expectedResult.title}", 
                                description: "${expectedResult.description}", 
                                price : ${expectedResult.price}, 
                                ean: "${expectedResult.ean}"}){
                        title,
                        description,
                        price,
                        ean
                    }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["addArticle"] as TArticle;
                });

            expect(expectedResult.ean).equal(result.ean, "ean is not the same");
            expect(expectedResult.price).equal(result.price, "price is not the same");
            expect(expectedResult.title).equal(result.title, "title is not the same");
            expect(expectedResult.description).equal(
                result.description,
                "description is not the same"
            );
        });
        it("add variant", async () => {
            let result: TArticle = {
                description: "",
                ean: "",
                price: -1,
                title: "",
                variants: [],
            };

            let expectedResult: TArticle = {
                description: "someDescription",
                ean: "someEan",
                price: 11.11,
                title: "someTitle",
                variants: [
                    {
                        characteristic: "someChar",
                    },
                ],
            };

            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addVariant(variant :{
                            characteristic:"${expectedResult.variants[0].characteristic}", 
                            parent:{
                                ean:"someEan"
                            }
                        }){
                            title,
                            description,
                            price,
                            ean
                            variants{
                                characteristic
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["addVariant"] as TArticle;
                })
                .catch((err) => {
                    //console.log(err);
                });
            expect(expectedResult.ean).equal(result.ean, "ean is not the same");
            expect(expectedResult.price).equal(result.price, "price is not the same");
            expect(expectedResult.title).equal(result.title, "title is not the same");
            expect(expectedResult.description).equal(
                result.description,
                "description is not the same"
            );
            expect(JSON.stringify(expectedResult.variants)).equal(
                JSON.stringify(result.variants),
                "variants are not the same"
            );
        });
        it("add 2nd variant", async () => {
            let result: TArticle = {
                description: "",
                ean: "",
                price: -1,
                title: "",
                variants: [],
            };

            let expectedResult: TArticle = {
                description: "someDescription",
                ean: "someEan",
                price: 11.11,
                title: "someTitle",
                variants: [
                    {
                        characteristic: "someChar",
                    },
                    {
                        characteristic: "someChar2",
                    },
                ],
            };

            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addVariant(variant :{
                            characteristic:"${expectedResult.variants[1].characteristic}", 
                            parent:{
                                ean:"someEan"
                            }
                        }){
                            title,
                            description,
                            price,
                            ean
                            variants{
                                characteristic
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["addVariant"] as TArticle;
                })
                .catch((err) => {
                    //console.log(err);
                });
            expect(expectedResult.ean).equal(result.ean, "ean is not the same");
            expect(expectedResult.price).equal(result.price, "price is not the same");
            expect(expectedResult.title).equal(result.title, "title is not the same");
            expect(expectedResult.description).equal(
                result.description,
                "description is not the same"
            );
            expect(JSON.stringify(expectedResult.variants)).equal(
                JSON.stringify(result.variants),
                "variants are not the same"
            );
        });

        after(async () => {
            await a.closeConnection();
        });
    });
});
