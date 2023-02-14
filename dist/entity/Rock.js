var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { type, Schema } from '@colyseus/schema';
import { Circle } from 'detect-collisions';
import Entity from './Entity.js';
import getStats from '../stats.js';
export class StatsRock extends Schema {
    radius;
}
__decorate([
    type('number')
], StatsRock.prototype, "radius", void 0);
export default class Rock extends Entity {
    stats = getStats('Rock');
    body;
    constructor(pos, bodyOptions = {}) {
        super();
        this.body = new Circle(pos, this.stats.radius, bodyOptions);
    }
    update(world, tickData) { }
    onInit() { }
    onDestroy() { }
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) {
        other.body.setPosition(other.body.pos.x + response.overlapV.x + response.overlapN.x, other.body.pos.y + response.overlapV.y + response.overlapN.y);
    }
    onCollisionExit(other, response) { }
}
__decorate([
    type(StatsRock)
], Rock.prototype, "stats", void 0);
//# sourceMappingURL=Rock.js.map