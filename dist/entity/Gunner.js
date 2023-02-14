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
export class StatsGunner extends Schema {
    health;
    speed;
    radius;
}
__decorate([
    type('number')
], StatsGunner.prototype, "health", void 0);
__decorate([
    type('number')
], StatsGunner.prototype, "speed", void 0);
__decorate([
    type('number')
], StatsGunner.prototype, "radius", void 0);
export default class Gunner extends Entity {
    stats = getStats('Gunner');
    body = new Circle({ x: 1, y: 1 }, 80, {});
    update(world, tickData) { }
    onInit() { }
    onDestroy() { }
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) { }
    onCollisionExit(other, response) { }
}
__decorate([
    type(StatsGunner)
], Gunner.prototype, "stats", void 0);
//# sourceMappingURL=Gunner.js.map