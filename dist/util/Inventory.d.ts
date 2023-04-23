import { type ITickData } from './types.js';
import type Item from './item/Item.js';
export default class Inventory {
    items: Item[];
    choosing: number[];
    constructor(items?: Item[]);
    get current(): Item[];
    update(tickData: ITickData): void;
    choose(index: number): void;
    chooseMulti(indexes: number[]): void;
    chooseAll(): void;
    chooseNone(): void;
    swap(index1: number, index2: number): void;
    add(item: Item): void;
}
//# sourceMappingURL=Inventory.d.ts.map
