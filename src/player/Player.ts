import {AsyncEE} from './../util/AsyncEE.js';
import type {ITickData} from '../types.js';
import CoolDownSystem from '../util/CoolDownSystem.js';
import type World from '../world/World.js';
import type Entity from '../entity/Entity.js';

export default abstract class Player<T extends Entity> {
	entity: T;
	fallbackSpeed = 5;
	event = new AsyncEE();
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

	event = new AsyncEE();
	coolDownSystem = new CoolDownSystem();

	constructor(public isOnline = false) {}

	playAs(entity: T) {
		this.entity = entity;
		this.bindEvents(entity);
	}

	bindEvents(entity: Entity) {
		entity.event.on('collision-enter', () => {
			// This.event.emit('collision-enter');
		});
		entity.event.on('collision-exit', () => {
			// This.event.emit('collision-exit');
		});
	}

	unbindEvents(entity: Entity) {
		// Entity.event.off('collision-enter');
		// entity.event.off('collision-exit');
	}

	get isReady() {
		return Boolean(this.entity);
	}

	update(world: World, tickData: ITickData) {
		this.coolDownSystem.update(tickData);
	}
}
