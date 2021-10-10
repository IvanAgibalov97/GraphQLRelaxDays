import { TArticle } from "../../src/types/TArticle";

export class HelpFunctions {
    public static pricesAreSortedASC(object: Array<{ price?: number }>): boolean {
        let currentPrice: number | undefined = object[0].price;
        for (const article of object) {
            if (
                article.price != undefined &&
                currentPrice != undefined &&
                currentPrice > article.price
            ) {
                return false;
            } else {
                currentPrice = article.price;
            }
        }

        return true;
    }
    public static pricesAreSortedDESC(object: Array<{ price?: number }>): boolean {
        let currentPrice: number | undefined = object[0].price;
        for (const article of object) {
            if (
                article.price != undefined &&
                currentPrice != undefined &&
                currentPrice < article.price
            ) {
                return false;
            } else {
                currentPrice = article.price;
            }
        }

        return true;
    }
    public static descriptionsAreSortedASC(object: Array<{ description?: string }>): boolean {
        let lastEl = object[0].description;
        for (let el of object) {
            if (el.description != undefined && lastEl != undefined && el.description < lastEl)
                return false;
            lastEl = el.description;
        }
        return true;
    }

    public static descriptionsAreSortedDESC(object: Array<{ description?: string }>): boolean {
        let lastEl = object[0].description;
        for (let el of object) {
            if (el.description != undefined && lastEl != undefined && el.description > lastEl)
                return false;
            lastEl = el.description;
        }
        return true;
    }
    public static titlesAreSortedASC(object: Array<{ title?: string }>): boolean {
        let lastEl = object[0].title;
        for (let el of object) {
            if (el.title != undefined && lastEl != undefined && el.title < lastEl) return false;
            lastEl = el.title;
        }
        return true;
    }
    public static titlesAreSortedDESC(object: Array<{ title?: string }>): boolean {
        let lastEl = object[0].title;
        for (let el of object) {
            if (el.title != undefined && lastEl != undefined && el.title > lastEl) return false;
            lastEl = el.title;
        }
        return true;
    }
    public static eanAreSortedASC(object: Array<{ ean: string }>): boolean {
        let lastEl = object[0].ean;
        for (let el of object) {
            if (el.ean < lastEl) return false;
            lastEl = el.ean;
        }
        return true;
    }
    public static eanAreSortedDESC(object: Array<{ ean: string }>): boolean {
        let lastEl = object[0].ean;
        for (let el of object) {
            if (el.ean > lastEl) return false;
            lastEl = el.ean;
        }
        return true;
    }

    public static lastChangedBySortedASC(object: Array<{ lastChangedBy?: string }>): boolean {
        let lastEl = object[0].lastChangedBy;
        for (let el of object) {
            if (el.lastChangedBy != undefined && lastEl != undefined && el.lastChangedBy < lastEl)
                return false;
            lastEl = el.lastChangedBy;
        }
        return true;
    }
    public static lastChangedBySortedDESC(object: Array<{ lastChangedBy?: string }>): boolean {
        let lastEl = object[0].lastChangedBy;
        for (let el of object) {
            if (el.lastChangedBy != undefined && lastEl != undefined && el.lastChangedBy > lastEl)
                return false;
            lastEl = el.lastChangedBy;
        }
        return true;
    }
    public static createdBySortedASC(object: Array<{ createdBy?: string }>): boolean {
        let lastEl = object[0].createdBy;
        for (let el of object) {
            if (el.createdBy != undefined && lastEl != undefined && el.createdBy < lastEl)
                return false;
            lastEl = el.createdBy;
        }
        return true;
    }
    public static createdBySortedDESC(object: Array<{ createdBy?: string }>): boolean {
        let lastEl = object[0].createdBy;
        for (let el of object) {
            if (el.createdBy != undefined && lastEl != undefined && el.createdBy > lastEl)
                return false;
            lastEl = el.createdBy;
        }
        return true;
    }
    public static lastChangedAtSortedASC(object: Array<{ lastChangedAt?: string }>): boolean {
        let lastEl = object[0].lastChangedAt;
        for (let el of object) {
            if (el.lastChangedAt != undefined && lastEl != undefined && el.lastChangedAt < lastEl)
                return false;
            lastEl = el.lastChangedAt;
        }
        return true;
    }
    public static lastChangedAtSortedDESC(object: Array<{ lastChangedAt?: string }>): boolean {
        let lastEl = object[0].lastChangedAt;
        for (let el of object) {
            if (el.lastChangedAt != undefined && lastEl != undefined && el.lastChangedAt > lastEl)
                return false;
            lastEl = el.lastChangedAt;
        }
        return true;
    }
    public static createdAtSortedASC(object: Array<{ createdAt?: string }>): boolean {
        let lastEl = object[0].createdAt;
        for (let el of object) {
            if (el.createdAt != undefined && lastEl != undefined && el.createdAt < lastEl)
                return false;
            lastEl = el.createdAt;
        }
        return true;
    }
    public static createdAtSortedDESC(object: Array<{ createdAt?: string }>): boolean {
        let lastEl = object[0].createdAt;
        for (let el of object) {
            if (el.createdAt != undefined && lastEl != undefined && el.createdAt > lastEl)
                return false;
            lastEl = el.createdAt;
        }
        return true;
    }

    public static countOfObjetsIsSame(
        callback: (article: TArticle) => boolean,
        articlesToCheck: TArticle[]
    ): number {
        let count: number = 0;
        for (const article of articlesToCheck) {
            if (callback(article)) count++;
        }
        return count;
    }
}
