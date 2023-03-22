import {type Response, Circle, SATVector, type Body} from 'detect-collisions';
import Entity from './Entity.js';
import {type stats, getStats} from '../stats.js';

export default class Rock extends Entity {
	stats = getStats('Rock');
	_stats = getStats('Rock');
	body: Body;

	constructor(pos = new SATVector(0, 0)) {
		super();
		this.body = new Circle(pos, this.stats.radius);
	}

	onCollisionStay(other: Entity, response: Response) {
		other.body.setPosition(
			other.body.pos.x + response.overlapV.x + response.overlapN.x,
			other.body.pos.y + response.overlapV.y + response.overlapN.y,
		);
	}
}
