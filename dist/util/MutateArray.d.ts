export declare class MutateArray<T> extends Array<T> {
    onAdd: (item: T) => void;
    onRemove: (item: T) => void;
    push(...items: T[]): number;
    remove(item: T): number;
    removeIndex(index: number): number;
}
//# sourceMappingURL=MutateArray.d.ts.map