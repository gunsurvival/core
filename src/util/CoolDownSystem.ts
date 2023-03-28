import {type ITickData} from '../types.js';

export default class CoolDownSystem {
	private readonly list = new Map<string, number>();

	update(tickData: ITickData) {
		this.list.forEach((value, key) => {
			this.list.set(key, value - tickData.deltaMs);
		});
	}

	isCoolingDown(key = 'default') {
		return this.list.get(key)! > 0;
	}

	isReady(key = 'default') {
		return !this.isCoolingDown(key);
	}

	add(key: string, time: number) {
		this.list.set(key, time);
	}

	remove(key: string) {
		this.list.delete(key);
	}

	clear() {
		this.list.clear();
	}
}
