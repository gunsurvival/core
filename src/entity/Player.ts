import SAT from 'sat';
import type {TickData} from '../types.js';
import type World from '../world/World.js';
import type Entity from './Entity.js';

export type IPlayer = {
	speed: number;
	state: {
		keyboard: {
			w: boolean;
			a: boolean;
			s: boolean;
			d: boolean;
			shift: boolean;
			1: boolean;
			2: boolean;
			3: boolean;
			4: boolean;
			5: boolean;
			6: boolean;
			7: boolean;
			8: boolean;
			9: boolean;
		};
		mouse: {
			left: boolean;
			middle: boolean;
			right: boolean;
		};
	};

	pointer: {
		x: number;
		y: number;
	};
};

type Constructor<T> = new(...args: any[]) => T;

export default function player<T extends Constructor<Entity>>(Base: T) {
	return class extends Base implements IPlayer {
		speed = 5;
		state = {
			keyboard: {
				w: false,
				a: false,
				s: false,
				d: false,
				shift: false,
				1: false,
				2: false,
				3: false,
				4: false,
				5: false,
				6: false,
				7: false,
				8: false,
				9: false,
			},
			mouse: {
				left: false,
				middle: false,
				right: false,
			},
		};

		pointer = {
			x: 0,
			y: 0,
		};

		constructor(...args: any[]) {
			super(...args);
			console.log(this.id);
		}

		update(world: World, tickData: TickData) {
			super.update(world, tickData);
			const vel = this.getSpeedV().scale(tickData.delta);
			this.body.setPosition(
				this.body.x + vel.x,
				this.body.y + vel.y,
			);
			this.body.setAngle(Math.atan2(
				this.pointer.y - this.body.y,
				this.pointer.x - this.body.x,
			));
		}

		getSpeedV() {
			return new SAT.Vector(
				this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0,
				this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0,
			).scale(
				(1 / Math.sqrt(2)) * this.speed,
			);
		}
	};
}
