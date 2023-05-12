import random from 'random';
import {SATVector} from 'detect-collisions';
import Bullet from '../entity/Bullet.js';
import CoolDownSystem from '../util/CoolDownSystem.js';
import type World from '../world/World.js';
import type {ITickData} from '../types.js';
import Item from './Item.js';
import {type GunStats} from '../stats.js';
import type Gunner from '../entity/Gunner.js';
import type PlayerCasual from '../player/Casual.js';

export default abstract class Gun extends Item {
	coolDownSystem = new CoolDownSystem();

	abstract stats: typeof GunStats;
	abstract _stats: typeof GunStats;

	update(tickData: ITickData) {
		this.coolDownSystem.update(tickData);
	}

	async primaryAction(player: PlayerCasual<Gunner>, world: World, tickData: ITickData) {
		if (this.coolDownSystem.isReady('primary')) {
			this.coolDownSystem.add('primary', this.stats.autoCD);
			await this.fire(player, world, tickData);
			player.entity.event.emit('shoot').catch(console.error);
		}
	}

	async fire(player: PlayerCasual, world: World, tickData: ITickData) {
		if (!player.isOnline) {
			// Only create bullet if playing locally (offline)
			const tolerance = random.normal(0, Math.PI / (this.stats.tolerance / (1 + player.getSpeedV().len())));
			await world.api('api:+entities', 'Bullet', {
				pos: {
					x: player.entity.body.pos.x + Math.cos(player.entity.body.angle) * 60,
					y: player.entity.body.pos.y + Math.sin(player.entity.body.angle) * 60,
				},
				angle: player.entity.body.angle + Number(tolerance()),
			});
		}
	}
}
