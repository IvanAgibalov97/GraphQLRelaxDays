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
exports.AddArticleUseCase = void 0;
var Languages_1 = require("../../Controllers/TranslationCtrlr/consts/Languages");
var article_1 = require("../../models/article");
var UseCase_1 = require("../../Common/UseCase");
var AddArticleUseCase = (function (_super) {
    __extends(AddArticleUseCase, _super);
    function AddArticleUseCase(translationController) {
        var _this = _super.call(this) || this;
        _this._translationController = translationController;
        return _this;
    }
    AddArticleUseCase.prototype.handle = function (args) {
        var newArticle = {
            ean: args.article.ean,
            description: args.article.description,
            price: args.article.price,
            title: args.article.title,
            variants: [],
            createdBy: args.user,
            createdAt: new Date().toISOString(),
            lastChangedBy: args.user,
            lastChangedAt: new Date().toISOString(),
        };
        this._addTranslationToArticle(newArticle);
        var article = new article_1.ArticleModel(newArticle);
        return article
            .save()
            .then(function (result) {
            return result;
        })
            .catch(function (err) {
            throw err;
        });
    };
    AddArticleUseCase.prototype.warningHandle = function (warningsArray, query) {
        if (query.indexOf("addArticle") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("addArticle should be called with a user");
        }
    };
    AddArticleUseCase.prototype._addTranslationToArticle = function (article) {
        for (var _i = 0, languagesList_1 = Languages_1.languagesList; _i < languagesList_1.length; _i++) {
            var language = languagesList_1[_i];
            article[("description" + language.toUpperCase())] = {
                article: {
                    ean: article.ean,
                },
                content: this._translationController.translate("de", language, article.description == undefined ? "" : article.description),
                createdAt: article.createdAt == undefined ? "" : article.createdAt,
                createdBy: article.createdBy == undefined ? "" : article.createdBy,
                field: "description",
                language: language,
                manuallyTranslated: false,
            };
            article[("title" + language.toUpperCase())] = {
                article: {
                    ean: article.ean,
                },
                content: this._translationController.translate("de", language, article.title == undefined ? "" : article.title),
                createdAt: article.createdAt == undefined ? "" : article.createdAt,
                createdBy: article.createdBy == undefined ? "" : article.createdBy,
                field: "title",
                language: language,
                manuallyTranslated: false,
            };
        }
    };
    return AddArticleUseCase;
}(UseCase_1.UseCase));
exports.AddArticleUseCase = AddArticleUseCase;
//# sourceMappingURL=AddArticleUseCase.js.map