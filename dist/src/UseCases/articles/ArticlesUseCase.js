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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesUseCase = void 0;
var article_1 = require("../../models/article");
var UseCase_1 = require("../../Common/UseCase");
var ArticlesUseCase = (function (_super) {
    __extends(ArticlesUseCase, _super);
    function ArticlesUseCase(databankController) {
        var _this = _super.call(this) || this;
        _this._databankController = databankController;
        return _this;
    }
    ArticlesUseCase.prototype.handle = function (args) {
        var _this = this;
        return article_1.ArticleModel.find(this._databankController.createMongoDBRequest(args.where))
            .sort(this._databankController.sortResult(args.order))
            .then(function (result) {
            for (var _i = 0, _a = result; _i < _a.length; _i++) {
                var article = _a[_i];
                _this._databankController.getCorrectedArticle(article);
            }
            return result;
        })
            .catch(function (err) {
            throw err;
        });
    };
    ArticlesUseCase.prototype.warningHandle = function (warningsArray, query) {
        if (query.indexOf("articles") != -1) {
            warningsArray.push("articles is deprecated. Switch to paginatedArticles");
        }
        if (query.indexOf("articles") != -1 && query.search(/price[^A-Z]/) != -1) {
            warningsArray.push("The price attribute will be removed. Use priceEUR instead.");
        }
        if (query.indexOf("articles") != -1 && query.search(/description[^A-Z]/) != -1)
            warningsArray.push("The title description will be removed. Use descriptionDE instead.");
        if (query.indexOf("articles") != -1 && query.search(/title[^A-Z]/) != -1)
            warningsArray.push("The title title will be removed. Use titleDE instead.");
    };
    return ArticlesUseCase;
}(UseCase_1.UseCase));
exports.ArticlesUseCase = ArticlesUseCase;
//# sourceMappingURL=ArticlesUseCase.js.map