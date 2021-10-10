"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var variantSchema = new Schema({
    characteristic: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: false,
    },
    lastChangedAt: {
        type: String,
        required: false,
    },
    lastChangedBy: {
        type: String,
        required: false,
    },
});
var articleTranslationSchema = new Schema({
    ean: {
        type: String,
        required: true,
    },
});
var translationSchema = new Schema({
    article: {
        type: articleTranslationSchema,
        required: true,
    },
    field: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: false,
    },
    createdBy: {
        type: String,
        required: false,
    },
    manuallyTranslated: {
        type: Boolean,
        required: true,
    },
});
var articleSchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    ean: {
        type: String,
        required: true,
        unique: true,
    },
    createdBy: {
        type: String,
        required: false,
    },
    createdAt: {
        type: String,
        required: false,
    },
    lastChangedAt: {
        type: String,
        required: false,
    },
    lastChangedBy: {
        type: String,
        required: false,
    },
    variants: {
        type: [variantSchema],
        required: true,
    },
    titleEN: translationSchema,
    titleAR: translationSchema,
    titleZH: translationSchema,
    titleNL: translationSchema,
    titleFI: translationSchema,
    titleFR: translationSchema,
    titleDE: translationSchema,
    titleHI: translationSchema,
    titleHU: translationSchema,
    titleID: translationSchema,
    titleGA: translationSchema,
    titleIT: translationSchema,
    titleJA: translationSchema,
    titleKO: translationSchema,
    titlePL: translationSchema,
    titlePT: translationSchema,
    titleRU: translationSchema,
    titleES: translationSchema,
    titleSV: translationSchema,
    titleTR: translationSchema,
    titleUK: translationSchema,
    titleVI: translationSchema,
    descriptionEN: translationSchema,
    descriptionAR: translationSchema,
    descriptionZH: translationSchema,
    descriptionNL: translationSchema,
    descriptionFI: translationSchema,
    descriptionFR: translationSchema,
    descriptionDE: translationSchema,
    descriptionHI: translationSchema,
    descriptionHU: translationSchema,
    descriptionID: translationSchema,
    descriptionGA: translationSchema,
    descriptionIT: translationSchema,
    descriptionJA: translationSchema,
    descriptionKO: translationSchema,
    descriptionPL: translationSchema,
    descriptionPT: translationSchema,
    descriptionRU: translationSchema,
    descriptionES: translationSchema,
    descriptionSV: translationSchema,
    descriptionTR: translationSchema,
    descriptionUK: translationSchema,
    descriptionVI: translationSchema,
});
exports.ArticleModel = mongoose_1.default.model("Articles", articleSchema);
//# sourceMappingURL=article.js.map