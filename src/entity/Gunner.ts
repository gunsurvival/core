import {type Response, Circle, type Vector} from 'detect-collisions';
import Bullet from './Bullet.js';
import getStats from '../stats.js';
import Entity from './Entity.js';
import type World from '../world/World.js';

export type StatsGunner = {
	health: number;
	speed: number;
	radius: number;
};

export default class Gunner extends Entity {
	stats = getStats<StatsGunner>('Gunner');
	body = new Circle({x: 1, y: 1}, 40, {});

	onCollisionStay(other: Entity, response: Response) {
		switch (other.constructor.name) {
			case 'Gunner':
				this.body.setPosition(
					this.body.pos.x - (response.overlapV.x + response.overlapN.x) / 2,
					this.body.pos.y - (response.overlapV.y + response.overlapN.y) / 2,
				);
				break;
			default:
				break;
		}
	}
}
