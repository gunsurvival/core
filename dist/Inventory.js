import { AsyncEE } from './util/AsyncEE.js';
import None from './item/None.js';
export default class Inventory {
    choosing = [];
    event = new AsyncEE();
    items;
    constructor(slots) {
        this.items = new Array(slots).fill(new None());
    }
    get current() {
        return this.choosing.map(index => this.items[index]);
    }
    update(tickData) {
        this.current.forEach(item => {
            item?.update(tickData);
        });
    }
    async choose(index) {
        this.chooseNone();
        this.choosing.push(index);
        await this.event.emit('choose', this.choosing);
    }
    async chooseMulti(indexes) {
        this.chooseNone();
        this.choosing.push(...indexes);
        await this.event.emit('choose', this.choosing);
    }
    async chooseAll() {
        this.chooseNone();
        for (let i = 0; i < this.items.length; i++) {
            this.choosing.push(i);
        }
        await this.event.emit('choose', this.choosing);
    }
    chooseNone() {
        this.choosing.splice(0, this.choosing.length);
    }
    async swap(index1, index2) {
        const temp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = temp;
        await this.event.emit('swap', index1, index2);
    }
    async addItem(item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof None) {
                this.items[i] = item;
                await this.event.emit('add', item, {
                    index: i,
                    isStack: false,
                });
                break;
            }
            else if (this.items[i].canStackWith(item)) {
                this.items[i].amount += item.amount;
                await this.event.emit('add', item, {
                    index: i,
                    isStack: true,
                });
                break;
            }
        }
        if (this.choosing.length === 0) {
            await this.choose(0);
        }
    }
    async removeItem(item) {
        const index = this.items.indexOf(item);
        if (index === -1) {
            throw new Error('Item not found in inventory');
        }
        this.items.splice(index, 1);
        await this.event.emit('remove', item);
        if (this.choosing.includes(index)) {
            this.chooseNone();
        }
        if (this.items.length > 0) {
            await this.choose(0);
        }
    }
}
//# sourceMappingURL=Inventory.js.map