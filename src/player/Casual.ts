import SAT from 'sat';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';

export default class Player<T extends Entity> {
	entity: T;
	fallbackSpeed = 5;
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

	playAs(entity: T) {
		this.entity = entity;
	}

	update(world: World, tickData: ITickData) {
		const vel = this.getSpeedV().scale(tickData.delta);
		this.entity.body.setPosition(
			this.entity.body.x + vel.x,
			this.entity.body.y + vel.y,
		);
	}

	getSpeedV() {
		const speed = (this.entity.stats as {speed: number}).speed || this.fallbackSpeed;
		return new SAT.Vector(
			this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0,
			this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0,
		).scale(
			(1 / Math.sqrt(2)) * speed,
		);
	}
}
