import { Circle } from 'detect-collisions';
import Mob from './Mob.js';
export default class Wolf extends Mob {
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
    body: Circle;
}
//# sourceMappingURL=Wolf.d.ts.map