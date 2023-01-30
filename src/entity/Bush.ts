import {type BodyOptions, Circle, type Response, type Body} from 'detect-collisions';
import getStats from '../stats.js';
import type {TickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export type IStatsBush = {
	radius: number;
};

export default class Bush extends Entity {
	body: Body;
	stats = getStats('Bush');

	constructor(pos: SAT.Vector, bodyOptions: BodyOptions = {}) {
		super();
		this.body = new Circle(pos, 50, bodyOptions);
	}

	update(world: World, tickData: TickData) {}

	onCreate(): void {

	}

	onCollisionEnter(other: Entity, response: Response) {}

	onCollisionStay(other: Entity, response: Response) {}

	onCollisionExit(other: Entity, response: Response) {}
}
