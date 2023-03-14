import {type Body, SATVector, Circle} from 'detect-collisions';
import getStats from '../stats.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export type StatsBullet = {
	radius: number;
};

export default class Bullet extends Entity {
	body: Body;
	stats = getStats<StatsBullet>('Bullet');
	vel: SATVector;

	constructor(pos: SATVector, vel: SATVector = new SATVector(0, 0)) {
		super();
		this.body = new Circle(pos, this.stats.radius);
		this.vel = vel;
	}

	update(world: World, tickData: ITickData): void {
		this.body.pos.x += this.vel.x * tickData.delta;
		this.body.pos.y += this.vel.y * tickData.delta;
		this.vel.x *= 0.97;
		this.vel.y *= 0.97;
		if (this.vel.x ** 2 + this.vel.y ** 2 < 0.001) {
			world.remove(this);
		}
	}

	onCollisionEnter(other: Entity, response: SAT.Response): void {
		// TODO: XAi SAT.VECTOR
		const speed = Math.sqrt(this.vel.x ** 2 + this.vel.y ** 2);
		if (other.constructor.name === 'Gunner') {
			other.body.pos.x += response.overlapV.x;
			other.body.pos.y += response.overlapV.y;
			this.body.pos.x -= response.overlapV.x;
			this.body.pos.y -= response.overlapV.y;
			this.vel.x = -response.overlapN.x * speed / 1.5;
			this.vel.y = -response.overlapN.y * speed / 1.5;
		}

		if (other.constructor.name === 'Rock') {
			console.log(response);
			this.body.pos.x -= response.overlapV.x;
			this.body.pos.y -= response.overlapV.y;
			this.vel.x = -response.overlapN.x * speed / 1.5;
			this.vel.y = -response.overlapN.y * speed / 1.5;
		}
	}

	init(data: {vel: SATVector}) {
		super.init(data);
		this.vel.x = data.vel.x;
		this.vel.y = data.vel.y;
	}
}
