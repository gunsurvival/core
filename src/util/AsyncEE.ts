type IHandler = (...args: any[]) => Promise<void> | void;

export class AsyncEE {
	private readonly listeners = new Map<string, IHandler[]>();

	on(event: string, handler: IHandler) {
		let listener = this.listeners.get(event);
		if (!listener) {
			listener = [];
			this.listeners.set(event, listener);
		}

		listener.push(handler);
	}

	remove(event: string, handler: IHandler) {
		const listener = this.listeners.get(event);
		if (!listener) {
			return;
		}

		listener.splice(listener.indexOf(handler), 1);
	}

	once(event: string, handler: IHandler) {
		this.on(event, async (...args) => {
			this.remove(event, handler);
			await handler(...args);
		});
	}

	async emit(event: string, ...args: unknown[]) {
		const listener = this.listeners.get(event);
		if (listener) {
			await Promise.allSettled(listener.map(async handler => handler(...args)));
		}
	}
}
