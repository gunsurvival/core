import {type Response, Circle, SATVector, type Body} from 'detect-collisions';
import Entity from './Entity.js';
import {type stats, getStats} from '../stats.js';
import type Bullet from './Bullet.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';

export default class Rock extends Entity {
	stats = getStats('Rock');
	_stats = getStats('Rock');
	body: Body;

	constructor(pos = new SATVector(0, 0)) {
		super();
		this.body = new Circle(pos, this.stats.radius);
	}

	update(world: World, tickData: ITickData): void {
	}

	onCollisionEnter(other: Entity, response: Response): void {
		if (other.constructor.name === 'Bullet') {
			this.stats.health -= (other as Bullet).speed / 5;
			this.body.setScale(this.stats.health / 100);
			if (this.stats.health <= 30) {
				this.destroy();
			}
		}
	}

	onCollisionStay(other: Entity, response: Response) {
		other.body.setPosition(
			other.body.pos.x + response.overlapV.x + response.overlapN.x,
			other.body.pos.y + response.overlapV.y + response.overlapN.y,
		);
	}
}
