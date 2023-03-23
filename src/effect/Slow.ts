import type Entity from '../entity/Entity.js';
import type {ITickData} from '../types.js';
import type World from '../world/World.js';
import Effect from './Effect.js';

export default class Slow extends Effect {
	constructor(public strength = 1) {
		super();
	}

	calc(entity: Entity, world: World, tickData: ITickData): void {
		entity._stats.speed *= this.strength;
	}
}
