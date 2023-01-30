import {type TickData} from '../types.js';
import safeId from '../util/safeId.js';
import type World from '../world/World.js';

export class Effect {
	id = safeId();
	markAsRemove = false;

	calc(stats: unknown, world: World, tickData: TickData) {}

	destroy() {
		this.markAsRemove = true;
	}
}
