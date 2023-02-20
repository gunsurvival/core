import { safeId, MutateArray } from '../util/index.js';
import getStats from '../stats.js';
export default class Entity {
    id = String(safeId());
    name = this.constructor.name;
    markAsRemove = false;
    elapsedTick = 0;
    effects = new MutateArray();
    beforeUpdate(world, tickData) {
        this.elapsedTick++;
        this.stats = getStats(this.constructor.name);
        for (let i = 0; i < this.effects.length; i++) {
            if (this.effects[i].markAsRemove) {
                this.effects.removeIndex(i--);
                continue;
            }
            this.effects[i].calc(this.stats, world, tickData);
        }
    }
    afterUpdate(world, tickData) {
    }
    destroy() {
        this.markAsRemove = true;
    }
    update(world, tickData) { }
    onAdd(world) { }
    onDestroy(world) { }
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) { }
    onCollisionExit(other, response) { }
}
//# sourceMappingURL=Entity.js.map