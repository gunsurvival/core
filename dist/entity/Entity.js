import { SATVector } from 'detect-collisions';
import { AsyncEE } from '../util/AsyncEE.js';
import { safeId, MutateArray } from '../util/index.js';
import structuredClone from '@ungap/structured-clone';
export default class Entity {
    id = String(safeId());
    name = this.constructor.name;
    markAsRemove = false;
    elapsedTick = 0;
    effects = new MutateArray(); // Server state: This is not relate to physic so need to use custom mutate array to detect changes
    event = new AsyncEE();
    vel = new SATVector(0, 0);
    constructor() {
        this.effects.onAdd = (effect) => {
            this.event.emit('+effects', effect).catch(console.error);
        };
        this.effects.onRemove = (effect) => {
            this.event.emit('-effects', effect).catch(console.error);
        };
    }
    beforeUpdate(world, tickData) {
        this.elapsedTick++;
        this._stats = structuredClone(this.stats);
        // Iterate over effects and calculate them
        // if effect is done or marked as remove, remove it
        for (let i = 0; i < this.effects.length; i++) {
            if (this.effects[i].markAsRemove) {
                this.effects.removeIndex(i--);
                continue;
            }
            this.effects[i].calc(this, world, tickData);
        }
        this.body.pos.add(this.vel.scale(tickData.delta));
    }
    afterUpdate(world, tickData) {
    }
    destroy() {
        this.markAsRemove = true;
    }
    update(world, tickData) { }
    onAdd(world) { } // Call after entity is added to world
    onRemove(world) { } // Call after entity is removed from world
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) { }
    onCollisionExit(other, response) { }
    init(data) {
        const dataFormatted = data;
        this.id = dataFormatted.id;
        this.body.setAngle(dataFormatted.angle);
        this.body.setScale(dataFormatted.scale);
        this.body.setPosition(dataFormatted.pos.x, dataFormatted.pos.y);
        this.body.setOffset(new SATVector(dataFormatted.offset.x, dataFormatted.offset.y));
    }
    assign(initData) {
        Object.assign(this, initData);
    }
}
//# sourceMappingURL=Entity.js.map