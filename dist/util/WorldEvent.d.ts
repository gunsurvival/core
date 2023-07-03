import { AsyncEE, type EventsMap, type EventNames } from './AsyncEE.js';
/**
 * A mock AsyncEE that stores all events emitted.
 */
export default class WorldEvent<Events extends EventsMap> extends AsyncEE<Events> {
    items: IEvent<Events>[];
    emitSync<Ev extends EventNames<Events>>(event: Ev, ...args: Events[Ev]): Promise<void>;
    addItem(item: {
        event: string;
        args: string;
    }): void;
}
export type IEvent<Events extends EventsMap> = {
    event: EventNames<Events>;
    args: string;
};
//# sourceMappingURL=WorldEvent.d.ts.map