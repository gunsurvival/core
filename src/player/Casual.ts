import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import Player, {type PlayerEventMap} from './Player.js';
import {SATVector} from 'detect-collisions';
import {type AsyncEE} from '../util/AsyncEE.js';
import type Entity from '../entity/Entity.js';

export default class Casual<T extends Entity = Entity> extends Player<T> {
	declare event: AsyncEE<CasualPlayerEventMap>;
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

	constructor(isOnline = false) {
		super(isOnline);
	}

	update(world: World, tickData: ITickData) {
		super.update(world, tickData);
		if (this.state.mouse.left && this.entity.inventory.current.length > 0) {
			this.entity.inventory.current[0]?.primaryAction(this, world, tickData);
		}

		this.entity.vel.copy(this.getSpeedV());
	}

	getSpeedV() {
		return new SATVector(
			this.state.keyboard.a ? -1 : this.state.keyboard.d ? 1 : 0,
			this.state.keyboard.w ? -1 : this.state.keyboard.s ? 1 : 0,
		).scale(
			(1 / Math.sqrt(2)) * this.speed,
		);
	}

	get speed() {
		return this.entity.stats.speed || this.fallbackSpeed;
	}
}

type CasualPlayerEventMap = PlayerEventMap & {
	'shoot': () => void;
};
