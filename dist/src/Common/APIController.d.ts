import { TControllerList } from "./TControllerList";
export declare abstract class APIController {
    abstract createConnection(controllers: TControllerList): void;
    abstract start(): Promise<void>;
}
