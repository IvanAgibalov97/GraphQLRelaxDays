import { APIController } from "../../Common/APIController";
import { TControllerList } from "../../Common/TControllerList";
import { TLanguage } from "./types/TLanguage";
export declare class TranslationController extends APIController {
    private _translaterURL;
    constructor(port: number);
    translate(from: TLanguage, to: TLanguage, text: string): string;
    createConnection(controllers: TControllerList): void;
    start(): Promise<void>;
}
