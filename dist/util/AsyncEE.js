export class AsyncEE {
    listeners = new Map();
    on(event, handler) {
        let listener = this.listeners.get(event);
        if (!listener) {
            listener = [];
            this.listeners.set(event, listener);
        }
        listener.push(handler);
    }
    remove(event, handler) {
        const listener = this.listeners.get(event);
        if (!listener) {
            return;
        }
        listener.splice(listener.indexOf(handler), 1);
    }
    once(event, handler) {
        this.on(event, async (...args) => {
            this.remove(event, handler);
            await handler(...args);
        });
    }
    async emit(event, ...args) {
        const listener = this.listeners.get(event);
        if (listener) {
            await Promise.allSettled(listener.map(async (handler) => handler(...args)));
        }
    }
}
//# sourceMappingURL=AsyncEE.js.map