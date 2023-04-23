import random from 'random';
import { SATVector } from 'detect-collisions';
import Bullet from '../entity/Bullet.js';
import Gun from './Gun.js';
const tolerance = random.normal(0, Math.PI / 128);
export default class Ak47 extends Gun {
    constructor() {
        super(120);
    }
    async fire(player, world, tickData) {
        await player.event.emit('shoot');
        if (!player.isOnline) {
            // Only create bullet if playing locally (offline)
            const bullet = new Bullet(new SATVector(player.entity.body.pos.x + Math.cos(player.entity.body.angle) * 60, player.entity.body.pos.y + Math.sin(player.entity.body.angle) * 60), player.entity.body.angle + Number(tolerance()), 30);
            world.add(bullet);
        }
    }
}
//# sourceMappingURL=Ak47.js.map