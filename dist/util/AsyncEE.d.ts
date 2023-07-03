export declare class AsyncEE<Events extends EventsMap> {
    private readonly eventHandlers;
    on<Ev extends EventNames<Events>>(event: Ev, handler: Events[Ev]): void;
    remove<Ev extends EventNames<Events>>(event: Ev, handler: Events[Ev]): void;
    once<Ev extends EventNames<Events>>(event: Ev, handler: Events[Ev]): void;
    emit<Ev extends EventNames<Events>>(event: Ev, ...args: Parameters<Events[Ev]>): Promise<ReturnType<Events[Ev]>[]>;
}
export type DefaultHandler = EventHandler<any[]>;
/**
 * An events map is an interface that maps event names to their value, which
 * represents the type of the `on` listener.
 */
export type EventsMap = Record<string, DefaultHandler>;
/**
 * Returns a union type containing all the keys of an event map.
 */
export type EventNames<Map extends EventsMap> = keyof Map & string;
/** The tuple type representing the handler of an event listener */
export type EventHandler<Params extends any[]> = (...args: Params) => unknown;
//# sourceMappingURL=AsyncEE.d.ts.map