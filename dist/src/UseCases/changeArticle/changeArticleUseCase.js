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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeArticleUseCase = void 0;
var article_1 = require("../../models/article");
var UseCase_1 = require("../../Common/UseCase");
var ChangeArticleUseCase = (function (_super) {
    __extends(ChangeArticleUseCase, _super);
    function ChangeArticleUseCase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeArticleUseCase.prototype.handle = function (args) {
        var updateQuery = __assign({}, args.article);
        updateQuery.lastChangedAt = new Date().toISOString();
        if (args.user != undefined) {
            updateQuery.lastChangedBy = args.user;
        }
        return article_1.ArticleModel.findOneAndUpdate({
            ean: args.article.ean,
        }, { $set: updateQuery }, { new: true }).then(function (res) {
            if (res == null) {
                throw new Error("no article with given ean");
            }
            return res;
        });
    };
    ChangeArticleUseCase.prototype.warningHandle = function (warningsArray, query) {
        if (query.indexOf("changeArticle") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("changeArticle should be called with a user.");
        }
    };
    return ChangeArticleUseCase;
}(UseCase_1.UseCase));
exports.ChangeArticleUseCase = ChangeArticleUseCase;
//# sourceMappingURL=changeArticleUseCase.js.map