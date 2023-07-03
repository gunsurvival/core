import { SATVector, Circle } from 'detect-collisions';
import { getStats } from '../stats.js';
import Entity from './Entity.js';
import Rock from './Rock.js';
export default class Bullet extends Entity {
    stats = getStats('Bullet');
    _stats = getStats('Bullet');
    body = new Circle(new SATVector(0, 0), this.stats.radius);
    speed = 0;
    ownerId = '';
    update(world, tickData) {
        this.vel.x = Math.cos(this.body.angle) * this.speed;
        this.vel.y = Math.sin(this.body.angle) * this.speed;
        this.speed *= 0.98;
        if (this.speed < 0.001) {
            this.destroy();
        }
    }
    onCollisionEnter(other, response) {
        if (other instanceof Rock) {
            this.body.pos.x -= response.overlapV.x;
            this.body.pos.y -= response.overlapV.y;
            this.body.angle = Math.atan2(-response.overlapN.y, -response.overlapN.x);
            this.speed /= 2;
        }
    }
    init(data) {
        super.init(data);
        this.speed = data.speed;
        this.ownerId = data.ownerId;
    }
}
//# sourceMappingURL=Bullet.js.map