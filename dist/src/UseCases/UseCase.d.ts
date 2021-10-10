export declare abstract class UseCase<TInputParam, TOutputParam> {
    abstract handle(args: TInputParam): Promise<TOutputParam> | TOutputParam;
    abstract warningHandle(warningsArray: string[], query: string): void;
}
