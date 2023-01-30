import {type BodyOptions, Circle, type Response, type Body} from 'detect-collisions';
import Entity from './Entity.js';
import getStats from '../stats.js';
import {type TickData} from '../types.js';
import type World from '../world/World.js';

export type IStatsRock = {
	radius: number;
};

export default class Rock extends Entity {
	body: Body;
	stats = getStats<IStatsRock>('Rock');
	constructor(pos: SAT.Vector, bodyOptions: BodyOptions = {}) {
		super();
		this.body = new Circle(pos, this.stats.radius, bodyOptions);
	}

	update(world: World, tickData: TickData): void {

	}

	onCreate(): void {

	}

	onCollisionEnter(other: Entity, response: Response) {
	}

	onCollisionStay(other: Entity, response: Response) {
		other.body.setPosition(
			other.body.pos.x + response.overlapV.x + response.overlapN.x,
			other.body.pos.y + response.overlapV.y + response.overlapN.y,
		);
	}

	onCollisionExit(other: Entity, response: Response) {
	}
}
