import { type ITickData } from './types.js';
import type Item from './item/Item.js';
import { AsyncEE } from './util/AsyncEE.js';
export default class Inventory {
    choosing: number[];
    event: AsyncEE;
    items: Array<Item | undefined>;
    constructor(slots: number);
    get current(): (Item | undefined)[];
    update(tickData: ITickData): void;
    choose(index: number): Promise<void>;
    chooseMulti(indexes: number[]): Promise<void>;
    chooseAll(): Promise<void>;
    chooseNone(): void;
    swap(index1: number, index2: number): Promise<void>;
    addItem(item: Item): Promise<void>;
    removeItem(item: Item): Promise<void>;
}
//# sourceMappingURL=Inventory.d.ts.map