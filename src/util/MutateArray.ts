// Create a custom Array class to handle add/remove events
// do not use Array push/splice directly, use add/remove instead
export class MutateArray<T> extends Array<T> {
	onAdd: (item: T) => void = () => {};
	onRemove: (item: T) => void = () => {};

	add(...items: T[]) {
		super.push(...items);
		items.forEach(this.onAdd);
		return this.length;
	}

	remove(item: T) {
		const index = this.indexOf(item);
		if (index !== -1) {
			this.splice(index, 1);
			this.onRemove(item);
		}

		return this.length;
	}

	removeIndex(index: number) {
		const item = this[index];
		if (item) {
			this.splice(index, 1);
			this.onRemove(item);
		}

		return this.length;
	}
}
