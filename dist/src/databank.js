"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Databank = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = require("./app");
var currencyController_1 = require("./currencyController");
var translationController_1 = require("./translationController");
var Databank = (function () {
    function Databank(args) {
        var currencyController = new currencyController_1.CurrencyController();
        var translationController = new translationController_1.TranslationController(5000);
        mongoose_1.default
            .connect(String(args.mongoUrl) + ("/" + args.dbName + "?retryWrites=true"))
            .then(function () {
            currencyController.init();
        })
            .then(function () {
            var app = new app_1.App(Number(args.port), currencyController, translationController);
        })
            .catch(function (err) {
            console.log(err);
        });
    }
    return Databank;
}());
exports.Databank = Databank;
//# sourceMappingURL=databank.js.map