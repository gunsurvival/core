import {type, Schema} from '@colyseus/schema';
import {type Body} from 'detect-collisions';
import type {Response} from 'detect-collisions';
import Effect from '../effect/Effect.js';
import type {TickData} from '../types.js';
import safeId from '../util/safeId.js';
import type World from '../world/World.js';
import getStats from '../stats.js';

export class Position extends Schema {
	@type('number') x: number;
	@type('number') y: number;
}

// Redefine Body in colyseus Schema to use fosil-delta
export class BodyStateSchema extends Schema {
	@type(Position) pos: Position;
    @type('number') angle: number;
}

export default abstract class Entity extends Schema {
	@type('number') id: number = safeId();
	@type([Effect]) effects: Effect[] = [];
	@type('boolean') markAsRemove = false;
	@type('number') elapsedTick = 0;
	@type(BodyStateSchema) bodyState: BodyStateSchema;

	abstract body: Body;
	abstract stats: unknown; // Need to be re-define in child class

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

	finalUpdate(world: World, tickData: TickData) {
        this.
	}

	destroy() {
		this.markAsRemove = true;
	}

	abstract update(world: World, tickData: TickData): void;
	abstract onInit(world: World): void; // Call when entity is added to world
	abstract onDestroy(world: World): void; // Call when entity is removed from world
	abstract onCollisionEnter(other: Entity, response: Response): void;
	abstract onCollisionStay(other: Entity, response: Response): void;
	abstract onCollisionExit(other: Entity, response: Response): void;
}
