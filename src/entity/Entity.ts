import {quickDecomp} from 'poly-decomp';
import {computeViewport, type Vector2D} from 'visibility-polygon';
import structuredClone from '@ungap/structured-clone';
import {type Body, type Response, SATVector} from 'detect-collisions';
import type {ITickData} from '../types.js';
import {AsyncEE} from '../util/AsyncEE.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
import {safeId} from '../util/index.js';

export default abstract class Entity {
	id = String(safeId());
	name: string = this.constructor.name;
	markAsRemove = false;
	elapsedTick = 0;
	effects = new Array<Effect>(); // Server state: This is not relate to physic so need to use custom mutate array to detect changes
	event = new AsyncEE();
	vel = new SATVector(0, 0);
	visibility: Vector2D[];

	abstract body: Body; // Server state: This is relate to physic so no need to use custom mutate variable, changes auto assign it at end of update
	abstract stats: Record<string, unknown>; // Redefine this in the child class. Base stats that are not affected by effects
	abstract _stats: Record<string, unknown>; // Like above but this is used to calculate effects that have a duration

	beforeUpdate(world: World, tickData: ITickData) {
		this.elapsedTick++;
		this._stats = structuredClone(this.stats);
		// Iterate over effects and calculate them
		// if effect is done or marked as remove, remove it
		// eslint-disable-next-line @typescript-eslint/prefer-for-of
		for (let i = 0; i < this.effects.length; i++) {
			if (this.effects[i].markAsRemove) {
				this.removeEffect(this.effects[i]);
				continue;
			}

			this.effects[i].calc(this, world, tickData);
		}

		this.body.pos.x += this.vel.x * tickData.delta;
		this.body.pos.y += this.vel.y * tickData.delta;
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
			vel: {x: number; y: number};
		};
		this.id = dataFormatted.id;
		this.body.setAngle(dataFormatted.angle);
		this.body.setScale(dataFormatted.scale);
		this.body.setPosition(dataFormatted.pos.x, dataFormatted.pos.y);
		this.body.setOffset(new SATVector(dataFormatted.offset.x, dataFormatted.offset.y));
		this.vel.x = dataFormatted.vel.x;
		this.vel.y = dataFormatted.vel.y;
	}

	assign(initData: Record<string, unknown>) {
		Object.assign(this, initData);
	}

	addEffect(effect: Effect) {
		this.effects.push(effect);
		this.event.emit('+effects', effect).catch(console.error);
	}

	removeEffect(effect: Effect) {
		const index = this.effects.indexOf(effect);
		if (index === -1) {
			return;
		}

		this.effects.splice(index, 1);
		this.event.emit('-effects', effect).catch(console.error);
	}
}
