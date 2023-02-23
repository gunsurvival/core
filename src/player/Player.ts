import SAT from 'sat';
import type {ITickData} from '../types.js';
import CoolDownSystem from '../util/CoolDownSystem.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';

export default abstract class Player<T extends Entity> {
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

	coolDownSystem = new CoolDownSystem();

	playAs(entity: T) {
		this.entity = entity;
	}

	update(world: World, tickData: ITickData) {
		this.coolDownSystem.update(tickData);
	}
}
