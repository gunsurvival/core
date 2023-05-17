import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import {safeId} from '../util/safeId.js';
import type Entity from '../entity/Entity.js';

export default abstract class Effect {
	id: string = safeId();
	markAsRemove = false;

	destroy() {
		this.markAsRemove = true;
	}

	abstract calc(entity: Entity, world: World, tickData: ITickData): void;
}
