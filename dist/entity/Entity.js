import safeId from '../util/safeId.js';
export default class Entity {
    body;
    id;
    markAsRemove = false;
    tick = 0;
    constructor(body) {
        this.body = body;
        this.id = safeId();
        // This.body = body;
    }
    update(add, remove) {
        this.tick++;
    }
    get plain() {
        return {};
    }
    destroy() {
        this.markAsRemove = true;
    }
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) { }
    onCollisionExit(other, response) { }
}
//# sourceMappingURL=Entity.js.map