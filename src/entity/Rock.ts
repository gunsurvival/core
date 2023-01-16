import {Circle} from 'detect-collisions';
import Entity from './Entity.js';

export default class Rock extends Entity {
	constructor() {
		super(new Circle({x: 1, y: 1}, 180, {}));
	}

	get plain() {
		return {

		};
	}

	onCollisionEnter(other: Entity, response: Response) {}

	onCollisionStay(other: Entity, response: Response) {}

	onCollisionExit(other: Entity, response: Response) {}
}
