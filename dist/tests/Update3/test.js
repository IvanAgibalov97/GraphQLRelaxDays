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
var HelpFunction_1 = require("../testDataBases/HelpFunction");
var simpleDatabase_1 = require("../testDataBases/simpleDatabase");
var update3Database_1 = require("../testDataBases/update3Database");
describe("Update 3", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe("new extensions", function () { return __awaiter(void 0, void 0, void 0, function () {
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
                it("changeArticle - ean exists", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, expectedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                expectedResult = {
                                    ean: "someEan1",
                                    price: 10000.0,
                                    description: "newDescr",
                                    title: "newTitle",
                                    variants: [],
                                };
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        changeArticle(article:{\n                            ean:\"" + expectedResult.ean + "\", \n                            price:" + expectedResult.price + ", \n                            description : \"" + expectedResult.description + "\",\n                            title: \"" + expectedResult.title + "\"}){\n                          title,\n                          description,\n                          price,\n                          ean\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["changeArticle"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.ean).equal(expectedResult.ean, "EAN should be same");
                                (0, chai_1.expect)(result.description).equal(expectedResult.description, "Description should be same");
                                (0, chai_1.expect)(result.price).equal(expectedResult.price, "prive should be same");
                                (0, chai_1.expect)(result.title).equal(expectedResult.title, "title should be same");
                                return [2];
                        }
                    });
                }); });
                it("changeArticle - ean doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, expectedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                expectedResult = simpleDatabase_1.articles[0];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        changeArticle(article:{\n                            ean:\"" + expectedResult.ean + "1231\", \n                            }){\n                          title,\n                          description,\n                          price,\n                          ean\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) { })
                                        .catch(function (err) {
                                        result = err.response.data.errors;
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "errors in response should be defined");
                                return [2];
                        }
                    });
                }); });
                it("changeArticel - no other attributes", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, expectedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                expectedResult = simpleDatabase_1.articles[4];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        changeArticle(article:{\n                            ean:\"" + expectedResult.ean + "\", \n                            }){\n                          title,\n                          description,\n                          price,\n                          ean\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["changeArticle"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.ean).equal(expectedResult.ean, "EAN should be same");
                                (0, chai_1.expect)(result.description).equal(expectedResult.description, "Description should be same");
                                (0, chai_1.expect)(result.price).equal(expectedResult.price, "prive should be same");
                                (0, chai_1.expect)(result.title).equal(expectedResult.title, "title should be same");
                                return [2];
                        }
                    });
                }); });
                it("deleteVariant - parent exists, char exists", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, expectedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                expectedResult = simpleDatabase_1.articles[5];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        deleteVariant(variant:{\n                                characteristic:\"toDelete\", \n                                parent: {ean:\"" + expectedResult.ean + "\"}}){\n                        title,\n                        description,\n                        price,\n                        ean, variants{\n                            characteristic\n                          }\n                      }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["deleteVariant"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.ean).equal(expectedResult.ean, "EAN should be same");
                                (0, chai_1.expect)(result.description).equal(expectedResult.description, "Description should be same");
                                (0, chai_1.expect)(result.price).equal(expectedResult.price, "prive should be same");
                                (0, chai_1.expect)(result.title).equal(expectedResult.title, "title should be same");
                                (0, chai_1.expect)(result.variants.length).equal(0, "it should be 0 returned variants");
                                return [2];
                        }
                    });
                }); });
                it("deleteVariant - parent exists, char doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, expectedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                expectedResult = simpleDatabase_1.articles[0];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        deleteVariant(variant:{\n                                characteristic:\"someChasadasdasdasdr\", \n                                parent: {ean:\"" + expectedResult.ean + "\"}}){\n                        title,\n                        description,\n                        price,\n                        ean\n                      }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) { })
                                        .catch(function (err) {
                                        result = err.response.data.errors;
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "errors in result should be defined");
                                return [2];
                        }
                    });
                }); });
                it("deleteVariant - parent doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result, expectedResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                expectedResult = simpleDatabase_1.articles[0];
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        deleteVariant(variant:{\n                                characteristic:\"someChar\", \n                                parent: {ean:\"someEanjhjjjhjh\"}}){\n                        title,\n                        description,\n                        price,\n                        ean\n                      }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) { })
                                        .catch(function (err) {
                                        result = err.response.data.errors;
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "errors in result should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - addArticle without user - check warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        addArticle(article:{title:\"newTItel\", description:\"newDesct\", \n                        price:10.0, ean:\"newEan\" }){\n                          ean\n                        }\n                        }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "warning in result should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - addVariant without user - check warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        addVariant(variant:{characteristic:\"someChar\", parent:{ean:\"newEan\"}}){\n                          ean\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "warning in result should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - changeArticle without user - check warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        changeArticle(article: {ean: \"newEan\"}) {\n                            ean\n                          }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "warning in result should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - deleteVariant without user - check warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation {\n                        deleteVariant(variant:{characteristic:\"someChar\", parent:{ean:\"newEan\"}}){\n                        ean\n                      }\n                    }\n                    ",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(false, "warning in result should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - addArticle with user - no warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        addArticle(user:\"someUser\",article:{title:\"newTItel\", description:\"newDesct\", \n                        price:10.0, ean:\"newEanUnique1123456\" }){\n                          ean\n                        }\n                        }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(true, "warning in result should be not defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - addVariant with user - no warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        addVariant(user:\"someUser\",variant:{characteristic:\"someChar\", parent:{ean:\"newEan\"}}){\n                          ean\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(true, "warning in result should be not defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - changeArticle with user - no warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        changeArticle(user:\"someUser\",article: {ean: \"newEan\"}) {\n                            ean\n                          }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(true, "warning in result should be not defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - deleteVariant with user - no warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = undefined;
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation {\n                        deleteVariant(user:\"someUser\",variant:{characteristic:\"someChar\", parent:{ean:\"newEan\"}}){\n                        ean\n                      }\n                    }\n                    ",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["warning"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result == undefined).equal(true, "warning in result should be not defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - addArticle with user - createdBy... are not empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        addArticle(article:{title:\"newTitle\", description:\"newDesc\", price:1.0, ean:\"newEAN\"}, user:\"myUSer\"){\n                          createdBy,\n                          createdAt,\n                          lastChangedAt,\n                          lastChangedBy\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["addArticle"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.createdBy == undefined).equal(false, "createdBy should be defined");
                                (0, chai_1.expect)(result.createdAt == undefined).equal(false, "createdAt should be defined");
                                (0, chai_1.expect)(result.lastChangedAt == undefined).equal(false, "lastChangedAt should be defined");
                                (0, chai_1.expect)(result.lastChangedBy == undefined).equal(false, "lastChangedBy should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - addVariant with user - createdBy... are not empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        addVariant(variant:{characteristic:\"someNewChar\", parent:{ean:\"newEan\"}}, user:\"newUser\"){\n                          variants{\n                          createdBy,\n                            createdAt,\n                            lastChangedAt,\n                            lastChangedBy\n                        }\n                        }\n                      }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["addVariant"]["variants"][0];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.createdBy == undefined).equal(false, "createdBy should be defined");
                                (0, chai_1.expect)(result.createdAt == undefined).equal(false, "createdAt should be defined");
                                (0, chai_1.expect)(result.lastChangedAt == undefined).equal(false, "lastChangedAt should be defined");
                                (0, chai_1.expect)(result.lastChangedBy == undefined).equal(false, "lastChangedBy should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - changeArticle with user - changedBy and ChangedAt are not empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        changeArticle(article:{ean:\"newEan\"}, user:\"myUser\"){\n                        lastChangedAt,\n                        lastChangedBy\n                      }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["changeArticle"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.lastChangedAt == undefined).equal(false, "lastChangedAt should be defined");
                                (0, chai_1.expect)(result.lastChangedBy == undefined).equal(false, "lastChangedBy should be defined");
                                return [2];
                        }
                    });
                }); });
                it("mutation - deleteVariant with user - changedBy and CreatedBy are not empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                return [4, axios_1.default
                                        .post("http://localhost:8080/graphql/?", {
                                        query: "mutation{\n                        deleteVariant(variant:{characteristic:\"someNewChar\", parent:{ean:\"newEan\"}}, user:\"myNewUser\"){\n                        lastChangedAt,\n                        lastChangedBy\n                      }\n                    }",
                                        variables: null,
                                    })
                                        .then(function (res) {
                                        result = res.data["data"]["deleteVariant"];
                                    })];
                            case 1:
                                _a.sent();
                                (0, chai_1.expect)(result.lastChangedBy == "myNewUser").equal(true, "lastChangedBy should be 'myNewUser'");
                                return [2];
                        }
                    });
                }); });
                return [2];
            });
        }); });
        describe("update 2 properties work correct", function () {
            var a = new createTestDatabase_1.TestDatabase();
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
            it("changedBy(articles) of Articel is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        lastChangedBy}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("createdBy(articles) of Articel is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        createdBy}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("changeAt(articles) of Articel is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        lastChangedAt}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedAt).equal(new Date(0).toISOString(), "lastChangedBy should be 1970");
                            return [2];
                    }
                });
            }); });
            it("createdAt(articles) of Articel is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        createdAt}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
                            return [2];
                    }
                });
            }); });
            it("changedBy(paginatedArticles) of Articel is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            createdBy\n                            createdAt\n                            lastChangedAt\n                            lastChangedBy\n                          }}\n                        }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("createdBy(paginatedArticles) of Articel is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            createdBy\n                            createdAt\n                            lastChangedAt\n                            lastChangedBy\n                          }}\n                        }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("changeAt(paginatedArticles) of Articel is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            createdBy\n                            createdAt\n                            lastChangedAt\n                            lastChangedBy\n                          }}\n                        }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedAt).equal(new Date(0).toISOString(), "lastChangedBy should be 1970");
                            return [2];
                    }
                });
            }); });
            it("createdAt(paginatedArticles) of Articel is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            createdBy\n                            createdAt\n                            lastChangedAt\n                            lastChangedBy\n                          }}\n                        }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
                            return [2];
                    }
                });
            }); });
            it("changedBy(articles) of Variant is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        variants{\n                          createdBy,\n                          createdAt,\n                          lastChangedAt,\n                          lastChangedBy\n                        }}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("createdBy(articles) of Variant is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        variants{\n                          createdBy,\n                          createdAt,\n                          lastChangedAt,\n                          lastChangedBy\n                        }}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("changeAt(articles) of Variant is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        variants{\n                          createdBy,\n                          createdAt,\n                          lastChangedAt,\n                          lastChangedBy\n                        }}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedAt).equal(new Date(0).toISOString(), "lastChangedBy should be 1970");
                            return [2];
                    }
                });
            }); });
            it("createdAt(articles) of Variant is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                        variants{\n                          createdBy,\n                          createdAt,\n                          lastChangedAt,\n                          lastChangedBy\n                        }}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
                            return [2];
                    }
                });
            }); });
            it("changedBy(paginatedArticles) of Variant is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                        variants{\n                        createdBy\n                        createdAt\n                        lastChangedAt\n                        lastChangedBy}}\n                        }}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("createdBy(paginatedArticles) of Variant is empty - null is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                        variants{\n                        createdBy\n                        createdAt\n                        lastChangedAt\n                        lastChangedBy}}\n                        }}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdBy).equal(null, "lastChangedBy should be null");
                            return [2];
                    }
                });
            }); });
            it("changeAt(paginatedArticles) of Variant is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                        variants{\n                        createdBy\n                        createdAt\n                        lastChangedAt\n                        lastChangedBy}}\n                        }}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.lastChangedAt).equal(new Date(0).toISOString(), "lastChangedBy should be 1970");
                            return [2];
                    }
                });
            }); });
            it("createdAt(paginatedArticles) of Variant is empty - unix epoch is expected", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                        variants{\n                        createdBy\n                        createdAt\n                        lastChangedAt\n                        lastChangedBy}}\n                        }}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["variants"][0];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.createdAt).equal(new Date(0).toISOString(), "createdAt should be 1970");
                            return [2];
                    }
                });
            }); });
        });
        describe("old compatibilities", function () {
            var a = new createTestDatabase_1.TestDatabase();
            before(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, a.createDatabase(update3Database_1.timeStapedArticles)];
                        case 1:
                            _a.sent();
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
            it("changedBy - sorted (ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{lastChangedBy:ASC}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.lastChangedBySortedASC(result)).equal(true, "changers not sorted");
                            return [2];
                    }
                });
            }); });
            it("changedBy - sorted (DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{lastChangedBy:DESC}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.lastChangedBySortedDESC(result)).equal(true, "changers not sorted");
                            return [2];
                    }
                });
            }); });
            it("createdBy - sorted (ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{createdBy:ASC}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.createdBySortedASC(result)).equal(true, "creators are not sorted");
                            return [2];
                    }
                });
            }); });
            it("createdBy - sorted (DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{createdBy:DESC}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.createdBySortedDESC(result)).equal(true, "creators are not sorted");
                            return [2];
                    }
                });
            }); });
            it("createdAt - sorted (ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{createdAt:ASC}){\n                            createdAt\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.createdAtSortedASC(result)).equal(true, "create times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("createdAt - sorted (DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{createdAt:DESC}){\n                            createdAt\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.createdAtSortedDESC(result)).equal(true, "create times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("changedAt - sorted (ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{lastChangedAt:ASC}){\n                            lastChangedAt\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.lastChangedAtSortedASC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("changedAt - sorted (DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{lastChangedAt:DESC}){\n                            lastChangedAt\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.lastChangedAtSortedDESC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("createdBy - filtered 'eq' empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{createdBy:{eq:\"bmw x3\"}}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.createdBy == "bmw x3";
                            }, result)).equal(result.length, "count of objects with 'bmw x3' should be 0");
                            return [2];
                    }
                });
            }); });
            it("createdBy - filtered 'eq' 1 result", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{createdBy:{eq:\"Milana\"}}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.createdBy == "Milana";
                            }, result)).equal(result.length, "count of objects with 'Milana' should be 1");
                            return [2];
                    }
                });
            }); });
            it("createdBy - filtered 'eq' 2 or more results", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{createdBy:{eq:\"Ivan\"}}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.createdBy == "Ivan";
                            }, result)).equal(result.length, "count of objects with 'Ivan' should be more as 2");
                            return [2];
                    }
                });
            }); });
            it("createdBy - filtered 'contains' empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{createdBy:{contains:\"bmw\"}}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.createdBy)
                                    return article.createdBy.indexOf("bmw") != -1;
                                return false;
                            }, result)).equal(result.length, "count of objects with 'bmw' should be 0");
                            return [2];
                    }
                });
            }); });
            it("createdBy - filtered 'contains' 1 result", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{createdBy:{contains:\"Nasty\"}}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.createdBy)
                                    return article.createdBy.indexOf("Nasty") != -1;
                                return false;
                            }, result)).equal(result.length, "count of objects with 'Nasty' should be 1");
                            return [2];
                    }
                });
            }); });
            it("createdBy - filtered 'contains' 2 or more results", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{createdBy:{contains:\"Iva\"}}){\n                            createdBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.createdBy)
                                    return article.createdBy.indexOf("Iva") != -1;
                                return false;
                            }, result)).equal(result.length, "count of objects with 'Iva' should be more as 2");
                            return [2];
                    }
                });
            }); });
            it("lastChangedBy - filtered 'eq' empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{lastChangedBy:{eq:\"bmw x3\"}}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.lastChangedBy == "bmw x3";
                            }, result)).equal(result.length, "count of objects with 'bmw x3' should be 0");
                            return [2];
                    }
                });
            }); });
            it("lastChangedBy - filtered 'eq' 1 result", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{lastChangedBy:{eq:\"Alica\"}}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.lastChangedBy == "Alica";
                            }, result)).equal(result.length, "count of objects with 'Alica' should be 1");
                            return [2];
                    }
                });
            }); });
            it("lastChangedBy - filtered 'eq' 2 or more results", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{createdBy:{eq:\"Alex\"}}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.lastChangedBy == "Alex";
                            }, result)).equal(result.length, "count of objects with 'Alex' should be more as 2");
                            return [2];
                    }
                });
            }); });
            it("lastChangedBy - filtered 'contains' empty", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{lastChangedBy:{contains:\"bmw\"}}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.lastChangedBy)
                                    return article.lastChangedBy.indexOf("bmw") != -1;
                                return false;
                            }, result)).equal(result.length, "count of objects with 'bmw x3' should be 0");
                            return [2];
                    }
                });
            }); });
            it("lastChangedBy - filtered 'contains' 1 result", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{lastChangedBy:{contains:\"tepan\"}}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.lastChangedBy)
                                    return article.lastChangedBy.indexOf("tepan") != -1;
                                return false;
                            }, result)).equal(result.length, "count of objects with 'tepan' should be 1");
                            return [2];
                    }
                });
            }); });
            it("lastChangedBy - filtered 'contains' 2 or more results", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{lastChangedBy:{contains:\"Ale\"}}){\n                            lastChangedBy\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.lastChangedBy)
                                    return article.lastChangedBy.indexOf("Ale") != -1;
                                return false;
                            }, result)).equal(result.length, "count of objects with 'Ale' should be more as 2");
                            return [2];
                    }
                });
            }); });
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
        return [2];
    });
}); });
//# sourceMappingURL=test.js.map