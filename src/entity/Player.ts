import type {PlayerState} from '../types.js';
import type Entity from './Entity.js';
type Constructor<T> = new(...args: any[]) => T;

export default function player<T extends Constructor<Entity>>(Base: T) {
	return class extends Base {
		state: PlayerState;

		constructor(...args: any[]) {
			super(...args);
			console.log(this.id);
		}

		getSpeedV() {

			// Return new SAT.Vector(
			// 	this.state.moving.left ? -1 : this.state.moving.right ? 1 : 0,
			// 	this.state.moving.up ? -1 : this.state.moving.down ? 1 : 0,
			// ).scale(
			// 	(1 / Math.sqrt(2)) * this.speed * this.delta,
			// );
		}
	};
}
