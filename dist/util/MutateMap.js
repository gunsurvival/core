export class MutateMap extends Map {
    onAdd = () => { };
    onRemove = () => { };
    set(key, value) {
        super.set(key, value);
        this.onAdd(value, key);
        return this;
    }
    delete(key) {
        const value = super.get(key);
        if (value) {
            super.delete(key);
            this.onRemove(value, key);
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=MutateMap.js.map