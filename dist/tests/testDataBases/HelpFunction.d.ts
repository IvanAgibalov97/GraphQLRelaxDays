import { TArticle } from "../../src/types/TArticle";
export declare class HelpFunctions {
    static pricesAreSortedASC(object: Array<{
        price?: number;
    }>): boolean;
    static pricesAreSortedDESC(object: Array<{
        price?: number;
    }>): boolean;
    static descriptionsAreSortedASC(object: Array<{
        description?: string;
    }>): boolean;
    static descriptionsAreSortedDESC(object: Array<{
        description?: string;
    }>): boolean;
    static titlesAreSortedASC(object: Array<{
        title?: string;
    }>): boolean;
    static titlesAreSortedDESC(object: Array<{
        title?: string;
    }>): boolean;
    static eanAreSortedASC(object: Array<{
        ean: string;
    }>): boolean;
    static eanAreSortedDESC(object: Array<{
        ean: string;
    }>): boolean;
    static lastChangedBySortedASC(object: Array<{
        lastChangedBy?: string;
    }>): boolean;
    static lastChangedBySortedDESC(object: Array<{
        lastChangedBy?: string;
    }>): boolean;
    static createdBySortedASC(object: Array<{
        createdBy?: string;
    }>): boolean;
    static createdBySortedDESC(object: Array<{
        createdBy?: string;
    }>): boolean;
    static lastChangedAtSortedASC(object: Array<{
        lastChangedAt?: string;
    }>): boolean;
    static lastChangedAtSortedDESC(object: Array<{
        lastChangedAt?: string;
    }>): boolean;
    static createdAtSortedASC(object: Array<{
        createdAt?: string;
    }>): boolean;
    static createdAtSortedDESC(object: Array<{
        createdAt?: string;
    }>): boolean;
    static countOfObjetsIsSame(callback: (article: TArticle) => boolean, articlesToCheck: TArticle[]): number;
}
