"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpFunctions = void 0;
var HelpFunctions = (function () {
    function HelpFunctions() {
    }
    HelpFunctions.pricesAreSortedASC = function (object) {
        var currentPrice = object[0].price;
        for (var _i = 0, object_1 = object; _i < object_1.length; _i++) {
            var article = object_1[_i];
            if (article.price != undefined &&
                currentPrice != undefined &&
                currentPrice > article.price) {
                return false;
            }
            else {
                currentPrice = article.price;
            }
        }
        return true;
    };
    HelpFunctions.pricesAreSortedDESC = function (object) {
        var currentPrice = object[0].price;
        for (var _i = 0, object_2 = object; _i < object_2.length; _i++) {
            var article = object_2[_i];
            if (article.price != undefined &&
                currentPrice != undefined &&
                currentPrice < article.price) {
                return false;
            }
            else {
                currentPrice = article.price;
            }
        }
        return true;
    };
    HelpFunctions.descriptionsAreSortedASC = function (object) {
        var lastEl = object[0].description;
        for (var _i = 0, object_3 = object; _i < object_3.length; _i++) {
            var el = object_3[_i];
            if (el.description != undefined && lastEl != undefined && el.description < lastEl)
                return false;
            lastEl = el.description;
        }
        return true;
    };
    HelpFunctions.descriptionsAreSortedDESC = function (object) {
        var lastEl = object[0].description;
        for (var _i = 0, object_4 = object; _i < object_4.length; _i++) {
            var el = object_4[_i];
            if (el.description != undefined && lastEl != undefined && el.description > lastEl)
                return false;
            lastEl = el.description;
        }
        return true;
    };
    HelpFunctions.titlesAreSortedASC = function (object) {
        var lastEl = object[0].title;
        for (var _i = 0, object_5 = object; _i < object_5.length; _i++) {
            var el = object_5[_i];
            if (el.title != undefined && lastEl != undefined && el.title < lastEl)
                return false;
            lastEl = el.title;
        }
        return true;
    };
    HelpFunctions.titlesAreSortedDESC = function (object) {
        var lastEl = object[0].title;
        for (var _i = 0, object_6 = object; _i < object_6.length; _i++) {
            var el = object_6[_i];
            if (el.title != undefined && lastEl != undefined && el.title > lastEl)
                return false;
            lastEl = el.title;
        }
        return true;
    };
    HelpFunctions.eanAreSortedASC = function (object) {
        var lastEl = object[0].ean;
        for (var _i = 0, object_7 = object; _i < object_7.length; _i++) {
            var el = object_7[_i];
            if (el.ean < lastEl)
                return false;
            lastEl = el.ean;
        }
        return true;
    };
    HelpFunctions.eanAreSortedDESC = function (object) {
        var lastEl = object[0].ean;
        for (var _i = 0, object_8 = object; _i < object_8.length; _i++) {
            var el = object_8[_i];
            if (el.ean > lastEl)
                return false;
            lastEl = el.ean;
        }
        return true;
    };
    HelpFunctions.lastChangedBySortedASC = function (object) {
        var lastEl = object[0].lastChangedBy;
        for (var _i = 0, object_9 = object; _i < object_9.length; _i++) {
            var el = object_9[_i];
            if (el.lastChangedBy != undefined && lastEl != undefined && el.lastChangedBy < lastEl)
                return false;
            lastEl = el.lastChangedBy;
        }
        return true;
    };
    HelpFunctions.lastChangedBySortedDESC = function (object) {
        var lastEl = object[0].lastChangedBy;
        for (var _i = 0, object_10 = object; _i < object_10.length; _i++) {
            var el = object_10[_i];
            if (el.lastChangedBy != undefined && lastEl != undefined && el.lastChangedBy > lastEl)
                return false;
            lastEl = el.lastChangedBy;
        }
        return true;
    };
    HelpFunctions.createdBySortedASC = function (object) {
        var lastEl = object[0].createdBy;
        for (var _i = 0, object_11 = object; _i < object_11.length; _i++) {
            var el = object_11[_i];
            if (el.createdBy != undefined && lastEl != undefined && el.createdBy < lastEl)
                return false;
            lastEl = el.createdBy;
        }
        return true;
    };
    HelpFunctions.createdBySortedDESC = function (object) {
        var lastEl = object[0].createdBy;
        for (var _i = 0, object_12 = object; _i < object_12.length; _i++) {
            var el = object_12[_i];
            if (el.createdBy != undefined && lastEl != undefined && el.createdBy > lastEl)
                return false;
            lastEl = el.createdBy;
        }
        return true;
    };
    HelpFunctions.lastChangedAtSortedASC = function (object) {
        var lastEl = object[0].lastChangedAt;
        for (var _i = 0, object_13 = object; _i < object_13.length; _i++) {
            var el = object_13[_i];
            if (el.lastChangedAt != undefined && lastEl != undefined && el.lastChangedAt < lastEl)
                return false;
            lastEl = el.lastChangedAt;
        }
        return true;
    };
    HelpFunctions.lastChangedAtSortedDESC = function (object) {
        var lastEl = object[0].lastChangedAt;
        for (var _i = 0, object_14 = object; _i < object_14.length; _i++) {
            var el = object_14[_i];
            if (el.lastChangedAt != undefined && lastEl != undefined && el.lastChangedAt > lastEl)
                return false;
            lastEl = el.lastChangedAt;
        }
        return true;
    };
    HelpFunctions.createdAtSortedASC = function (object) {
        var lastEl = object[0].createdAt;
        for (var _i = 0, object_15 = object; _i < object_15.length; _i++) {
            var el = object_15[_i];
            if (el.createdAt != undefined && lastEl != undefined && el.createdAt < lastEl)
                return false;
            lastEl = el.createdAt;
        }
        return true;
    };
    HelpFunctions.createdAtSortedDESC = function (object) {
        var lastEl = object[0].createdAt;
        for (var _i = 0, object_16 = object; _i < object_16.length; _i++) {
            var el = object_16[_i];
            if (el.createdAt != undefined && lastEl != undefined && el.createdAt > lastEl)
                return false;
            lastEl = el.createdAt;
        }
        return true;
    };
    HelpFunctions.countOfObjetsIsSame = function (callback, articlesToCheck) {
        var count = 0;
        for (var _i = 0, articlesToCheck_1 = articlesToCheck; _i < articlesToCheck_1.length; _i++) {
            var article = articlesToCheck_1[_i];
            if (callback(article))
                count++;
        }
        return count;
    };
    return HelpFunctions;
}());
exports.HelpFunctions = HelpFunctions;
//# sourceMappingURL=HelpFunction.js.map