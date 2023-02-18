import { Circle } from 'detect-collisions';
import getStats from '../stats.js';
import Entity from './Entity.js';
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
//# sourceMappingURL=Gunner.js.map