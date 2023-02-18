import type {Body, Response} from 'detect-collisions';
import type {ITickData} from '../types.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
import {safeId, MutateArray} from '../util/index.js';
import getStats from '../stats.js';

export default abstract class Entity {
	id = String(safeId());
	name: string = this.constructor.name;
	markAsRemove = false;
	elapsedTick = 0;
	effects = new MutateArray<Effect>(); // This is not relate to physic so need to use custom array to detect changes (MutateArray)
	abstract body: Body; // This is relate to physic so no need to use custom mutate variable, changes auto assign at end of update
	abstract stats: unknown; // Need to be re-define interface in child class

	beforeUpdate(world: World, tickData: ITickData) {
		this.elapsedTick++;
		this.stats = getStats(this.constructor.name);
		// Iterate over effects and calculate them
		// if effect is done or marked as remove, remove it
		for (let i = 0; i < this.effects.length; i++) {
			if (this.effects[i].markAsRemove) {
				this.effects.removeIndex(i--);
				continue;
			}

			this.effects[i].calc(this.stats, world, tickData);
		}
	}

	afterUpdate(world: World, tickData: ITickData) {

	}

	destroy() {
		this.markAsRemove = true;
	}

	abstract update(world: World, tickData: ITickData): void;
	abstract onInit(world: World): void; // Call after entity is added to world
	abstract onDestroy(world: World): void; // Call after entity is removed from world
	abstract onCollisionEnter(other: Entity, response: Response): void;
	abstract onCollisionStay(other: Entity, response: Response): void;
	abstract onCollisionExit(other: Entity, response: Response): void;
}
