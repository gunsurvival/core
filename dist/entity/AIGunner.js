var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { type } from '@colyseus/schema';
import getStats from '../stats.js';
import Gunner, { StatsGunner } from './Gunner.js';
export class StatsAIGunner extends StatsGunner {
}
export default class AIGunner extends Gunner {
    stats = getStats('AIGunner');
    update(world, tickData) { }
}
__decorate([
    type(StatsAIGunner)
], AIGunner.prototype, "stats", void 0);
//# sourceMappingURL=AIGunner.js.map