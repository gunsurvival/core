import { Circle, SATVector } from 'detect-collisions';
import { getStats } from '../stats.js';
import Mob from './Mob.js';
export default class Spider extends Mob {
    stats = getStats('Spider');
    _stats = getStats('Spider');
    body = new Circle(new SATVector(0, 0), this.stats.radius);
}
//# sourceMappingURL=Spider.js.map