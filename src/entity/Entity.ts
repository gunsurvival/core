import {getStats, type EntityStats} from './../stats.js';
import {quickDecomp} from 'poly-decomp';
import {computeViewport, type Vector2D} from 'visibility-polygon';
import structuredClone from '@ungap/structured-clone';
import {type Body, type Response, SATVector, Circle} from 'detect-collisions';
import type {ITickData} from '../types.js';
import {AsyncEE} from '../util/AsyncEE.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
import {safeId} from '../util/safeId.js';
import Inventory from '../Inventory.js';

export type IEntity = {
	id: string;

};

export default abstract class Entity {
	id = String(safeId());
	name: string = this.constructor.name;
	markAsRemove = false;
	elapsedTick = 0;
	effects = new Map<string, Effect>(); // Server state: This is not relate to physic so need to use custom mutate array to detect changes
	vel = new SATVector(0, 0);
	visibility: Vector2D[];
	event = new AsyncEE<EntityEventMap>();
	inventory = new Inventory(4);
	isStatic = false;

	abstract body: Body; // Server state: This is relate to physic so no need to use custom mutate variable, changes auto assign it at end of update
	abstract stats: typeof EntityStats ; // Dynamic stats, this is used to calculate new stats with effects that have a duration
	abstract _stats: typeof EntityStats; // Base stats, this is used to calculate dynamic stats, changed permanently

	beforeUpdate(world: World, tickData: ITickData) {
		this.elapsedTick++;
		this.stats = structuredClone(this._stats);
		// Iterate over effects and calculate them
		// if effect is done or marked as remove, remove it

		this.effects.forEach((effect, id) => {
			if (effect.markAsRemove) {
				this.removeEffect(id);
				return;
			}

			effect.calc(this, world, tickData);
		});

		this.body.pos.x += this.vel.x * tickData.delta;
		this.body.pos.y += this.vel.y * tickData.delta;
		this.inventory.update(tickData);
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
		const {id, scale, angle, pos, offset, vel} = data as {
			id: string;
			scale: number;
			angle: number;
			pos: {x: number; y: number};
			offset: {x: number; y: number};
			vel: {x: number; y: number};
		};
		if (id) {
			this.id = id;
		}

		if (angle) {
			this.body.setAngle(angle);
		}

		if (scale) {
			this.body.setScale(scale);
		}

		if (pos) {
			this.body.setPosition(pos.x, pos.y);
		}

		if (offset) {
			this.body.setOffset(new SATVector(offset.x, offset.y));
		}

		if (vel) {
			this.vel.x = vel.x;
			this.vel.y = vel.y;
		}
	}

	assign(initData: Record<string, unknown>) {
		Object.assign(this, initData);
	}

	addEffect(id: string, effect: Effect) {
		this.effects.set(id, effect);
		this.event.emit('+effects', effect).catch(console.error);
	}

	removeEffect(id: string) {
		const effect = this.effects.get(id);
		if (!effect) {
			return;
		}

		this.effects.delete(id);
		this.event.emit('-effects', effect).catch(console.error);
	}
}

export type EntityEventMap = {
	'+effects': (effect: Effect) => void;
	'-effects': (effect: Effect) => void;

	'collision-enter': (entity: Entity) => void;
	'collision-stay': (entity: Entity) => void;
	'collision-exit': (entity: Entity) => void;
};
