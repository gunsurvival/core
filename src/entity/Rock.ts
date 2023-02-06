import {type, Schema} from '@colyseus/schema';
import {type BodyOptions, Circle, type Response, type Body} from 'detect-collisions';
import Entity from './Entity.js';
import getStats from '../stats.js';
import {type TickData} from '../types.js';
import type World from '../world/World.js';

export class StatsRock extends Schema {
	@type('number') radius: number;
}

export default class Rock extends Entity {
	@type(StatsRock) stats = getStats<StatsRock>('Rock');
	body: Body;

	constructor(pos: SAT.Vector, bodyOptions: BodyOptions = {}) {
		super();
		this.body = new Circle(pos, this.stats.radius, bodyOptions);
	}

	update(world: World, tickData: TickData): void {}
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
