var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { type, Schema } from '@colyseus/schema';
import Effect from '../effect/Effect.js';
import { safeId } from '../util/safeId.js';
import getStats from '../stats.js';
export class VectorSchema extends Schema {
    x;
    y;
}
__decorate([
    type('number')
], VectorSchema.prototype, "x", void 0);
__decorate([
    type('number')
], VectorSchema.prototype, "y", void 0);
export default class Entity extends Schema {
    scale;
    angle;
    effects = [];
    pos = new VectorSchema().assign({ x: 0, y: 0 });
    offset = new VectorSchema().assign({ x: 0, y: 0 });
    id = String(safeId());
    name = this.constructor.name;
    markAsRemove = false;
    elapsedTick = 0;
    baseUpdate(world, tickData) {
        this.elapsedTick++;
        this.stats = getStats(this.constructor.name);
        for (let i = 0; i < this.effects.length; i++) {
            if (this.effects[i].markAsRemove) {
                this.effects.splice(i, 1);
                i--;
                continue;
            }
            this.effects[i].calc(this.stats, world, tickData);
        }
    }
    finalUpdate(world, tickData) {
        this.pos.x = this.body.pos.x;
        this.pos.y = this.body.pos.y;
        this.angle = this.body.angle;
        this.scale = this.body.scale;
        this.offset.x = this.body.offset.x;
        this.offset.y = this.body.offset.y;
    }
    destroy() {
        this.markAsRemove = true;
    }
}
__decorate([
    type('number')
], Entity.prototype, "scale", void 0);
__decorate([
    type('number')
], Entity.prototype, "angle", void 0);
__decorate([
    type([Effect])
], Entity.prototype, "effects", void 0);
__decorate([
    type(VectorSchema)
], Entity.prototype, "pos", void 0);
__decorate([
    type(VectorSchema)
], Entity.prototype, "offset", void 0);
//# sourceMappingURL=Entity.js.map