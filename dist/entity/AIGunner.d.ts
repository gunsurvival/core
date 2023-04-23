import Gunner, { type StatsGunner } from './Gunner.js';
export type StatsAIGunner = Record<string, unknown> & StatsGunner;
export default class AIGunner extends Gunner {
    stats: {
        speed: number;
        health: number;
        radius: number;
    };
    _stats: {
        speed: number;
        health: number;
        radius: number;
    };
}
//# sourceMappingURL=AIGunner.d.ts.map