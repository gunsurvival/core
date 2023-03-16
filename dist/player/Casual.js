import Bullet from '../entity/Bullet.js';
import Player from './Player.js';
import { SATVector } from 'detect-collisions';
export default class Casual extends Player {
    update(world, tickData) {
        super.update(world, tickData);
        const vel = this.getSpeedV().scale(tickData.delta);
        this.entity.body.setPosition(this.entity.body.x + vel.x, this.entity.body.y + vel.y);
        if (this.state.mouse.left) {
            this.shoot(world);
        }
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
        // TODO: Xai Vector cua Sat2d co may ham co san thay vi math amogus
        const vel = new SATVector(Math.cos(this.entity.body.angle) * 30, Math.sin(this.entity.body.angle) * 30);
        const bullet = new Bullet(new SATVector(this.entity.body.pos.x + vel.x * 2, this.entity.body.pos.y + vel.y * 2), vel);
        world.add(bullet);
    }
}
//# sourceMappingURL=Casual.js.map