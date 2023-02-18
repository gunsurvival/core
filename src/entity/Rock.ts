import {type BodyOptions, type Response, type Body, Circle} from 'detect-collisions';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
import getStats from '../stats.js';

export type StatsRock = {
	radius: number;
};

export default class Rock extends Entity {
	stats = getStats<StatsRock>('Rock');
	body: Body;

	constructor(pos: SAT.Vector, bodyOptions: BodyOptions = {}) {
		super();
		this.body = new Circle(pos, this.stats.radius, bodyOptions);
	}

	update(world: World, tickData: ITickData): void {}
	onInit(): void {}
	onDestroy(): void {}
	onCollisionEnter(other: Entity, response: Response) {}
	onCollisionStay(other: Entity, response: Response) {
		other.body.setPosition(
			other.body.pos.x + response.overlapV.x + response.overlapN.x,
			other.body.pos.y + response.overlapV.y + response.overlapN.y,
		);
	}

	onCollisionExit(other: Entity, response: Response) {}
}
