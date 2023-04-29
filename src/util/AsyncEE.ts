export class AsyncEE<Events extends EventsMap> {
	private readonly listeners = new Map<string, DefaultHandler[]>();

	on<Ev extends EventNames<Events>>(event: Ev, handler: Events[Ev]) {
		let listener = this.listeners.get(event);
		if (!listener) {
			listener = [];
			this.listeners.set(event, listener);
		}

		listener.push(handler);
	}

	remove<Ev extends EventNames<Events>>(event: Ev, handler: Events[Ev]) {
		const listener = this.listeners.get(event);
		if (!listener) {
			return;
		}

		listener.splice(listener.indexOf(handler), 1);
		if (listener.length === 0) {
			this.listeners.delete(event);
		}
	}

	once<Ev extends EventNames<Events>>(event: Ev, handler: Events[Ev]) {
		const onceHandler = async (...args: EventParams<Events, Ev>) => {
			await handler(...args);
			this.remove(event, onceHandler as Events[Ev]);
		};

		this.on(event, onceHandler as Events[Ev]);
	}

	async emit<Ev extends EventNames<Events>>(
		event: Ev,
		...args: EventParams<Events, Ev>
	) {
		const listener = this.listeners.get(event);
		if (listener) {
			await Promise.allSettled(listener.map(async handler => handler(...args)));
		}
	}
}

export type DefaultHandler = (...args: any[]) => Promise<void> | void;

/**
 * An events map is an interface that maps event names to their value, which
 * represents the type of the `on` listener.
 */
export type EventsMap = Record<string, DefaultHandler>;

/**
 * Returns a union type containing all the keys of an event map.
 */
export type EventNames<Map extends EventsMap> = keyof Map & string;

/** The tuple type representing the parameters of an event listener */
export type EventParams<
	Map extends EventsMap,
	Ev extends EventNames<Map>,
> = Parameters<Map[Ev]>;
