import { Circle, SATVector } from 'detect-collisions';
import Entity from './Entity.js';
import { getStats } from '../stats.js';
export default class Rock extends Entity {
    stats = getStats('Rock');
    _stats = getStats('Rock');
    body;
    constructor(pos = new SATVector(0, 0)) {
        super();
        this.body = new Circle(pos, this.stats.radius);
    }
    update(world, tickData) {
    }
    onCollisionEnter(other, response) {
        if (other.constructor.name === 'Bullet') {
            this.stats.health -= other.speed / 5;
            this.body.setScale(this.stats.health / 100);
            if (this.stats.health <= 30) {
                this.destroy();
            }
        }
    }
    onCollisionStay(other, response) {
        other.body.setPosition(other.body.pos.x + response.overlapV.x + response.overlapN.x, other.body.pos.y + response.overlapV.y + response.overlapN.y);
    }
}
//# sourceMappingURL=Rock.js.map