export declare class MutateMap<K, V> extends Map<K, V> {
    onAdd: (value: V, key: K) => void;
    onRemove: (value: V, key: K) => void;
    set(key: K, value: V): this;
    delete(key: K): boolean;
}
//# sourceMappingURL=MutateMap.d.ts.map