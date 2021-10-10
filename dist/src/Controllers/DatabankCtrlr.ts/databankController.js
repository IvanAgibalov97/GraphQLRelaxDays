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
exports.DatabankController = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var APIController_1 = require("../../Common/APIController");
var SortingEnumType_1 = require("../../enums/SortingEnumType");
var DatabankController = (function (_super) {
    __extends(DatabankController, _super);
    function DatabankController(args) {
        var _this = _super.call(this) || this;
        _this._currencyController = {};
        _this._args = args;
        return _this;
    }
    DatabankController.prototype.createConnection = function (controllers) {
        this._currencyController = controllers.currencyController;
    };
    DatabankController.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (res, rej) {
                        mongoose_1.default
                            .connect(String(_this._args.mongoUrl) + ("/" + _this._args.dbName + "?retryWrites=true"))
                            .then(function () {
                            res();
                        })
                            .catch(function (err) {
                            console.log(err);
                            rej();
                        });
                    })];
            });
        });
    };
    DatabankController.prototype.createMongoDBRequest = function (where, addAlone) {
        if (addAlone === void 0) { addAlone = false; }
        var result = {};
        if (addAlone)
            result = [];
        if (where != undefined) {
            if (where.complete && where.complete.eq) {
                result["$and"] = [
                    { description: { $exists: true } },
                    { title: { $exists: true } },
                    { price: { $exists: true } },
                ];
            }
            if (where.and != undefined) {
                if (result["$and"] == undefined) {
                    result["$and"] = [];
                }
                for (var _i = 0, _a = where.and; _i < _a.length; _i++) {
                    var andConcl = _a[_i];
                    result["$and"] = this.createMongoDBRequest(andConcl, true);
                }
            }
            if (where.or != undefined) {
                result["$or"] = [];
                for (var _b = 0, _c = where.or; _b < _c.length; _b++) {
                    var orConcl = _c[_b];
                    result["$or"] = this.createMongoDBRequest(orConcl, true);
                }
            }
            if (where.ean != undefined) {
                var ean = undefined;
                if (where.ean.eq != undefined) {
                    ean = where.ean.eq;
                }
                else if (where.ean.contains != undefined) {
                    ean = new RegExp(where.ean.contains, "i");
                }
                if (ean != undefined)
                    if (addAlone) {
                        result.push({ ean: ean });
                    }
                    else {
                        result["ean"] = ean;
                    }
            }
            if (where.description != undefined) {
                var descr = undefined;
                if (where.description.eq != undefined) {
                    descr = where.description.eq;
                }
                else if (where.description.contains != undefined) {
                    descr = new RegExp(where.description.contains, "i");
                }
                if (descr != undefined)
                    if (addAlone) {
                        result.push({ description: descr });
                    }
                    else {
                        result["description"] = descr;
                    }
            }
            if (where.title != undefined) {
                var title = undefined;
                if (where.title.eq != undefined) {
                    title = where.title.eq;
                }
                else if (where.title.contains != undefined) {
                    title = new RegExp(where.title.contains, "i");
                }
                if (title != undefined)
                    if (addAlone) {
                        result.push({ title: title });
                    }
                    else {
                        result["title"] = title;
                    }
            }
            if (where.lastChangedBy != undefined) {
                var lastChangedBy = undefined;
                if (where.lastChangedBy.eq != undefined) {
                    lastChangedBy = where.lastChangedBy.eq;
                }
                else if (where.lastChangedBy.contains != undefined) {
                    lastChangedBy = new RegExp(where.lastChangedBy.contains, "i");
                }
                if (lastChangedBy != undefined)
                    if (addAlone) {
                        result.push({ lastChangedBy: lastChangedBy });
                    }
                    else {
                        result["lastChangedBy"] = lastChangedBy;
                    }
            }
            if (where.createdBy != undefined) {
                var createdBy = undefined;
                if (where.createdBy.eq != undefined) {
                    createdBy = where.createdBy.eq;
                }
                else if (where.createdBy.contains != undefined) {
                    createdBy = new RegExp(where.createdBy.contains, "i");
                }
                if (createdBy != undefined)
                    if (addAlone) {
                        result.push({ createdBy: createdBy });
                    }
                    else {
                        result["createdBy"] = createdBy;
                    }
            }
            if (where.price != undefined) {
                var price = {};
                if (where.price.eq != undefined) {
                    price = { $eq: where.price.eq };
                }
                else {
                    if (where.price.gte != undefined) {
                        price["$gte"] = where.price.gte;
                    }
                    if (where.price.lte != undefined) {
                        price["$lte"] = where.price.lte;
                    }
                }
                if (JSON.stringify(price) != "{}") {
                    if (addAlone) {
                        result.push({ price: price });
                    }
                    else {
                        result["price"] = price;
                    }
                }
            }
        }
        return result;
    };
    DatabankController.prototype.sortResult = function (order) {
        var result = {};
        if (order != undefined) {
            for (var key in order)
                result[key] =
                    order[key] == SortingEnumType_1.SortingEnumType.DESC ? -1 : 1;
        }
        return result;
    };
    DatabankController.prototype.getCorrectedArticle = function (article) {
        var prices = this._currencyController.getPrices(article.price == undefined ? 0 : article.price);
        article.priceEUR = prices.EUR;
        article.priceAUD = prices.AUD;
        article.priceBGN = prices.BGN;
        article.priceBRL = prices.BRL;
        article.priceCAD = prices.CAD;
        article.priceCHF = prices.CHF;
        article.priceCNY = prices.CNY;
        article.priceCZK = prices.CZK;
        article.priceDKK = prices.DKK;
        article.priceGBP = prices.GBP;
        article.priceHKD = prices.HKD;
        article.priceHRK = prices.HRK;
        article.priceHUF = prices.HUF;
        article.priceIDR = prices.IDR;
        article.priceILS = prices.ILS;
        article.priceINR = prices.INR;
        article.priceISK = prices.ISK;
        article.priceJPY = prices.JPY;
        article.priceKRW = prices.KRW;
        article.priceMXN = prices.MXN;
        article.priceMYR = prices.MYR;
        article.priceNOK = prices.NOK;
        article.priceNZD = prices.NZD;
        article.pricePHP = prices.PHP;
        article.pricePLN = prices.PLN;
        article.priceRON = prices.RON;
        article.priceRUB = prices.RUB;
        article.priceSEK = prices.SEK;
        article.priceSGD = prices.SGD;
        article.priceTHB = prices.THB;
        article.priceTRY = prices.TRY;
        article.priceUSD = prices.USD;
        article.priceZAR = prices.ZAR;
        if (article.createdAt == null) {
            article.createdAt = new Date(0).toISOString();
        }
        if (article.lastChangedAt == null) {
            article.lastChangedAt = new Date(0).toISOString();
        }
        if (article.variants != undefined) {
            for (var _i = 0, _a = article.variants; _i < _a.length; _i++) {
                var variant = _a[_i];
                if (variant.createdAt == null) {
                    variant.createdAt = new Date(0).toISOString();
                }
                if (variant.lastChangedAt == null) {
                    variant.lastChangedAt = new Date(0).toISOString();
                }
            }
        }
    };
    return DatabankController;
}(APIController_1.APIController));
exports.DatabankController = DatabankController;
//# sourceMappingURL=databankController.js.map