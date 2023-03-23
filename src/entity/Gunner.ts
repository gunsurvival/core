import {type Response, Circle, SATVector, type Body} from 'detect-collisions';
import type Bullet from './Bullet.js';
import {getStats} from '../stats.js';
import Entity from './Entity.js';
import Slow from '../effect/Slow.js';

export type StatsGunner = {
	health: number;
	speed: number;
	radius: number;
};

export default class Gunner extends Entity {
	stats = getStats('Gunner');
	_stats = getStats('Gunner');
	body: Body;

	constructor(pos = new SATVector(0, 0)) {
		super();
		this.body = new Circle(pos, this.stats.radius);
	}

	onCollisionEnter(other: Entity, response: Response) {
		switch (other.constructor.name) {
			case 'Bullet':
				this.stats.health -= (other as Bullet).speed;
				if (this.stats.health <= 0) {
					this.stats.health = 0;
				}

				break;
			case 'Bush':
				if (!this.effects.get('slow-on-bush')) {
					this.addEffect('slow-on-bush', new Slow(0.5));
					console.log('addeed');
				}

				break;
			default:
				break;
		}
	}

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

	onCollisionExit(other: Entity, response: Response) {
		switch (other.constructor.name) {
			case 'Bush':
				this.removeEffect('slow-on-bush');
				console.log('remove');

				break;
			default:
				break;
		}
	}
}
