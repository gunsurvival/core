import Entity from './Entity.js';
import Bullet from './Bullet.js';
export default class Mob extends Entity {
    lastMoveTimeStamp = 0;
    update(world, tickData) {
        if (world.isOnline) {
            return;
        }
        if (tickData.elapsedMs - this.lastMoveTimeStamp
            > Math.random() * 1000 + 800) {
            this.vel.x = 0;
            this.vel.y = 0;
            switch (Math.floor(Math.random() * 5)) {
                case 0: // Only change angle
                    this.body.angle = Math.random() * Math.PI * 2;
                    break;
                case 1: {
                    // Change angle and move
                    this.body.angle = Math.random() * Math.PI * 2;
                    this.vel.x = Math.cos(this.body.angle) * this.stats.speed;
                    this.vel.y = Math.sin(this.body.angle) * this.stats.speed;
                    break;
                }
                case 2: {
                    // Only move
                    this.vel.x = Math.cos(this.body.angle) * this.stats.speed;
                    this.vel.y = Math.sin(this.body.angle) * this.stats.speed;
                    break;
                }
                default:
                    break;
            }
            this.lastMoveTimeStamp = tickData.elapsedMs;
        }
    }
    onCollisionEnter(other, response) {
        if (other instanceof Bullet) {
            this._stats.health -= other.vel.len() / 5;
            this.body.setScale(this._stats.health / 100);
            if (this._stats.health <= 30) {
                this.destroy();
            }
            other.destroy();
        }
    }
    onCollisionStay(other, response) {
        other.body.setPosition(other.body.pos.x + response.overlapV.x, other.body.pos.y + response.overlapV.y);
    }
}
//# sourceMappingURL=Mob.js.map