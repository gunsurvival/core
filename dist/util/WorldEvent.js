import { AsyncEE } from './AsyncEE.js';
/**
 * A mock AsyncEE that stores all events emitted.
 */
export default class WorldEvent extends AsyncEE {
    items = new Array();
    async emitSync(event, ...args) {
        this.items.push({ event, args: JSON.stringify(args) });
        return super.emit(event, ...args);
    }
    addItem(item) {
        this.items.push(item);
        super.emit(item.event, ...JSON.parse(item.args)).catch(console.error);
    }
}
//# sourceMappingURL=WorldEvent.js.map