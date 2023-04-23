import structuredClone from '@ungap/structured-clone';
import { SATVector } from 'detect-collisions';
import { AsyncEE } from '../util/AsyncEE.js';
import { safeId } from '../util/index.js';
export default class Entity {
    id = String(safeId());
    name = this.constructor.name;
    markAsRemove = false;
    elapsedTick = 0;
    effects = new Map(); // Server state: This is not relate to physic so need to use custom mutate array to detect changes
    event = new AsyncEE();
    vel = new SATVector(0, 0);
    visibility;
    beforeUpdate(world, tickData) {
        this.elapsedTick++;
        this._stats = structuredClone(this.stats);
        // Iterate over effects and calculate them
        // if effect is done or marked as remove, remove it
        this.effects.forEach((effect, id) => {
            if (effect.markAsRemove) {
                this.removeEffect(id);
                return;
            }
            effect.calc(this, world, tickData);
        });
        this.body.pos.x += this.vel.x * tickData.delta;
        this.body.pos.y += this.vel.y * tickData.delta;
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
        this.vel.x = dataFormatted.vel.x;
        this.vel.y = dataFormatted.vel.y;
    }
    assign(initData) {
        Object.assign(this, initData);
    }
    addEffect(id, effect) {
        this.effects.set(id, effect);
        this.event.emit('+effects', effect).catch(console.error);
    }
    removeEffect(id) {
        const effect = this.effects.get(id);
        if (!effect) {
            return;
        }
        this.effects.delete(id);
        this.event.emit('-effects', effect).catch(console.error);
    }
}
//# sourceMappingURL=Entity.js.map