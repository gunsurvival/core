import { Circle, SATVector } from 'detect-collisions';
import Entity from './Entity.js';
import { getStats } from '../stats.js';
export default class Rock extends Entity {
    stats = getStats('Rock');
    _stats = getStats('Rock');
    body = new Circle(new SATVector(0, 0), this.stats.radius);
    isStatic = true;
    update(world, tickData) { }
    onCollisionEnter(other, response) {
        if (other.constructor.name === 'Bullet') {
            this._stats.health -= other.speed / 5;
            this.body.setScale(this._stats.health / 100);
            if (this._stats.health <= 30) {
                this.destroy();
            }
        }
    }
    onCollisionStay(other, response) {
        other.body.setPosition(other.body.pos.x + response.overlapV.x + response.overlapN.x, other.body.pos.y + response.overlapV.y + response.overlapN.y);
    }
}
//# sourceMappingURL=Rock.js.map