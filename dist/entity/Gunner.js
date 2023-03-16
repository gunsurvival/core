import { Circle } from 'detect-collisions';
import { getStats } from '../stats.js';
import Entity from './Entity.js';
export default class Gunner extends Entity {
    stats = getStats('Gunner');
    body = new Circle({ x: 1, y: 1 }, 40, {});
    onCollisionEnter(other, response) {
        switch (other.constructor.name) {
            case 'Bullet':
                this.stats.health -= other.vel.len();
                break;
            default:
                break;
        }
    }
    onCollisionStay(other, response) {
        switch (other.constructor.name) {
            case 'Gunner':
                this.body.setPosition(this.body.pos.x - (response.overlapV.x + response.overlapN.x) / 2, this.body.pos.y - (response.overlapV.y + response.overlapN.y) / 2);
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=Gunner.js.map