import structuredClone from '@ungap/structured-clone';
import { SATVector } from 'detect-collisions';
import { AsyncEE } from '../util/AsyncEE.js';
import { safeId } from '../util/safeId.js';
import Inventory from '../Inventory.js';
export default class Entity {
    id = String(safeId());
    name = this.constructor.name;
    markAsRemove = false;
    elapsedTick = 0;
    effects = new Map(); // Server state: This is not relate to physic so need to use custom mutate array to detect changes
    vel = new SATVector(0, 0);
    visibility;
    event = new AsyncEE();
    inventory = new Inventory(4);
    isStatic = false; // Skip collision check
    beforeUpdate(world, tickData) {
        this.elapsedTick++;
        this.stats = structuredClone(this._stats);
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
        this.inventory.update(tickData);
    }
    afterUpdate(world, tickData) { }
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
        const { id, scale, angle, pos, vel } = data;
        if (id) {
            this.id = id;
        }
        if (angle) {
            this.body.setAngle(angle);
        }
        if (scale) {
            this.body.setScale(scale);
        }
        if (pos) {
            this.body.setPosition(pos.x, pos.y);
        }
        if (vel) {
            this.vel.x = vel.x;
            this.vel.y = vel.y;
        }
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