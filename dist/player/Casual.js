import random from 'random';
import Bullet from '../entity/Bullet.js';
import Player from './Player.js';
import { SATVector } from 'detect-collisions';
const tolerance = random.normal(0, Math.PI / 128);
export default class Casual extends Player {
    update(world, tickData) {
        super.update(world, tickData);
        const vel = this.getSpeedV().scale(tickData.delta);
        this.entity.body.setPosition(this.entity.body.x + vel.x, this.entity.body.y + vel.y);
        if (this.state.mouse.left) {
            this.shoot(world);
        }
        // If ((this.entity.stats as {health: number}).health <= 0) {
        // 	this.entity.markAsRemove = true;
        // }
    }
    getSpeedV() {
        const speed = this.entity.stats.speed || this.fallbackSpeed;
        return new SATVector(this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0, this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0).scale((1 / Math.sqrt(2)) * speed);
    }
    shoot(world) {
        if (this.coolDownSystem.isCoolingDown('shoot')) {
            return;
        }
        this.coolDownSystem.add('shoot', 100);
        const bullet = new Bullet(new SATVector(this.entity.body.pos.x + Math.cos(this.entity.body.angle) * 60, this.entity.body.pos.y + Math.sin(this.entity.body.angle) * 60), this.entity.body.angle + Number(tolerance()), 30);
        world.add(bullet);
    }
}
//# sourceMappingURL=Casual.js.map