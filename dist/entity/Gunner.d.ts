import { Circle } from 'detect-collisions';
import Entity from './Entity.js';
export type StatsGunner = {
    health: number;
    speed: number;
    radius: number;
};
export default class Gunner extends Entity {
    stats: StatsGunner;
    body: Circle;
}
//# sourceMappingURL=Gunner.d.ts.map