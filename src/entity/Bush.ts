import {type, Schema} from '@colyseus/schema';
import {type BodyOptions, Circle, type Response, type Body} from 'detect-collisions';
import getStats from '../stats.js';
import type {TickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export class StatsBush extends Schema {
	@type('number') radius: number;
}

export default class Bush extends Entity {
	@type(StatsBush) stats = getStats<StatsBush>('Bush');
	body: Body;

	constructor(pos: SAT.Vector, bodyOptions: BodyOptions = {}) {
		super();
		this.body = new Circle(pos, this.stats.radius, bodyOptions);
	}

	update(world: World, tickData: TickData) {}

	onInit() {}
	onDestroy() {}
	onCollisionEnter(other: Entity, response: Response) {}
	onCollisionStay(other: Entity, response: Response) {}
	onCollisionExit(other: Entity, response: Response) {}
}
