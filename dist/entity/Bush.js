import { Circle } from 'detect-collisions';
import getStats from '../stats.js';
import Entity from './Entity.js';
export default class Bush extends Entity {
    stats = getStats('Bush');
    body;
    constructor(pos, bodyOptions = {}) {
        super();
        this.body = new Circle(pos, this.stats.radius, bodyOptions);
    }
    update(world, tickData) { }
    onInit() { }
    onDestroy() { }
    onCollisionEnter(other, response) { }
    onCollisionStay(other, response) { }
    onCollisionExit(other, response) { }
}
//# sourceMappingURL=Bush.js.map