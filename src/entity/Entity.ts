import {type Body, type Response, SATVector} from 'detect-collisions';
import type {ITickData} from '../types.js';
import {AsyncEE} from '../util/AsyncEE.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
import {safeId, MutateArray} from '../util/index.js';
import {getStats} from '../stats.js';
import structuredClone from '@ungap/structured-clone';

export default abstract class Entity {
	id = String(safeId());
	name: string = this.constructor.name;
	markAsRemove = false;
	elapsedTick = 0;
	effects = new MutateArray<Effect>(); // Server state: This is not relate to physic so need to use custom mutate array to detect changes
	event = new AsyncEE();
	vel = new SATVector(0, 0);

	abstract body: Body; // Server state: This is relate to physic so no need to use custom mutate variable, changes auto assign it at end of update
	abstract stats: Record<string, unknown>; // Redefine this in the child class. Base stats that are not affected by effects
	abstract _stats: Record<string, unknown>; // Like above but this is used to calculate effects that have a duration

	constructor() {
		this.effects.onAdd = (effect: Effect) => {
			this.event.emit('+effects', effect).catch(console.error);
		};

		this.effects.onRemove = (effect: Effect) => {
			this.event.emit('-effects', effect).catch(console.error);
		};
	}

	beforeUpdate(world: World, tickData: ITickData) {
		this.elapsedTick++;
		this._stats = structuredClone(this.stats);
		// Iterate over effects and calculate them
		// if effect is done or marked as remove, remove it
		for (let i = 0; i < this.effects.length; i++) {
			if (this.effects[i].markAsRemove) {
				this.effects.removeIndex(i--);
				continue;
			}

			this.effects[i].calc(this, world, tickData);
		}

		this.body.pos.add(this.vel.scale(tickData.delta));
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
		const dataFormatted = data as {
			id: string;
			scale: number;
			angle: number;
			pos: {x: number; y: number};
			offset: {x: number; y: number};
		};
		this.id = dataFormatted.id;
		this.body.setAngle(dataFormatted.angle);
		this.body.setScale(dataFormatted.scale);
		this.body.setPosition(dataFormatted.pos.x, dataFormatted.pos.y);
		this.body.setOffset(new SATVector(dataFormatted.offset.x, dataFormatted.offset.y));
	}

	assign(initData: Record<string, unknown>) {
		Object.assign(this, initData);
	}
}
