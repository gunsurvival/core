type IHandler = (...args: any[]) => Promise<void> | void;
export declare class AsyncEE {
    private readonly listeners;
    on(event: string, handler: IHandler): void;
    remove(event: string, handler: IHandler): void;
    once(event: string, handler: IHandler): void;
    emit(event: string, ...args: unknown[]): Promise<void>;
}
export {};
//# sourceMappingURL=AsyncEE.d.ts.map