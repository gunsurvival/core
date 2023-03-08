import SAT from 'sat';
import {EventEmitter} from 'eventemitter3';
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
	event = new EventEmitter();
	abstract body: Body; // This is relate to physic so no need to use custom mutate variable, changes auto assign at end of update
	abstract stats: unknown; // Need to be re-define interface in child class

	constructor() {
		this.effects.onAdd = (effect: Effect) => {
			this.event.emit('+effects', effect);
		};

		this.effects.onRemove = (effect: Effect) => {
			this.event.emit('-effects', effect);
		};
	}

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

	update(world: World, tickData: ITickData) {}
	onAdd(world: World) {} // Call after entity is added to world
	onRemove(world: World) {} // Call after entity is removed from world
	onCollisionEnter(other: Entity, response: Response) {}
	onCollisionStay(other: Entity, response: Response) {}
	onCollisionExit(other: Entity, response: Response) {}

	init(data: Record<string, unknown>) {
		const data_formated = data as {
			id: string;
			scale: number;
			angle: number;
			pos: {x: number; y: number};
			offset: {x: number; y: number};
		};
		this.id = data_formated.id;
		this.body.setAngle(data_formated.angle);
		this.body.setScale(data_formated.scale);
		this.body.setPosition(data_formated.pos.x, data_formated.pos.y);
		this.body.setOffset(new SAT.Vector(data_formated.offset.x, data_formated.offset.y));
	}
}
