import {type, Schema} from '@colyseus/schema';
import {type TickData} from '../types';
import {safeId} from '../util/safeId';
import type World from '../world/World';

export default abstract class Effect extends Schema {
	@type('number') id: number = safeId();
	@type('boolean') markAsRemove = false;

	destroy() {
		this.markAsRemove = true;
	}

	abstract calc(stats: unknown, world: World, tickData: TickData): void;
}
