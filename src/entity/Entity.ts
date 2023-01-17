import type {Response, Body} from 'detect-collisions';
import type {TickData} from '../types.js';
import safeId from '../util/safeId.js';
import type World from '../world/World.js';

export default class Entity {
	id: number;
	markAsRemove = false;
	elapsedTick = 0;
	constructor(
		public body: Body,
	) {
		this.id = safeId();
	}

	update(
		world: World,
		tickData: TickData,
	) {
		this.elapsedTick++;
	}

	get plain() {
		return {

		};
	}

	destroy() {
		this.markAsRemove = true;
	}

	onCollisionEnter(other: Entity, response: Response) {}

	onCollisionStay(other: Entity, response: Response) {}

	onCollisionExit(other: Entity, response: Response) {}
}
