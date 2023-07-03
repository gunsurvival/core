import { AsyncEE } from './../util/AsyncEE.js';
export default class Player {
    entity;
    event = new AsyncEE();
    state = {};
    get isReady() {
        return Boolean(this.entity);
    }
    playAs(entity) {
        this.entity = entity;
        this.event.emit('ready').catch(console.error);
    }
    update(world, tickData) { }
}
//# sourceMappingURL=Player.js.map