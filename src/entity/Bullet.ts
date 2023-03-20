import {type Body, SATVector, Circle} from 'detect-collisions';
import {genId} from '../index.js';
import {getStats} from '../stats.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export type StatsBullet = {
	radius: number;
	speed: number;
};

export default class Bullet extends Entity {
	body: Body;
	stats = getStats<StatsBullet>('Bullet');
	speed = 0;

	constructor(pos: SATVector, angle: number, speed: number) {
		super();
		this.body = new Circle(pos, this.stats.radius);
		this.speed = speed;
		this.body.angle = angle;
	}

	update(world: World, tickData: ITickData): void {
		const vel = new SATVector(
			Math.cos(this.body.angle) * this.speed,
			Math.sin(this.body.angle) * this.speed,
		);
		this.body.pos.add(vel.scale(tickData.delta));
		this.speed *= 0.98;
		if (this.speed < 0.001) {
			this.markAsRemove = true;
		}
	}

	onCollisionEnter(other: Entity, response: SAT.Response) {
		// TODO: XAi SAT.VECTOR
		if (other.constructor.name === 'Gunner') {
			this.body.angle = Math.atan2(-response.overlapN.y, -response.overlapN.x);
			this.speed = response.overlapV.len() / 1.5;
		}

		if (other.constructor.name === 'Rock') {
			this.body.pos.x -= response.overlapV.x;
			this.body.pos.y -= response.overlapV.y;
			this.body.angle = Math.atan2(-response.overlapN.y, -response.overlapN.x);
			this.speed /= 2;
		}
	}

	init(data: {angle: number; speed: number}) {
		super.init(data);
		this.body.angle = data.angle;
		this.speed = data.speed;
	}
}
