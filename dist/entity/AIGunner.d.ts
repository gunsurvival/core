import { type TickData } from '../types.js';
import type World from '../world/World.js';
import Gunner, { StatsGunner } from './Gunner.js';
export declare class StatsAIGunner extends StatsGunner {
}
export default class AIGunner extends Gunner {
    stats: StatsAIGunner;
    update(world: World, tickData: TickData): void;
}
//# sourceMappingURL=AIGunner.d.ts.map