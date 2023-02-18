export class MutateArray extends Array {
    onAdd = () => { };
    onRemove = () => { };
    push(...items) {
        super.push(...items);
        items.forEach(this.onAdd);
        return this.length;
    }
    remove(item) {
        const index = this.indexOf(item);
        if (index !== -1) {
            this.splice(index, 1);
            this.onRemove(item);
        }
        return this.length;
    }
    removeIndex(index) {
        const item = this[index];
        if (item) {
            this.splice(index, 1);
            this.onRemove(item);
        }
        return this.length;
    }
}
//# sourceMappingURL=MutateArray.js.map