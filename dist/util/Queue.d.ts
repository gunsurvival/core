export declare class Queue {
    timeout: number;
    private readonly _queue;
    constructor(timeout?: number);
    create(id: string): Promise<void>;
    resolve(id: string, data?: any): void;
}
//# sourceMappingURL=Queue.d.ts.map