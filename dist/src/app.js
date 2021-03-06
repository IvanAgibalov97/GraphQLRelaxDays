"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.GraphQLAPI = void 0;
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var graphql_1 = require("graphql");
var graphql_import_1 = require("graphql-import");
var AddArticleUseCase_1 = require("./UseCases/addArticle/AddArticleUseCase");
var AddTranslationUseCase_1 = require("./UseCases/addTranslation/AddTranslationUseCase");
var DeleteVariantByIdUseCase_1 = require("./UseCases/deleteVariantById/DeleteVariantByIdUseCase");
var DeleteVariantUseCase_1 = require("./UseCases/deleteVariant/DeleteVariantUseCase");
var changeArticleUseCase_1 = require("./UseCases/changeArticle/changeArticleUseCase");
var AddVariantUseCase_1 = require("./UseCases/addVariant/AddVariantUseCase");
var ArticlesUseCase_1 = require("./UseCases/articles/ArticlesUseCase");
var PaginatedArticlesUseCase_1 = require("./UseCases/paginatedArticles/PaginatedArticlesUseCase");
var APIController_1 = require("./Common/APIController");
var GraphQLAPI = (function (_super) {
    __extends(GraphQLAPI, _super);
    function GraphQLAPI(port) {
        var _this = _super.call(this) || this;
        _this._translationController = {};
        _this._databankController = {};
        _this._server = {};
        _this._useCaseList = {};
        _this._app = (0, express_1.default)();
        _this._port = port;
        return _this;
    }
    GraphQLAPI.prototype.createConnection = function (controllers) {
        this._translationController = controllers.translationController;
        this._databankController = controllers.databankController;
        this._useCaseList = {
            addArticle: new AddArticleUseCase_1.AddArticleUseCase(this._translationController),
            addTranslation: new AddTranslationUseCase_1.AddTranslationUseCase(),
            deleteVariantById: new DeleteVariantByIdUseCase_1.DeleteVariantByIdUseCase(),
            deleteVariant: new DeleteVariantUseCase_1.DeleteVariantUseCase(),
            changeArticle: new changeArticleUseCase_1.ChangeArticleUseCase(),
            addVariant: new AddVariantUseCase_1.AddVariantUseCase(),
            articles: new ArticlesUseCase_1.ArticlesUseCase(this._databankController),
            paginatedArticles: new PaginatedArticlesUseCase_1.PaginatedArticlesUseCase(this._databankController),
        };
    };
    GraphQLAPI.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._initializeControllers();
                this._server = this._app.listen(this._port);
                console.log("Server is listening on port " + this._port);
                return [2];
            });
        });
    };
    GraphQLAPI.prototype.close = function () {
        this._server.close();
    };
    GraphQLAPI.prototype._initializeControllers = function () {
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.urlencoded({ extended: true }));
        this._defineGraphQL();
    };
    GraphQLAPI.prototype._defineGraphQL = function () {
        var _this = this;
        var THIS = this;
        this._app.use("/graphql", (0, express_graphql_1.graphqlHTTP)(function (request, response) {
            return {
                schema: (0, graphql_1.buildSchema)((0, graphql_import_1.importSchema)("GraphQL/schema.gql")),
                graphiql: true,
                extensions: function (_a) {
                    var document = _a.document, variables = _a.variables, operationName = _a.operationName, result = _a.result, context = _a.context;
                    var query = context.body.query;
                    var warnings = [];
                    for (var key in THIS._useCaseList)
                        THIS._useCaseList[key].warningHandle(warnings, query);
                    if (warnings.length != 0)
                        result["warning"] = warnings.join("\n");
                    return {};
                },
                customFormatErrorFn: function (err) {
                    return err;
                },
                rootValue: {
                    articles: function (args) {
                        return _this._useCaseList.articles.handle(args);
                    },
                    addArticle: function (args) {
                        return _this._useCaseList.addArticle.handle(args);
                    },
                    addVariant: function (args) {
                        return _this._useCaseList.addVariant.handle(args);
                    },
                    paginatedArticles: function (args) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this._useCaseList.paginatedArticles.handle(args)];
                                case 1: return [2, _a.sent()];
                            }
                        });
                    }); },
                    changeArticle: function (args) {
                        return _this._useCaseList.changeArticle.handle(args);
                    },
                    deleteVariant: function (args) {
                        return _this._useCaseList.deleteVariant.handle(args);
                    },
                    addTranslation: function (args) {
                        return _this._useCaseList.addTranslation.handle(args);
                    },
                    deleteVariantById: function (args) {
                        return _this._useCaseList.deleteVariantById.handle(args);
                    },
                },
            };
        }));
    };
    return GraphQLAPI;
}(APIController_1.APIController));
exports.GraphQLAPI = GraphQLAPI;
//# sourceMappingURL=app.js.map