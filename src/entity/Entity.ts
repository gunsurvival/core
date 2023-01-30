import type {Response, Body} from 'detect-collisions';
import {type Effect} from '../effect/Effect.js';
import type {TickData} from '../types.js';
import safeId from '../util/safeId.js';
import type World from '../world/World.js';
import getStats from '../stats.js';

// Them implements co stats + body, de ra ngoai thay vi xai super()

export default abstract class Entity {
	id = safeId();
	effects: Effect[] = [];
	markAsRemove = false;
	elapsedTick = 0;
	abstract body: Body;
	abstract stats: unknown; // Need to be re-define in child class

	constructor() {
		this.onCreate();
	}

	baseUpdate(world: World, tickData: TickData) {
		this.elapsedTick++;
		this.stats = getStats(this.constructor.name);
		// Interate over effects and calculate them
		// if effect is done or marked as remove, remove it
		for (let i = 0; i < this.effects.length; i++) {
			if (this.effects[i].markAsRemove) {
				this.effects.splice(i, 1);
				i--;
				continue;
			}

			this.effects[i].calc(this.stats, world, tickData);
		}
	}

	destroy() {
		this.markAsRemove = true;
	}

	abstract update(world: World, tickData: TickData): void;
	abstract onCreate(): void;
	abstract onCollisionEnter(other: Entity, response: Response): void;
	abstract onCollisionStay(other: Entity, response: Response): void;
	abstract onCollisionExit(other: Entity, response: Response): void;
}
