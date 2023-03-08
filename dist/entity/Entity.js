import SAT from 'sat';
import { EventEmitter } from 'eventemitter3';
import { safeId, MutateArray } from '../util/index.js';
import getStats from '../stats.js';
export default class Entity {
    id = String(safeId());
    name = this.constructor.name;
    markAsRemove = false;
    elapsedTick = 0;
    effects = new MutateArray(); // This is not relate to physic so need to use custom array to detect changes (MutateArray)
    event = new EventEmitter();
    constructor() {
        this.effects.onAdd = (effect) => {
            this.event.emit('+effects', effect);
        };
        this.effects.onRemove = (effect) => {
            this.event.emit('-effects', effect);
        };
    }
    beforeUpdate(world, tickData) {
        this.elapsedTick++;
        this.stats = getStats(this.constructor.name);
        // Iterate over effects and calculate them
        // if effect is done or marked as remove, remove it
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
    onAdd(world) { } // Call after entity is added to world
    onRemove(world) { } // Call after entity is removed from world
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) { }
    onCollisionExit(other, response) { }
    init(data) {
        const data_formated = data;
        this.id = data_formated.id;
        this.body.setAngle(data_formated.angle);
        this.body.setScale(data_formated.scale);
        this.body.setPosition(data_formated.pos.x, data_formated.pos.y);
        this.body.setOffset(new SAT.Vector(data_formated.offset.x, data_formated.offset.y));
    }
}
//# sourceMappingURL=Entity.js.map