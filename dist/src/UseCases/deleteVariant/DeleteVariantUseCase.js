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
exports.DeleteVariantUseCase = void 0;
var article_1 = require("../../models/article");
var UseCase_1 = require("../../Common/UseCase");
var DeleteVariantUseCase = (function (_super) {
    __extends(DeleteVariantUseCase, _super);
    function DeleteVariantUseCase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteVariantUseCase.prototype.handle = function (args) {
        return article_1.ArticleModel.findOneAndUpdate({
            ean: args.variant.parent.ean,
            variants: {
                $elemMatch: { characteristic: args.variant.characteristic },
            },
        }, {
            $pull: {
                variants: {
                    characteristic: args.variant.characteristic,
                },
            },
            $set: {
                lastChangedBy: args.user,
                lastChangedAt: new Date(),
            },
        }, { new: true }).then(function (res) {
            if (res == null) {
                throw new Error("no article with given ean and characteristic");
            }
            return res;
        });
    };
    DeleteVariantUseCase.prototype.warningHandle = function (warningsArray, query) {
        if (query.indexOf("deleteVariant") != -1 && query.indexOf("user") == -1) {
            warningsArray.push("deleteVariant should be called with a user.");
        }
    };
    return DeleteVariantUseCase;
}(UseCase_1.UseCase));
exports.DeleteVariantUseCase = DeleteVariantUseCase;
//# sourceMappingURL=DeleteVariantUseCase.js.map