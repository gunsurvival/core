import {type, Schema} from '@colyseus/schema';
import {type TickData} from '../types.js';
import safeId from '../util/safeId.js';
import type World from '../world/World.js';

export default class Effect extends Schema {
	@type('number') id: number = safeId();
	@type('boolean') markAsRemove = false;

	calc(stats: unknown, world: World, tickData: TickData) {}

	destroy() {
		this.markAsRemove = true;
	}
}
