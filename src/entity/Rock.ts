import {Circle, type Response} from 'detect-collisions';
import Entity from './Entity.js';

export default class Rock extends Entity {
	constructor() {
		super(new Circle({x: 300, y: 300}, 55, {}));
	}

	get plain() {
		return {

		};
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
