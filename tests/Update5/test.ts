import axios from "axios";
import { expect } from "chai";
import { TArticle } from "../../src/types/TArticle";
import { TestDatabase } from "../testDataBases/createTestDatabase";
import { uncompletedArticles } from "../Update4/uncompletedArticles";

describe("Update 5", () => {
    describe("new extensions", async () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(uncompletedArticles);
        });
        after(async () => {
            await a.closeConnection();
        });
        it("query: 'articles' title - warning", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                            title
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as string;
                });
            expect(result).not.equal(undefined, "warning should be defined");
            expect(result.indexOf("title")).not.equal(-1, "warning should contain 'title'");
        });
        it("query: 'articles' description - warning", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        articles{
                            description
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as string;
                });
            expect(result).not.equal(undefined, "warning should be defined");
            expect(result.indexOf("description")).not.equal(-1, "warning should contain 'title'");
        });
        it("query: 'paginatedArticles' title - warning", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:0){
	                        items{
                                title
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
        it("query: 'paginatedArticles' description - warning", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:0){
	                        items{
                                description
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
    });
    describe("new extensions", async () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase([]);
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addArticle(
                            article:{
                                title: "germantTitle", 
                                description: "germanDescription", 
                                price : 1.0, 
                                ean: "ean"}){
                        ean
                    }
                    }`,
                    variables: null,
                })
                .then((res) => {});
        });
        after(async () => {
            await a.closeConnection();
        });
        it("titleDE is available", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                titleDE{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleDE"
                    ] as TArticle;
                });

            expect(result).not.equal(null, "titleDE shouldn't be 'null'");
        });
        it("descriptionDE is available", async () => {
            let result: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionDE{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionDE"
                    ] as TArticle;
                });
            expect(result).not.equal(null, "descriptionDE shouldn't be 'null'");
        });
        it("title returns titleDE.content", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                title
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "title"
                    ] as string;
                });
            expect(result).equal("germantTitle", "title should be 'germanTitle'");
        });
        it("description returns descriptionDE.content", async () => {
            let result: string = "";
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                description
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "description"
                    ] as string;
                });
            expect(result).equal("germanDescription", "description should be 'germanDescription'");
        });

        it("addTranslation ean exists, language exists");
        it("addTranslation ean doen't exists, language exists");
        it("addTranslation ean exists, language doesn't exist");
    });
    describe("old compatibilities", () => {
        it("addTranslation, user not defined - warning");
        it("old 'addArticle' converts title in titleDE as translation");
        it("old 'addArticle' converts description in descriptionDE as translation");
        it("old articles are automatically translated with libretranslate");
    });
    describe("check languages (title + description)", async () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase([]);
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `mutation{
                        addArticle(
                            article:{
                                title: "germantTitle", 
                                description: "germanDescription", 
                                price : 1.0, 
                                ean: "ean"}){
                        ean
                    }
                    }`,
                    variables: null,
                })
                .then((res) => {});
        });
        after(async () => {
            await a.closeConnection();
        });
        it("check English (EN)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionEN{
                                    language
                                }
                                titleEN{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleEN"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionEN"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleEN shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionEN shouldn't be 'null'");
        });
        it("check Arabic (AR)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionAR{
                                    language
                                }
                                titleAR{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleAR"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionAR"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleAR shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionAR shouldn't be 'null'");
        });
        it("check Chinese (ZH)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionZH{
                                    language
                                }
                                titleZH{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleZH"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionZH"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleZH shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionZH shouldn't be 'null'");
        });
        it("check Dutch (NL)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionNL{
                                    language
                                }
                                titleNL{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleNL"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionNL"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleNL shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionNL shouldn't be 'null'");
        });
        it("check Finnish (FI)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionFI{
                                    language
                                }
                                titleFI{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleFI"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionFI"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleFI shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionFI shouldn't be 'null'");
        });
        it("check French (FR)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionFR{
                                    language
                                }
                                titleFR{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleFR"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionFR"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleFR shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionFR shouldn't be 'null'");
        });
        it("check German(DE)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionDE{
                                    language
                                }
                                titleDE{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleDE"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionDE"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleDE shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionDE shouldn't be 'null'");
        });
        it("check Hindi (HI)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionHI{
                                    language
                                }
                                titleHI{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleHI"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionHI"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleHI shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionHI shouldn't be 'null'");
        });
        it("check Hungarian (HU)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionHU{
                                    language
                                }
                                titleHU{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleHU"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionHU"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleHU shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionHU shouldn't be 'null'");
        });
        it("check Indonesian (ID)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionID{
                                    language
                                }
                                titleID{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleID"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionID"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleID shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionID shouldn't be 'null'");
        });
        it("check Irish (GA)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionGA{
                                    language
                                }
                                titleGA{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleGA"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionGA"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleGA shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionGA shouldn't be 'null'");
        });
        it("check Italian (IT)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionIT{
                                    language
                                }
                                titleIT{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleIT"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionIT"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleIT shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionIT shouldn't be 'null'");
        });
        it("check Japanese (JA)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionJA{
                                    language
                                }
                                titleJA{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleJA"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionJA"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleJA shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionJA shouldn't be 'null'");
        });
        it("check Korean (KO)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionKO{
                                    language
                                }
                                titleKO{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleKO"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionKO"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleKO shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionKO shouldn't be 'null'");
        });
        it("check Polish (PL)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionPL{
                                    language
                                }
                                titlePL{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titlePL"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionPL"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titlePL shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionPL shouldn't be 'null'");
        });
        it("check Portuguese (PT)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionPT{
                                    language
                                }
                                titlePT{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titlePT"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionPT"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titlePT shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionPT shouldn't be 'null'");
        });
        it("check Russian (RU)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionRU{
                                    language
                                }
                                titleRU{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleRU"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionRU"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleRU shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionRU shouldn't be 'null'");
        });
        it("check Spanish (ES)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionES{
                                    language
                                }
                                titleES{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleES"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionES"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleES shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionES shouldn't be 'null'");
        });
        it("check Swedish (SV)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionSV{
                                    language
                                }
                                titleSV{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleSV"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionSV"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleSV shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionSV shouldn't be 'null'");
        });
        it("check Turkish (TR)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionTR{
                                    language
                                }
                                titleTR{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleTR"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionTR"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleTR shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionTR shouldn't be 'null'");
        });
        it("check Ukranian (UK)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionUK{
                                    language
                                }
                                titleUK{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleUK"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionUK"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleUK shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionUK shouldn't be 'null'");
        });
        it("check Vietnamese (VI)", async () => {
            let resultTitle: TArticle = {} as TArticle;
            let resultDescription: TArticle = {} as TArticle;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip:0, take:1){
	                        items{
                                descriptionVI{
                                    language
                                }
                                titleVI{
                                    language
                                }
                            }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    resultTitle = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "titleVI"
                    ] as TArticle;
                    resultDescription = (res.data as any)["data"]["paginatedArticles"]["items"][0][
                        "descriptionVI"
                    ] as TArticle;
                });
            expect(resultTitle).not.equal(null, "titleVI shouldn't be 'null'");
            expect(resultDescription).not.equal(null, "descriptionVI shouldn't be 'null'");
        });
    });
});
