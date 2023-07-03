import { Circle } from 'detect-collisions';
import Entity from './Entity.js';
export default class Bush extends Entity {
    isStatic: boolean;
    stats: {
        radius: number;
        speed: number;
        health: number;
    };
    _stats: {
        radius: number;
        speed: number;
        health: number;
    };
    body: Circle;
}
//# sourceMappingURL=Bush.d.ts.map