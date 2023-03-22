import { SATVector } from 'detect-collisions';
import { AsyncEE } from '../util/AsyncEE.js';
import { safeId } from '../util/index.js';
import structuredClone from '@ungap/structured-clone';
export default class Entity {
    id = String(safeId());
    name = this.constructor.name;
    markAsRemove = false;
    elapsedTick = 0;
    effects = new Array(); // Server state: This is not relate to physic so need to use custom mutate array to detect changes
    event = new AsyncEE();
    vel = new SATVector(0, 0);
    beforeUpdate(world, tickData) {
        this.elapsedTick++;
        this._stats = structuredClone(this.stats);
        // Iterate over effects and calculate them
        // if effect is done or marked as remove, remove it
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.effects.length; i++) {
            if (this.effects[i].markAsRemove) {
                this.removeEffect(this.effects[i]);
                continue;
            }
            this.effects[i].calc(this, world, tickData);
        }
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
    addEffect(effect) {
        this.effects.push(effect);
        this.event.emit('+effects', effect).catch(console.error);
    }
    removeEffect(effect) {
        const index = this.effects.indexOf(effect);
        if (index === -1) {
            return;
        }
        this.effects.splice(index, 1);
        this.event.emit('-effects', effect).catch(console.error);
    }
}
//# sourceMappingURL=Entity.js.map