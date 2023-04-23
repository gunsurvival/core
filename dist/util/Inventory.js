export default class Inventory {
    items;
    choosing = [];
    constructor(items = []) {
        this.items = items;
    }
    get current() {
        return this.choosing.map(index => this.items[index]);
    }
    update(tickData) {
        this.current.forEach(item => {
            item.update(tickData);
        });
    }
    choose(index) {
        this.chooseNone();
        this.choosing.push(index);
    }
    chooseMulti(indexes) {
        this.chooseNone();
        this.choosing.push(...indexes);
    }
    chooseAll() {
        this.chooseNone();
        for (let i = 0; i < this.items.length; i++) {
            this.choosing.push(i);
        }
    }
    chooseNone() {
        this.choosing.splice(0, this.choosing.length);
    }
    swap(index1, index2) {
        const temp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = temp;
    }
    add(item) {
        this.items.push(item);
        if (this.choosing.length === 0) {
            this.choose(0);
        }
    }
}
//# sourceMappingURL=Inventory.js.map