import {type BodyOptions, type Body, Circle, SATVector} from 'detect-collisions';
import {getStats} from '../stats.js';
import Entity from './Entity.js';

export default class Bush extends Entity {
	stats = getStats('Bush');
	_stats = getStats('Bush');
	body: Body;
	isStatic = true;

	constructor(pos = new SATVector(0, 0)) {
		super();
		this.body = new Circle(pos, this.stats.radius);
	}

	onCollisionStay(other: Entity, response: SAT.Response): void {
		this.body.setPosition(
			this.body.pos.x - response.overlapV.x,
			this.body.pos.y - response.overlapV.y,
		);
	}
}
