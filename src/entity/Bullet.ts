import {type Body, SATVector, Circle} from 'detect-collisions';
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
	angle = 0;
	speed = 0;

	constructor(pos: SATVector, angle: number, speed: number) {
		super();
		this.body = new Circle(pos, this.stats.radius);
		this.angle = angle;
		this.speed = speed;
	}

	update(world: World, tickData: ITickData): void {
		const vel = new SATVector(
			Math.cos(this.angle) * this.speed,
			Math.sin(this.angle) * this.speed,
		);
		this.body.pos.add(vel.scale(tickData.delta));
		this.speed *= 0.98;
		if (this.speed < 0.001) {
			world.remove(this);
		}
	}

	async onCollisionEnter(other: Entity, response: SAT.Response): void {
		// TODO: XAi SAT.VECTOR
		if (other.constructor.name === 'Gunner') {
			await this.waitResolve(); // Insert some middleware here to wait for the other platform to resolve
			// TODO: emit collision event
			// server co event thi gui event ve client
			// client co event thi await event tu server ve
			this.angle = Math.atan2(-response.overlapN.y, -response.overlapN.x);
			this.speed = response.overlapV.len() / 1.5;
		}

		if (other.constructor.name === 'Rock') {
			this.body.pos.x -= response.overlapV.x;
			this.body.pos.y -= response.overlapV.y;
			this.angle = Math.atan2(-response.overlapN.y, -response.overlapN.x);
			this.speed = response.overlapV.len() / 1.5;
		}
	}

	init(data: {angle: number; speed: number}) {
		super.init(data);
		this.angle = data.angle;
		this.speed = data.speed;
	}
}
