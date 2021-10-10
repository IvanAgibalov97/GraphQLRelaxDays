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
var currencyController_1 = require("../../src/Controllers/CurrencyCtrlr/currencyController");
var createTestDatabase_1 = require("../testDataBases/createTestDatabase");
var update3Database_1 = require("../testDataBases/update3Database");
var node_cache_1 = __importDefault(require("node-cache"));
var uncompletedArticles_1 = require("./uncompletedArticles");
function clearCache() {
    new node_cache_1.default().del("currency");
}
describe("update 4", function () {
    describe("currencyController", function () {
        it("load from server", function () { return __awaiter(void 0, void 0, void 0, function () {
            var currencyController, loadCurrencies, curKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currencyController = new currencyController_1.CurrencyController();
                        return [4, currencyController._readFromServer()];
                    case 1:
                        _a.sent();
                        loadCurrencies = currencyController._currencies;
                        (0, chai_1.expect)(loadCurrencies.time).not.equal("", "time doesn't allow to be empty");
                        for (curKey in loadCurrencies.currencies) {
                            (0, chai_1.expect)(loadCurrencies.currencies[curKey]).not.equal(-1, "currency doesn't allow to be default value -1");
                        }
                        clearCache();
                        return [2];
                }
            });
        }); });
        it("save data in cache", function () { return __awaiter(void 0, void 0, void 0, function () {
            var ctrl_1, loadCurrencies, curKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ctrl_1 = new currencyController_1.CurrencyController();
                        return [4, ctrl_1._readFromServer()];
                    case 1:
                        _a.sent();
                        loadCurrencies = ctrl_1._currencies;
                        (0, chai_1.expect)(loadCurrencies).not.equal(undefined, "load currencies shouldn't be undefined");
                        (0, chai_1.expect)(loadCurrencies.time).not.equal("", "time doesn't allow to be empty");
                        for (curKey in loadCurrencies.currencies) {
                            (0, chai_1.expect)(loadCurrencies.currencies[curKey]).not.equal(-1, "currency doesn't allow to be default value -1");
                        }
                        clearCache();
                        return [2];
                }
            });
        }); });
        it("load currencies (from server, cache is expired)");
        it("load currencies (from cache, cache is actual)");
    });
    describe("new extensions", function () {
        var a = new createTestDatabase_1.TestDatabase();
        before(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, a.createDatabase(uncompletedArticles_1.uncompletedArticles)];
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
        it("return only completed articles", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        articles(where:{complete:{eq:true}}){\n                          title,\n                          description,\n                          price, ean,\n                        }\n                      }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["articles"];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.length).equal(7, "it should be only 7 completed articles");
                        return [2];
                }
            });
        }); });
        it("return not only completed articles", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        articles(where:{complete:{eq:false}}){\n                          title,\n                          description,\n                          price, ean,\n                        }\n                      }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["articles"];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.length).equal(15, "it should be only 15 completed articles");
                        return [2];
                }
            });
        }); });
        it("show warning if price by articles is required", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = "";
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        articles(where:{complete:{eq:false}}){\n\t                        price\n                        }\n                      }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["warning"];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result).not.equal(undefined, "warning should be defined");
                        (0, chai_1.expect)(result.length).not.equal(0, "warning shouldn't be empty");
                        return [2];
                }
            });
        }); });
        it("show no warning if another price by paginatedArticles is required", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = "";
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        articles(where:{complete:{eq:false}}){\n\t                        priceEUR\n                        }\n                      }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["warning"];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result).not.equal(undefined, "warning should be undefined");
                        (0, chai_1.expect)(result.indexOf("deprecated")).not.equal(-1, "it should return warning but not about price");
                        return [2];
                }
            });
        }); });
        it("show warning if price by paginatedArticles is asked", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = "";
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:0, where:{complete:{eq:false}}){\n\t                        items{\n                                price\n                            }\n                        }\n                      }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["warning"];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result).not.equal(undefined, "warning should be defined");
                        (0, chai_1.expect)(result.length).not.equal(0, "warning shouldn't be empty");
                        return [2];
                }
            });
        }); });
        it("show no warning if another price by articles is required", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = "";
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:0, where:{complete:{eq:false}}){\n\t                        items{\n                                priceEUR\n                            }\n                        }\n                      }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["warning"];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result).equal(undefined, "warning should be undefined");
                        return [2];
                }
            });
        }); });
    });
    describe("new extensions", function () {
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
        it("check priceEUR", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceEUR\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceEUR != null && Number(result.priceEUR) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceUSD", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceUSD\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceUSD != null && Number(result.priceUSD) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceJPY", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceJPY\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceJPY != null && Number(result.priceJPY) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceBGN", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceBGN\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceBGN != null && Number(result.priceBGN) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceCZK", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceCZK\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceCZK != null && Number(result.priceCZK) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceDKK", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceDKK\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceDKK != null && Number(result.priceDKK) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceGBP", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceGBP\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceGBP != null && Number(result.priceGBP) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceHUF", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceHUF\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceHUF != null && Number(result.priceHUF) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check pricePLN", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            pricePLN\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.pricePLN != null && Number(result.pricePLN) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceRON", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceRON\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceRON != null && Number(result.priceRON) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceSEK", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceSEK\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceSEK != null && Number(result.priceSEK) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceCHF", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceCHF\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceCHF != null && Number(result.priceCHF) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceISK", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceISK\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceISK != null && Number(result.priceISK) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceNOK", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceNOK\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceNOK != null && Number(result.priceNOK) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceHRK", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceHRK\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceHRK != null && Number(result.priceHRK) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceRUB", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceRUB\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceRUB != null && Number(result.priceRUB) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceTRY", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceTRY\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceTRY != null && Number(result.priceTRY) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceAUD", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceAUD\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceAUD != null && Number(result.priceAUD) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceBRL", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceBRL\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceBRL != null && Number(result.priceBRL) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceCAD", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceCAD\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceCAD != null && Number(result.priceCAD) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceCNY", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceCNY\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceCNY != null && Number(result.priceCNY) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceHKD", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceHKD\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceHKD != null && Number(result.priceHKD) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceIDR", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceIDR\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceIDR != null && Number(result.priceIDR) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceILS", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceILS\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceILS != null && Number(result.priceILS) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceINR", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceINR\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceINR != null && Number(result.priceINR) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceKRW", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceKRW\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceKRW != null && Number(result.priceKRW) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceMXN", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceMXN\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceMXN != null && Number(result.priceMXN) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceMYR", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceMYR\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceMYR != null && Number(result.priceMYR) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceNZD", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceNZD\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceNZD != null && Number(result.priceNZD) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check pricePHP", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            pricePHP\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.pricePHP != null && Number(result.pricePHP) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceSGD", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceSGD\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceSGD != null && Number(result.priceSGD) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceTHB", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceTHB\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceTHB != null && Number(result.priceTHB) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
        it("check priceZAR", function () { return __awaiter(void 0, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = {};
                        return [4, axios_1.default
                                .post("http://localhost:8080/graphql/?", {
                                query: "query{\n                        paginatedArticles(skip:0, take:1){\n                          items{\n                            priceZAR\n                          }}\n                        }",
                                variables: null,
                            })
                                .then(function (res) {
                                result = res.data["data"]["paginatedArticles"]["items"][0];
                            })];
                    case 1:
                        _a.sent();
                        (0, chai_1.expect)(result.priceZAR != null && Number(result.priceZAR) > 0).equal(true, "price shouldn't be null or negative");
                        return [2];
                }
            });
        }); });
    });
    describe("old compatibilities", function () { });
});
//# sourceMappingURL=test.js.map