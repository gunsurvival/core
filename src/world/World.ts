import {type Response} from 'detect-collisions';
import {System, type Response} from 'detect-collisions';
import type Entity from '../entity/Entity.js';
import {type TickData} from '../types.js';

function concatenate(a: number, b: number, base = 10) {
	return (a * (base ** (Math.floor(Math.log(b) / Math.log(base)) + 1))) + b;
}

export default class World {
	entities = new Map<number, Entity>();
	physics = new System();
	collisionHashMap = new Map<number, Response>();

	// 	Constructor() {}

	nextTick(tickData: TickData) {
		const newCollisionHashMap = new Map<number, boolean>();
		this.entities.forEach((entity: Entity, id) => {
			if (entity.markAsRemove) {
				this.physics.remove(entity.body);
				this.entities.delete(id);
				return;
			}

			entity.update(this, tickData);
			this.physics.updateBody(entity.body);
			this.physics.checkOne(entity.body, (response: Response) => {
				const uniq1 = concatenate(entity.id, (response.b as Entity).id);
				const uniq2 = concatenate((response.b as Entity).id, entity.id);
				if (this.collisionHashMap.has(uniq1) || this.collisionHashMap.has(uniq2)) {
					entity.onCollisionStay(response.a as Entity, response);
					(response.a as Entity).onCollisionStay(entity, response);
				} else {
					this.collisionHashMap.set(uniq1, response);
					newCollisionHashMap.set(uniq1, true);
					entity.onCollisionEnter(response.a as Entity, response);
					(response.a as Entity).onCollisionEnter(entity, response);
				}
			});
		});
		this.collisionHashMap.forEach((response: Response, uniq: number) => {
			if (!newCollisionHashMap.has(uniq)) {
				(response.a as Entity).onCollisionExit(response.b as Entity, response);
				(response.b as Entity).onCollisionExit(response.a as Entity, response);
			}
		});
	}

	add(entity: Entity) {
		this.physics.insert(entity.body);
		this.entities.set(entity.id, entity);
	}

	remove(entity: Entity) {
		this.physics.remove(entity.body);
		this.entities.delete(entity.id);
	}
}
