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
exports.AddVariantUseCase = void 0;
var article_1 = require("../../models/article");
var UseCase_1 = require("../../Common/UseCase");
var AddVariantUseCase = (function (_super) {
    __extends(AddVariantUseCase, _super);
    function AddVariantUseCase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddVariantUseCase.prototype.handle = function (args) {
        return article_1.ArticleModel.findOneAndUpdate({ ean: args.variant.parent.ean }, {
            $push: {
                variants: {
                    characteristic: args.variant.characteristic,
                    createdBy: args.user,
                    createdAt: new Date(),
                    lastChangedBy: args.user,
                    lastChangedAt: new Date(),
                },
            },
        }, { new: true }).then(function (res) {
            return res;
        });
    };
    AddVariantUseCase.prototype.warningHandle = function (warningsArray, query) {
        if (query.indexOf("addVariant") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("addVariant should be called with a user.");
        }
    };
    return AddVariantUseCase;
}(UseCase_1.UseCase));
exports.AddVariantUseCase = AddVariantUseCase;
//# sourceMappingURL=AddVariantUseCase.js.map