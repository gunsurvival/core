import {Circle, type Response} from 'detect-collisions';
import type {TickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export default class Bush extends Entity {
	constructor() {
		super(new Circle({x: 1, y: 1}, 50, {}));
	}

	update(world: World, tickData: TickData) {
		super.update(world, tickData);
	}

	get plain() {
		return {

		};
	}

	onCollisionEnter(other: Entity, response: Response) {}

	onCollisionStay(other: Entity, response: Response) {}

	onCollisionExit(other: Entity, response: Response) {}
}
