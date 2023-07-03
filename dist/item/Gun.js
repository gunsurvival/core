import random from 'random';
import CoolDownSystem from '../util/CoolDownSystem.js';
import Item from './Item.js';
import { safeId } from '../index.js';
export default class Gun extends Item {
    coolDownSystem = new CoolDownSystem();
    update(tickData) {
        this.coolDownSystem.update(tickData);
    }
    async primaryAction(player, world, tickData) {
        if (this.coolDownSystem.isReady('primary')) {
            this.coolDownSystem.add('primary', this.stats.autoCD);
            await this.fire(player, world, tickData);
            player.event.emit('shoot').catch(console.error);
        }
    }
    async fire(player, world, tickData) {
        if (!world.isOnline) {
            // Only create bullet if playing locally (to ignore two bullets being created from server & client)
            const tolerance = random.normal(0, Math.PI / (this.stats.tolerance / (1 + player.entity.vel.len())));
            await world.api('api:+entities', 'Bullet', {
                id: safeId(),
                ownerId: player.entity.id,
                pos: {
                    x: player.entity.body.pos.x + Math.cos(player.entity.body.angle) * 70,
                    y: player.entity.body.pos.y + Math.sin(player.entity.body.angle) * 70,
                },
                angle: player.entity.body.angle + Number(tolerance()),
                speed: 30,
            });
        }
    }
}
//# sourceMappingURL=Gun.js.map