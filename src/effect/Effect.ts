import type {ITickData} from '../types.js';
import {safeId} from '../util/safeId.js';
import type World from '../world/World.js';

export default abstract class Effect {
	id: number = safeId();
	markAsRemove = false;

	destroy() {
		this.markAsRemove = true;
	}

	abstract calc(stats: unknown, world: World, tickData: ITickData): void;
}
