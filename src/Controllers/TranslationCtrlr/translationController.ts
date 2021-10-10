import { APIController } from "../../Common/APIController";
import { TControllerList } from "../../Common/TControllerList";
import { TLanguage } from "./types/TLanguage";

export class TranslationController extends APIController {
    private _translaterURL: string = "";
    constructor(port: number) {
        super();
        this._translaterURL = "http://localhost:" + port;
    }
    public translate(from: TLanguage, to: TLanguage, text: string): string {
        /*const res = await fetch("https://libretranslate.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: from,
                target: to,
                format: "text",
            }),
            headers: { "Content-Type": "application/json" },
        });
        let result: TTranslateResult = await res.json();*/
        return from + to + text;
    }
    public override createConnection(controllers: TControllerList): void {}
    public override async start(): Promise<void> {}
}
