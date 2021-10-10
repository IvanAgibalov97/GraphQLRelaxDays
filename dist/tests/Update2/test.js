"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var chai_1 = require("chai");
var createTestDatabase_1 = require("../testDataBases/createTestDatabase");
var simpleDatabase_1 = require("../testDataBases/simpleDatabase");
describe("Update 2", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe("test", function () { return __awaiter(void 0, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                a = new createTestDatabase_1.TestDatabase();
                before(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, a.createDatabase(simpleDatabase_1.articles)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                it("articles (check warning)", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = [];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{articles{title, description, price ,ean}}",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "warning should be defined by this request");
                                return [2];
                        }
                    });
                }); });
                it("skip 0 -> skips nothing", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = [];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip :0, take : 100){\n                          items{\n                            title,\n                            description,\n                            price\n                          }\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["items"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.length).equal(simpleDatabase_1.articles.length, simpleDatabase_1.articles.length + " elements is expected");
                                return [2];
                        }
                    });
                }); });
                it("skip 3 skips first 3 items", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = [];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip :3, take : 100){\n                          items{\n                            title,\n                            description,\n                            price\n                          }\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["items"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.length).equal(simpleDatabase_1.articles.length - 3, simpleDatabase_1.articles.length - 3 + " elements is expected");
                                return [2];
                        }
                    });
                }); });
                it("skip 999 skip all elements", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = [];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip :999, take : 100){\n                          items{\n                            title,\n                            description,\n                            price\n                          }\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["items"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.length).equal(0, 0 + " elements is expected");
                                return [2];
                        }
                    });
                }); });
                it("skip 0 - no previous page", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip :0, take : 100){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage\n                            }\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["pageInfo"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.hasPreviousPage).equal(false, "no previous page is expected");
                                return [2];
                        }
                    });
                }); });
                it("skip 1 - previuos page exists", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip :1, take : 4){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage\n                            }\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["pageInfo"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.hasPreviousPage).equal(true, "previous page is expected");
                                return [2];
                        }
                    });
                }); });
                it("skip 1000, take 10 in Database only 10 - previous page not exists", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip :1000, take : 100){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage\n                            }\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["pageInfo"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.hasPreviousPage).equal(false, "no previous page is expected");
                                return [2];
                        }
                    });
                }); });
                it("more as 1 article on the next page(hasNextPage - true)", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip : 0, take : 1){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage,\n                                hasNextPage\n                            }\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["pageInfo"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.hasNextPage).equal(true, "next page is expected");
                                return [2];
                        }
                    });
                }); });
                it("1 article is on the next page (hasNextPage - true)", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip : 13, take : 1){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage,\n                                hasNextPage\n                            }\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["pageInfo"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.hasNextPage).equal(true, "next page is expected");
                                return [2];
                        }
                    });
                }); });
                it("0 article is on the next page(hasNextPage - false)", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip : 14, take : 1){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage,\n                                hasNextPage\n                            }\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["pageInfo"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.hasNextPage).equal(false, "no next page is expected");
                                return [2];
                        }
                    });
                }); });
                it("list length is smaller than take (hasNextPage - false)", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip : 0, take : 16){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage,\n                                hasNextPage\n                            }\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["pageInfo"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.hasNextPage).equal(false, "no next page is expected");
                                return [2];
                        }
                    });
                }); });
                it("totalCount is same take", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = -1;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip : 0, take : 10){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage,\n                                hasNextPage\n                            },\n                            totalCount\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["totalCount"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result).equal(15, "totalCount should be 15");
                                return [2];
                        }
                    });
                }); });
                it("totalCount is bigger 0 and smaller take", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = -1;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip : 0, take : 100){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage,\n                                hasNextPage\n                            },\n                            totalCount\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["totalCount"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result).equal(15, "totalCount should be 15");
                                return [2];
                        }
                    });
                }); });
                it("totalCount is 0", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = -1;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "query{\n                        paginatedArticles(skip : 100, take : 100){\n                            items{\n                                title,\n                                description,\n                                price\n                            },\n                            pageInfo{\n                                hasPreviousPage,\n                                hasNextPage\n                            },\n                            totalCount\n                        }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["paginatedArticles"]["totalCount"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result).equal(15, "totalCount should be 15");
                                return [2];
                        }
                    });
                }); });
                after(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, a.closeConnection()];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                return [2];
            });
        }); });
        return [2];
    });
}); });
//# sourceMappingURL=test.js.map