import { TCurrencyNames } from "./TCurrencyNames";

export type TCurrencyCache = {
    time: string;
    currencies: Record<TCurrencyNames, number>;
};
