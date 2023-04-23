import { SATVector, Circle } from 'detect-collisions';
import { getStats } from '../stats.js';
import Entity from './Entity.js';
export default class Bullet extends Entity {
    stats = getStats('Bullet');
    _stats = getStats('Bullet');
    body;
    speed;
    constructor(pos = new SATVector(0, 0), angle = 0, speed = 0) {
        super();
        this.body = new Circle(pos, this.stats.radius);
        this.body.angle = angle;
        this.speed = speed;
    }
    update(world, tickData) {
        this.vel.x = Math.cos(this.body.angle) * this.speed;
        this.vel.y = Math.sin(this.body.angle) * this.speed;
        this.speed *= 0.98;
        if (this.speed < 0.001) {
            this.markAsRemove = true;
        }
    }
    onCollisionEnter(other, response) {
        if (other.constructor.name === 'Gunner') {
            this.markAsRemove = true;
        }
        if (other.constructor.name === 'Rock') {
            this.body.pos.x -= response.overlapV.x;
            this.body.pos.y -= response.overlapV.y;
            this.body.angle = Math.atan2(-response.overlapN.y, -response.overlapN.x);
            this.speed /= 2;
        }
    }
    init(data) {
        super.init(data);
        this.speed = data.speed;
    }
}
//# sourceMappingURL=Bullet.js.map