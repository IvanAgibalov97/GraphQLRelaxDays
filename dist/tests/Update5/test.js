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
var uncompletedArticles_1 = require("../Update4/uncompletedArticles");
describe("Update 5", function () {
    describe("new extensions", function () { return __awaiter(void 0, void 0, void 0, function () {
        var a;
        return __generator(this, function (_a) {
            a = new createTestDatabase_1.TestDatabase();
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
            it("query: 'articles' title - warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = "";
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                            title\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["warning"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result).not.equal(undefined, "warning should be defined");
                            (0, chai_1.expect)(result.indexOf("title")).not.equal(-1, "warning should contain 'title'");
                            return [2];
                    }
                });
            }); });
            it("query: 'articles' description - warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = "";
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        articles{\n                            description\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["warning"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result).not.equal(undefined, "warning should be defined");
                            (0, chai_1.expect)(result.indexOf("description")).not.equal(-1, "warning should contain 'title'");
                            return [2];
                    }
                });
            }); });
            it("query: 'paginatedArticles' title - warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = "";
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:0){\n\t                        items{\n                                title\n                            }\n                        }\n                      }",
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
            it("query: 'paginatedArticles' description - warning", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = "";
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:0){\n\t                        items{\n                                description\n                            }\n                        }\n                      }",
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
            return [2];
        });
    }); });
    describe("new extensions", function () { return __awaiter(void 0, void 0, void 0, function () {
        var a;
        return __generator(this, function (_a) {
            a = new createTestDatabase_1.TestDatabase();
            before(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, a.createDatabase([])];
                        case 1:
                            _a.sent();
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "mutation{\n                        addArticle(\n                            article:{\n                                title: \"germantTitle\", \n                                description: \"germanDescription\", \n                                price : 1.0, \n                                ean: \"ean\"}){\n                        ean\n                    }\n                    }",
                                    variables: null,
                                })
                                    .then(function (res) { })];
                        case 2:
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
            it("titleDE is available", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                titleDE{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["titleDE"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result).not.equal(null, "titleDE shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("descriptionDE is available", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionDE{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["descriptionDE"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result).not.equal(null, "descriptionDE shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("title returns titleDE.content", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = "";
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                title\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["title"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result).equal("germantTitle", "title should be 'germanTitle'");
                            return [2];
                    }
                });
            }); });
            it("description returns descriptionDE.content", function () { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = "";
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                description\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    result = res.data["data"]["paginatedArticles"]["items"][0]["description"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(result).equal("germanDescription", "description should be 'germanDescription'");
                            return [2];
                    }
                });
            }); });
            it("addTranslation ean exists, language exists");
            it("addTranslation ean doen't exists, language exists");
            it("addTranslation ean exists, language doesn't exist");
            return [2];
        });
    }); });
    describe("old compatibilities", function () {
        it("addTranslation, user not defined - warning");
        it("old 'addArticle' converts title in titleDE as translation");
        it("old 'addArticle' converts description in descriptionDE as translation");
        it("old articles are automatically translated with libretranslate");
    });
    describe("check languages (title + description)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var a;
        return __generator(this, function (_a) {
            a = new createTestDatabase_1.TestDatabase();
            before(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, a.createDatabase([])];
                        case 1:
                            _a.sent();
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "mutation{\n                        addArticle(\n                            article:{\n                                title: \"germantTitle\", \n                                description: \"germanDescription\", \n                                price : 1.0, \n                                ean: \"ean\"}){\n                        ean\n                    }\n                    }",
                                    variables: null,
                                })
                                    .then(function (res) { })];
                        case 2:
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
            it("check English (EN)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionEN{\n                                    language\n                                }\n                                titleEN{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleEN"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionEN"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleEN shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionEN shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Arabic (AR)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionAR{\n                                    language\n                                }\n                                titleAR{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleAR"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionAR"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleAR shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionAR shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Chinese (ZH)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionZH{\n                                    language\n                                }\n                                titleZH{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleZH"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionZH"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleZH shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionZH shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Dutch (NL)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionNL{\n                                    language\n                                }\n                                titleNL{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleNL"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionNL"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleNL shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionNL shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Finnish (FI)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionFI{\n                                    language\n                                }\n                                titleFI{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleFI"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionFI"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleFI shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionFI shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check French (FR)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionFR{\n                                    language\n                                }\n                                titleFR{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleFR"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionFR"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleFR shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionFR shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check German(DE)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionDE{\n                                    language\n                                }\n                                titleDE{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleDE"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionDE"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleDE shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionDE shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Hindi (HI)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionHI{\n                                    language\n                                }\n                                titleHI{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleHI"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionHI"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleHI shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionHI shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Hungarian (HU)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionHU{\n                                    language\n                                }\n                                titleHU{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleHU"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionHU"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleHU shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionHU shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Indonesian (ID)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionID{\n                                    language\n                                }\n                                titleID{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleID"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionID"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleID shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionID shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Irish (GA)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionGA{\n                                    language\n                                }\n                                titleGA{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleGA"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionGA"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleGA shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionGA shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Italian (IT)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionIT{\n                                    language\n                                }\n                                titleIT{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleIT"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionIT"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleIT shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionIT shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Japanese (JA)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionJA{\n                                    language\n                                }\n                                titleJA{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleJA"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionJA"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleJA shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionJA shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Korean (KO)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionKO{\n                                    language\n                                }\n                                titleKO{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleKO"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionKO"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleKO shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionKO shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Polish (PL)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionPL{\n                                    language\n                                }\n                                titlePL{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titlePL"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionPL"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titlePL shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionPL shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Portuguese (PT)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionPT{\n                                    language\n                                }\n                                titlePT{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titlePT"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionPT"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titlePT shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionPT shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Russian (RU)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionRU{\n                                    language\n                                }\n                                titleRU{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleRU"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionRU"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleRU shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionRU shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Spanish (ES)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionES{\n                                    language\n                                }\n                                titleES{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleES"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionES"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleES shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionES shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Swedish (SV)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionSV{\n                                    language\n                                }\n                                titleSV{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleSV"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionSV"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleSV shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionSV shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Turkish (TR)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionTR{\n                                    language\n                                }\n                                titleTR{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleTR"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionTR"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleTR shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionTR shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Ukranian (UK)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionUK{\n                                    language\n                                }\n                                titleUK{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleUK"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionUK"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleUK shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionUK shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            it("check Vietnamese (VI)", function () { return __awaiter(void 0, void 0, void 0, function () {
                var resultTitle, resultDescription;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resultTitle = {};
                            resultDescription = {};
                            return [4, axios_1.default
                                    .post("http://localhost:8080/graphql/?", {
                                    query: "query{\n                        paginatedArticles(skip:0, take:1){\n\t                        items{\n                                descriptionVI{\n                                    language\n                                }\n                                titleVI{\n                                    language\n                                }\n                            }\n                        }\n                      }",
                                    variables: null,
                                })
                                    .then(function (res) {
                                    resultTitle = res.data["data"]["paginatedArticles"]["items"][0]["titleVI"];
                                    resultDescription = res.data["data"]["paginatedArticles"]["items"][0]["descriptionVI"];
                                })];
                        case 1:
                            _a.sent();
                            (0, chai_1.expect)(resultTitle).not.equal(null, "titleVI shouldn't be 'null'");
                            (0, chai_1.expect)(resultDescription).not.equal(null, "descriptionVI shouldn't be 'null'");
                            return [2];
                    }
                });
            }); });
            return [2];
        });
    }); });
});
//# sourceMappingURL=test.js.map