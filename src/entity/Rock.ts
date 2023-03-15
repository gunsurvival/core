import {type BodyOptions, type Response, type Body, Circle, type SATVector} from 'detect-collisions';
import Entity from './Entity.js';
import {getStats} from '../stats.js';

export type StatsRock = {
	radius: number;
};

export default class Rock extends Entity {
	stats = getStats<StatsRock>('Rock');
	body: Body;

	constructor(pos: SATVector, bodyOptions: BodyOptions = {}) {
		super();
		this.body = new Circle(pos, this.stats.radius, bodyOptions);
	}

	onCollisionStay(other: Entity, response: Response) {
		other.body.setPosition(
			other.body.pos.x + response.overlapV.x + response.overlapN.x,
			other.body.pos.y + response.overlapV.y + response.overlapN.y,
		);
	}
}
