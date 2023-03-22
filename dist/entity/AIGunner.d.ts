import Gunner, { type StatsGunner } from './Gunner.js';
export type StatsAIGunner = Record<string, unknown> & StatsGunner;
export default class AIGunner extends Gunner {
    stats: {
        health: number;
        speed: number;
        radius: number;
    };
    _stats: {
        health: number;
        speed: number;
        radius: number;
    };
}
//# sourceMappingURL=AIGunner.d.ts.map