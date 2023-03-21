import { SATVector, Circle } from 'detect-collisions';
import { getStats } from '../stats.js';
import Entity from './Entity.js';
export default class Bullet extends Entity {
    body;
    stats = getStats('Bullet');
    _stats = getStats('Bullet');
    speed = 0;
    constructor(pos, angle, speed) {
        super();
        this.body = new Circle(pos, this.stats.radius);
        this.speed = speed;
        this.body.angle = angle;
    }
    update(world, tickData) {
        const vel = new SATVector(Math.cos(this.body.angle) * this.speed, Math.sin(this.body.angle) * this.speed);
        this.body.pos.add(vel.scale(tickData.delta));
        this.speed *= 0.98;
        if (this.speed < 0.001) {
            this.markAsRemove = true;
        }
    }
    onCollisionEnter(other, response) {
        // TODO: XAi SAT.VECTOR
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
        this.body.angle = data.angle;
        this.speed = data.speed;
    }
}
//# sourceMappingURL=Bullet.js.map