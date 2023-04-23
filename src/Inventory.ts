import {type ITickData} from './types.js';
import type Item from './item/Item.js';
import {AsyncEE} from './util/AsyncEE.js';

export default class Inventory {
	choosing: number[] = [];
	event = new AsyncEE();
	items: Array<Item | undefined>;

	constructor(slots: number) {
		this.items = new Array<undefined>(slots).fill(undefined);
	}

	get current() {
		return this.choosing.map(index => this.items[index]);
	}

	update(tickData: ITickData) {
		this.current.forEach(item => {
			item?.update(tickData);
		});
	}

	async choose(index: number) {
		this.chooseNone();
		this.choosing.push(index);
		await this.event.emit('choose', this.choosing);
	}

	async chooseMulti(indexes: number[]) {
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

	async swap(index1: number, index2: number) {
		const temp = this.items[index1];
		this.items[index1] = this.items[index2];
		this.items[index2] = temp;
		await this.event.emit('swap', index1, index2);
	}

	async addItem(item: Item) {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i] === undefined) {
				this.items[i] = item;
			} else if (this.items[i]!.canStackWith(item)) {
				this.items[i]!.amount += item.amount;
			}
		}

		await this.event.emit('add', item);

		if (this.choosing.length === 0) {
			await this.choose(0);
		}
	}

	async removeItem(item: Item) {
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