export class Queue {
	private readonly _queue: Array<{
		id: string;
		resolve: (data: any) => void;
		reject: (data: any) => void;
	}> = [];

	constructor(public timeout = 0) {}

	async create(id: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this._queue.push({id, resolve, reject});
			if (this.timeout > 0) {
				// SetTimeout(resolve, this.timeout);
			}
		});
	}

	resolve(id: string, data?: any) {
		const item = this._queue.find(item => item.id === id);
		if (item) {
			item.resolve(data);
			this._queue.splice(this._queue.indexOf(item), 1);
		}
	}
}
