import {type BodyOptions, type Response, type Body, Circle} from 'detect-collisions';
import getStats from '../stats.js';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export type StatsBush = {
	radius: number;
};

export default class Bush extends Entity {
	stats = getStats<StatsBush>('Bush');
	rigid: Body;

	constructor(pos: SAT.Vector, bodyOptions: BodyOptions = {}) {
		super();
		this.rigid = new Circle(pos, this.stats.radius, bodyOptions);
	}

	update(world: World, tickData: ITickData) {}

	onInit() {}
	onDestroy() {}
	onCollisionEnter(other: Entity, response: Response) {}
	onCollisionStay(other: Entity, response: Response) {}
	onCollisionExit(other: Entity, response: Response) {}
}
