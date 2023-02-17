import type {ITickData} from '../types';
import {safeId} from '../util';
import type World from '../world/World';

export default abstract class Effect {
	id: number = safeId();
	markAsRemove = false;

	destroy() {
		this.markAsRemove = true;
	}

	abstract calc(stats: unknown, world: World, tickData: ITickData): void;
}
