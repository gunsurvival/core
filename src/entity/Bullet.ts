import {type Body, SATVector, Circle} from 'detect-collisions';
import {getStats} from '../stats.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
import Gunner from './Gunner.js';
import Rock from './Rock.js';

export default class Bullet extends Entity {
	stats = getStats('Bullet');
	_stats = getStats('Bullet');
	body = new Circle(new SATVector(0, 0), this.stats.radius);
	speed = 0;
	ownerId = '';

	update(world: World, tickData: ITickData): void {
		this.vel.x = Math.cos(this.body.angle) * this.speed;
		this.vel.y = Math.sin(this.body.angle) * this.speed;
		this.speed *= 0.98;
		if (this.speed < 0.001) {
			this.markAsRemove = true;
		}
	}

	onCollisionEnter(other: Entity, response: SAT.Response) {
		if (other instanceof Gunner) {
			this.markAsRemove = true;
		}

		if (other instanceof Rock) {
			this.body.pos.x -= response.overlapV.x;
			this.body.pos.y -= response.overlapV.y;
			this.body.angle = Math.atan2(-response.overlapN.y, -response.overlapN.x);
			this.speed /= 2;
		}
	}

	init(data: {speed: number; ownerId: string}) {
		super.init(data);
		this.speed = data.speed ?? 0;
		this.ownerId = data.ownerId ?? '';
	}
}
