import { TControllerList } from "./TControllerList";

export abstract class APIController {
    public abstract createConnection(controllers: TControllerList): void;
    public abstract start(): Promise<void>;
}
