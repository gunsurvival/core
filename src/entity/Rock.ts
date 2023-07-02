import {type Response, Circle, SATVector, type Body} from 'detect-collisions';
import Entity from './Entity.js';
import {type stats, getStats} from '../stats.js';
import type Bullet from './Bullet.js';
import {type ITickData} from '../types.js';
import type World from '../world/World.js';

export default class Rock extends Entity {
	stats = getStats('Rock');
	_stats = getStats('Rock');
	body = new Circle(new SATVector(0, 0), this.stats.radius);
	isStatic = true;

	update(world: World, tickData: ITickData): void {
	}

	onCollisionEnter(other: Entity, response: Response): void {
		if (other.constructor.name === 'Bullet') {
			this._stats.health -= (other as Bullet).speed / 5;
			this.body.setScale(this._stats.health / 100);
			if (this._stats.health <= 30) {
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
