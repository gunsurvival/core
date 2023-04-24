import { Circle, SATVector } from 'detect-collisions';
import { getStats } from '../stats.js';
import Entity from './Entity.js';
import Slow from '../effect/Slow.js';
export default class Gunner extends Entity {
    stats = getStats('Gunner');
    _stats = getStats('Gunner');
    body;
    constructor(pos = new SATVector(0, 0)) {
        super();
        this.body = new Circle(pos, this.stats.radius);
    }
    onCollisionEnter(other, response) {
        switch (other.constructor.name) {
            case 'Bullet':
                this.stats.health -= other.speed;
                if (this.stats.health <= 0) {
                    this.stats.health = 0;
                }
                break;
            case 'Bush':
                if (!this.effects.get('slow-on-bush')) {
                    this.addEffect('slow-on-bush', new Slow(0.5));
                }
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
    onCollisionExit(other, response) {
        switch (other.constructor.name) {
            case 'Bush':
                this.removeEffect('slow-on-bush');
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=Gunner.js.map