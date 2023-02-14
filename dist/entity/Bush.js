var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { type, Schema } from '@colyseus/schema';
import { Circle } from 'detect-collisions';
import getStats from '../stats.js';
import Entity from './Entity.js';
export class StatsBush extends Schema {
    radius;
}
__decorate([
    type('number')
], StatsBush.prototype, "radius", void 0);
export default class Bush extends Entity {
    stats = getStats('Bush');
    body;
    constructor(pos, bodyOptions = {}) {
        super();
        this.body = new Circle(pos, this.stats.radius, bodyOptions);
    }
    update(world, tickData) { }
    onInit() { }
    onDestroy() { }
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) { }
    onCollisionExit(other, response) { }
}
__decorate([
    type(StatsBush)
], Bush.prototype, "stats", void 0);
//# sourceMappingURL=Bush.js.map