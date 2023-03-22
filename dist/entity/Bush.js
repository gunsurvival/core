import { Circle, SATVector } from 'detect-collisions';
import { getStats } from '../stats.js';
import Entity from './Entity.js';
export default class Bush extends Entity {
    stats = getStats('Bush');
    _stats = getStats('Bush');
    body;
    constructor(pos = new SATVector(0, 0)) {
        super();
        this.body = new Circle(pos, this.stats.radius);
    }
}
//# sourceMappingURL=Bush.js.map