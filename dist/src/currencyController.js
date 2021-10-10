"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.CurrencyController = exports.definedCurrencies = void 0;
var https = __importStar(require("https"));
var fast_xml_parser_1 = __importDefault(require("fast-xml-parser"));
var node_cache_1 = __importDefault(require("node-cache"));
exports.definedCurrencies = [
    "USD",
    "JPY",
    "BGN",
    "CZK",
    "DKK",
    "GBP",
    "HUF",
    "PLN",
    "RON",
    "SEK",
    "CHF",
    "ISK",
    "NOK",
    "HRK",
    "RUB",
    "TRY",
    "AUD",
    "BRL",
    "CAD",
    "CNY",
    "HKD",
    "IDR",
    "ILS",
    "INR",
    "KRW",
    "MXN",
    "MYR",
    "NZD",
    "PHP",
    "SGD",
    "THB",
    "ZAR",
    "EUR",
];
var CurrencyController = (function () {
    function CurrencyController() {
        this._currencies = {
            time: "",
            currencies: {
                EUR: 1,
                AUD: -1,
                BGN: -1,
                BRL: -1,
                CAD: -1,
                CHF: -1,
                CNY: -1,
                CZK: -1,
                DKK: -1,
                GBP: -1,
                HKD: -1,
                HRK: -1,
                HUF: -1,
                IDR: -1,
                ILS: -1,
                INR: -1,
                ISK: -1,
                JPY: -1,
                KRW: -1,
                MXN: -1,
                MYR: -1,
                NOK: -1,
                NZD: -1,
                PHP: -1,
                PLN: -1,
                RON: -1,
                RUB: -1,
                SEK: -1,
                SGD: -1,
                THB: -1,
                TRY: -1,
                USD: -1,
                ZAR: -1,
            },
        };
    }
    CurrencyController.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cache;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._readDataFromCache()];
                    case 1:
                        cache = _a.sent();
                        if (!(cache == undefined)) return [3, 3];
                        return [4, this._readFromServer()];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        this._currencies = cache;
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    CurrencyController.prototype._readFromServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2, new Promise(function (resolve, rej) {
                        https.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml", function (res) {
                            res.on("data", function (chunk) {
                                var xmlString = chunk.toString();
                                var jsonObject = fast_xml_parser_1.default.parse(xmlString, {
                                    ignoreAttributes: false,
                                })["gesmes:Envelope"]["Cube"]["Cube"];
                                _this._currencies.time = jsonObject["@_time"];
                                for (var _i = 0, _a = jsonObject.Cube; _i < _a.length; _i++) {
                                    var cur = _a[_i];
                                    _this._currencies.currencies[cur["@_currency"]] = Number(cur["@_rate"]);
                                }
                                _this._saveDataInCache();
                                resolve();
                            });
                        });
                    })];
            });
        });
    };
    CurrencyController.prototype._readDataFromCache = function () {
        var result = new node_cache_1.default().get("currency");
        if (result == undefined) {
            return undefined;
        }
        if (Date.parse(result.time) - new Date().getTime() > 86400000) {
            return undefined;
        }
        return result;
    };
    CurrencyController.prototype._saveDataInCache = function () {
        var b = new node_cache_1.default();
        var a = b.set("currency", this._currencies);
        return true;
    };
    CurrencyController.prototype.getRateOfCurrency = function (currency) {
        return this._currencies.currencies[currency];
    };
    CurrencyController.prototype.getPrices = function (price) {
        return {
            EUR: price,
            AUD: price * this._currencies.currencies.AUD,
            BGN: price * this._currencies.currencies.BGN,
            BRL: price * this._currencies.currencies.BRL,
            CAD: price * this._currencies.currencies.CAD,
            CHF: price * this._currencies.currencies.CHF,
            CNY: price * this._currencies.currencies.CNY,
            CZK: price * this._currencies.currencies.CZK,
            DKK: price * this._currencies.currencies.DKK,
            GBP: price * this._currencies.currencies.GBP,
            HKD: price * this._currencies.currencies.HKD,
            HRK: price * this._currencies.currencies.HRK,
            HUF: price * this._currencies.currencies.HUF,
            IDR: price * this._currencies.currencies.IDR,
            ILS: price * this._currencies.currencies.ILS,
            INR: price * this._currencies.currencies.INR,
            ISK: price * this._currencies.currencies.ISK,
            JPY: price * this._currencies.currencies.JPY,
            KRW: price * this._currencies.currencies.KRW,
            MXN: price * this._currencies.currencies.MXN,
            MYR: price * this._currencies.currencies.MYR,
            NOK: price * this._currencies.currencies.NOK,
            NZD: price * this._currencies.currencies.NZD,
            PHP: price * this._currencies.currencies.PHP,
            PLN: price * this._currencies.currencies.PLN,
            RON: price * this._currencies.currencies.RON,
            RUB: price * this._currencies.currencies.RUB,
            SEK: price * this._currencies.currencies.SEK,
            SGD: price * this._currencies.currencies.SGD,
            THB: price * this._currencies.currencies.THB,
            TRY: price * this._currencies.currencies.TRY,
            USD: price * this._currencies.currencies.USD,
            ZAR: price * this._currencies.currencies.ZAR,
        };
    };
    return CurrencyController;
}());
exports.CurrencyController = CurrencyController;
//# sourceMappingURL=currencyController.js.map