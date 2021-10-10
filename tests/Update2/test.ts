import axios from "axios";
import { expect } from "chai";
import { TArticle } from "../../src/types/TArticle";
import { TPageInfo } from "../../src/types/TPageInfo";
import { TestDatabase } from "../testDataBases/createTestDatabase";
import { articles } from "../testDataBases/simpleDatabase";

describe("Update 2", async () => {
    describe("test", async () => {
        const a = new TestDatabase();
        before(async () => {
            await a.createDatabase(articles);
        });

        it("articles (check warning)", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: "query{articles{title, description, price ,ean}}",
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["warning"] as TArticle[];
                });
            expect(result == undefined).equal(false, "warning should be defined by this request");
        });
        it("skip 0 -> skips nothing", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip :0, take : 100){
                          items{
                            title,
                            description,
                            price
                          }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"] as TArticle[];
                });
            expect(result.length).equal(articles.length, `${articles.length} elements is expected`);
        });
        it("skip 3 skips first 3 items", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip :3, take : 100){
                          items{
                            title,
                            description,
                            price
                          }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"] as TArticle[];
                });
            expect(result.length).equal(
                articles.length - 3,
                `${articles.length - 3} elements is expected`
            );
        });
        it("skip 999 skip all elements", async () => {
            let result: TArticle[] = [];
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip :999, take : 100){
                          items{
                            title,
                            description,
                            price
                          }
                        }
                      }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["items"] as TArticle[];
                });
            expect(result.length).equal(0, `${0} elements is expected`);
        });

        it("skip 0 - no previous page", async () => {
            let result: TPageInfo = {} as any;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip :0, take : 100){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"][
                        "pageInfo"
                    ] as TPageInfo;
                });
            expect(result.hasPreviousPage).equal(false, `no previous page is expected`);
        });
        it("skip 1 - previuos page exists", async () => {
            let result: TPageInfo = {} as any;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip :1, take : 4){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"][
                        "pageInfo"
                    ] as TPageInfo;
                });
            expect(result.hasPreviousPage).equal(true, `previous page is expected`);
        });
        it("skip 1000, take 10 in Database only 10 - previous page not exists", async () => {
            let result: TPageInfo = {} as any;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip :1000, take : 100){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"][
                        "pageInfo"
                    ] as TPageInfo;
                });
            expect(result.hasPreviousPage).equal(false, `no previous page is expected`);
        });

        it("more as 1 article on the next page(hasNextPage - true)", async () => {
            let result: TPageInfo = {} as any;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip : 0, take : 1){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage,
                                hasNextPage
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"][
                        "pageInfo"
                    ] as TPageInfo;
                });
            expect(result.hasNextPage).equal(true, `next page is expected`);
        });
        it("1 article is on the next page (hasNextPage - true)", async () => {
            let result: TPageInfo = {} as any;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip : 13, take : 1){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage,
                                hasNextPage
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"][
                        "pageInfo"
                    ] as TPageInfo;
                });
            expect(result.hasNextPage).equal(true, `next page is expected`);
        });
        it("0 article is on the next page(hasNextPage - false)", async () => {
            let result: TPageInfo = {} as any;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip : 14, take : 1){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage,
                                hasNextPage
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"][
                        "pageInfo"
                    ] as TPageInfo;
                });
            expect(result.hasNextPage).equal(false, `no next page is expected`);
        });
        it("list length is smaller than take (hasNextPage - false)", async () => {
            let result: TPageInfo = {} as any;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip : 0, take : 16){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage,
                                hasNextPage
                            }
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"][
                        "pageInfo"
                    ] as TPageInfo;
                });
            expect(result.hasNextPage).equal(false, `no next page is expected`);
        });

        it("totalCount is same take", async () => {
            let result: number = -1;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip : 0, take : 10){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage,
                                hasNextPage
                            },
                            totalCount
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["totalCount"] as number;
                });
            expect(result).equal(15, `totalCount should be 15`);
        });
        it("totalCount is bigger 0 and smaller take", async () => {
            let result: number = -1;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip : 0, take : 100){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage,
                                hasNextPage
                            },
                            totalCount
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["totalCount"] as number;
                });
            expect(result).equal(15, `totalCount should be 15`);
        });
        it("totalCount is 0", async () => {
            let result: number = -1;
            await axios
                .post("http://localhost:8080/graphql/?", {
                    query: `query{
                        paginatedArticles(skip : 100, take : 100){
                            items{
                                title,
                                description,
                                price
                            },
                            pageInfo{
                                hasPreviousPage,
                                hasNextPage
                            },
                            totalCount
                        }
                    }`,
                    variables: null,
                })
                .then((res) => {
                    result = (res.data as any)["data"]["paginatedArticles"]["totalCount"] as number;
                });
            expect(result).equal(15, `totalCount should be 15`);
        });

        after(async () => {
            await a.closeConnection();
        });
    });
});
