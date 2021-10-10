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
var createTestDatabase_1 = require("../testDataBases/createTestDatabase");
var simpleDatabase_1 = require("../testDataBases/simpleDatabase");
var axios_1 = __importDefault(require("axios"));
var chai_1 = require("chai");
var HelpFunction_1 = require("../testDataBases/HelpFunction");
describe("testing Update 0", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        describe("", function () {
            var a = new createTestDatabase_1.TestDatabase();
            before(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, a.createDatabase(simpleDatabase_1.articles)];
                        case 1:
                            _a.sent();
                            console.log(1);
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
            it("get all objects not sorted", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log(2);
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{articles{title, description, price ,ean}}",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result.length).equal(simpleDatabase_1.articles.length, "it should be " + simpleDatabase_1.articles.length + " elements");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by price(ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{price:ASC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.pricesAreSortedASC(result)).equal(true, "prices are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by price(DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{price:DESC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.pricesAreSortedDESC(result)).equal(true, "prices are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by description (ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{description:ASC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.descriptionsAreSortedASC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by description (DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{description:DESC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.descriptionsAreSortedDESC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by title (ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{title:ASC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.titlesAreSortedASC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by title (DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{title:DESC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.titlesAreSortedDESC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by ean (ASC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{ean:ASC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.eanAreSortedASC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects sorted by ean (DESC)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(order:{ean:DESC}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.eanAreSortedDESC(result)).equal(true, "change times are not sorted");
                            return [2];
                    }
                });
            }); });
            it("get all objects, which title 'bmw x3'", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{title:{eq:\"bmw x3\"}}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.title == "bmw x3";
                            }, result)).equal(result.length, "count of objects with 'bmw x3' should be 1");
                            return [2];
                    }
                });
            }); });
            it("get all objects, which title contains bmw", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{title:{contains:\"bmw\"}}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.title)
                                    return article.title.indexOf("bmw") != -1;
                                return false;
                            }, simpleDatabase_1.articles)).equal(result.length, "count of objects which contain 'bmw' should be 5");
                            return [2];
                    }
                });
            }); });
            it("get all objects, which price is 100.0", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{price:{eq:100}}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                return article.price == 100;
                            }, simpleDatabase_1.articles)).equal(result.length, "count of objects which price is 100.0 should be 1");
                            return [2];
                    }
                });
            }); });
            it("get all objects, which price is between 50 and 130", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{price:{lte:130, gte: 50}}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.price)
                                    return article.price >= 50 && article.price <= 130;
                                return false;
                            }, simpleDatabase_1.articles)).equal(result.length, "count of objects which price is 100.0 should be 1");
                            return [2];
                    }
                });
            }); });
            it("get all objects, which ean contains 'someEan' and description contains 'plane'", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{ean:{contains:\"someEan\"}, description:{contains:\"plane\"}}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.description)
                                    return (article.ean.indexOf("someEan") != -1 &&
                                        article.description.indexOf("plane") != -1);
                                return false;
                            }, simpleDatabase_1.articles)).equal(result.length, "count of object should be 5");
                            return [2];
                    }
                });
            }); });
            it("get all objects, which description contains 'car' or price is more than 500", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = [];
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles(where:{ or:{\n                            description:{contains:\"car\"},price:{\n                            gte:500\n                          }\n                        }}){\n                          title,\n                          description,\n                          price, ean\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["articles"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(HelpFunction_1.HelpFunctions.countOfObjetsIsSame(function (article) {
                                if (article.description && article.price)
                                    return article.description.indexOf("car") != -1 || article.price >= 500;
                                return false;
                            }, simpleDatabase_1.articles)).equal(result.length, "count of object should be 5");
                            return [2];
                    }
                });
            }); });
        });
        return [2];
    });
}); });
//# sourceMappingURL=test.js.map