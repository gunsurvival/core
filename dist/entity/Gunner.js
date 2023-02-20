import { Circle } from 'detect-collisions';
import getStats from '../stats.js';
import Entity from './Entity.js';
export default class Gunner extends Entity {
    stats = getStats('Gunner');
    body = new Circle({ x: 1, y: 1 }, 80, {});
}
//# sourceMappingURL=Gunner.js.map