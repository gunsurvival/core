export class MutateMap<K, V> extends Map<K, V> {
	onAdd: (value: V, key: K) => void = () => {};
	onRemove: (value: V, key: K) => void = () => {};

	set(key: K, value: V) {
		super.set(key, value);
		this.onAdd(value, key);
		return this;
	}

	delete(key: K) {
		const value = super.get(key);
		if (value) {
			super.delete(key);
			this.onRemove(value, key);
			return true;
		}

		return false;
	}
}
