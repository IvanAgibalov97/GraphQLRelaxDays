export abstract class UseCase<TInputParam, TOutputParam> {
    public abstract handle(args: TInputParam): Promise<TOutputParam> | TOutputParam;
    public abstract warningHandle(warningsArray: string[], query: string): void;
}
