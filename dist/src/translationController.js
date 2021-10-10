"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationController = exports.languagesList = void 0;
exports.languagesList = [
    "en",
    "ar",
    "zh",
    "nl",
    "fi",
    "fr",
    "de",
    "hi",
    "hu",
    "id",
    "ga",
    "it",
    "ja",
    "ko",
    "pl",
    "pt",
    "ru",
    "es",
    "sv",
    "tr",
    "uk",
    "vi",
];
var TranslationController = (function () {
    function TranslationController(port) {
        this._translaterURL = "";
        this._translaterURL = "http://localhost:" + port;
    }
    TranslationController.prototype.translate = function (from, to, text) {
        return from + to + text;
    };
    return TranslationController;
}());
exports.TranslationController = TranslationController;
//# sourceMappingURL=translationController.js.map