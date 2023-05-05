import {AsyncEE, type EventsMap, type EventNames, type EventParams} from './AsyncEE.js';

/**
 * A mock AsyncEE that stores all events emitted.
 */
export default class WorldEvent<Events extends EventsMap> extends AsyncEE<Events> {
	items = new Array<{
		event: EventNames<Events>;
		args: EventParams<Events, EventNames<Events>>;
	}>();

	async emit<Ev extends EventNames<Events>>(
		event: Ev,
		...args: EventParams<Events, Ev>
	) {
		this.items.push({event, args});
		return super.emit(event, ...args);
	}
}
