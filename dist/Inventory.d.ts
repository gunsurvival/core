import { type ITickData } from './types.js';
import type Item from './item/Item.js';
import { AsyncEE } from './util/AsyncEE.js';
export default class Inventory {
    choosing: number[];
    event: AsyncEE<InventoryEventMap>;
    items: Item[];
    constructor(slots: number);
    get current(): Item[];
    update(tickData: ITickData): void;
    choose(index: number): Promise<void>;
    chooseMulti(indexes: number[]): Promise<void>;
    chooseAll(): Promise<void>;
    chooseNone(): void;
    swap(index1: number, index2: number): Promise<void>;
    addItem(item: Item): Promise<void>;
    removeItem(item: Item): Promise<void>;
}
export type IEventAddOpts = {
    index: number;
    isStack: boolean;
};
type InventoryEventMap = {
    choose: (indexes: number[]) => void;
    swap: (index1: number, index2: number) => void;
    add: (item: Item, opts: IEventAddOpts) => void;
    remove: (item: Item) => void;
};
export {};
//# sourceMappingURL=Inventory.d.ts.map