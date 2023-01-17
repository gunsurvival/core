import {Circle, type Response} from 'detect-collisions';
import type {TickData} from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';

export default class Gunner extends Entity {
	constructor() {
		super(new Circle({x: 1, y: 1}, 80, {}));
	}

	update(world: World, tickData: TickData): void {
		super.update(world, tickData);
		// This.body.x = 100.0 + (Math.cos(tickData.elapsedMs / 200.0) * 100.0);
		// this.body.y = 100.0 + (Math.sin(tickData.elapsedMs / 200.0) * 100.0);
	}

	get plain() {
		return {

		};
	}

	onCollisionEnter(other: Entity, response: Response) {}

	onCollisionStay(other: Entity, response: Response) {}

	onCollisionExit(other: Entity, response: Response) {}
}
