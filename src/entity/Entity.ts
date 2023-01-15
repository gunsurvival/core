import type {Circle, Ellipse, Polygon, Box, Line, Point, Response} from 'detect-collisions';
import safeId from '../util/safeId.js';
import type World from '../world/World.js';

export default class Entity {
	id: number;
	markAsRemove = false;
	tick = 0;
	constructor(
		public body: Circle | Ellipse | Polygon | Box | Line | Point,
	) {
		this.id = safeId();
		// This.body = body;
	}

	update(
		add: World['add'],
		remove: World['remove'],
	) {
		this.tick++;
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
