import Gunner, { type StatsGunner } from './Gunner.js';
export type StatsAIGunner = Record<string, unknown> & StatsGunner;
export default class AIGunner extends Gunner {
    stats: StatsAIGunner;
}
//# sourceMappingURL=AIGunner.d.ts.map