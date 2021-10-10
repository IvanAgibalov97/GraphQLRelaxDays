export declare type TLanguage = "en" | "ar" | "zh" | "nl" | "fi" | "fr" | "de" | "hi" | "hu" | "id" | "ga" | "it" | "ja" | "ko" | "pl" | "pt" | "ru" | "es" | "sv" | "tr" | "uk" | "vi";
export declare const languagesList: TLanguage[];
export declare type TTranslateResult = {
    translatedText: string;
};
export declare class TranslationController {
    private _translaterURL;
    constructor(port: number);
    translate(from: TLanguage, to: TLanguage, text: string): string;
}
