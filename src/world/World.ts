import {type, Schema, MapSchema} from '@colyseus/schema';
import {System, type Response} from 'detect-collisions';
import Entity from '../entity/Entity.js';
import {type TickData} from '../types.js';

type BodyRefEntity = Body & {entityRef: Entity};
type ResponseBodyRefEntity = Omit<Response, 'a' | 'b'> & {
	a: BodyRefEntity;
	b: BodyRefEntity;
};

function concatenate(a: number, b: number, base = 10) {
	return (a * (base ** (Math.floor(Math.log(b) / Math.log(base)) + 1))) + b;
}

export default class World {
	@type({map: Entity}) entities = new MapSchema<Entity>();
	collisionHashMap = new Map<number, Response>();
	newCollisionHashMap = new Map<number, Response>();
	physics = new System();

	// 	Constructor() {}

	nextTick(tickData: TickData) {
		this.newCollisionHashMap.clear();

		this.entities.forEach((entity: Entity, id) => {
			if (entity.markAsRemove) {
				this.physics.remove(entity.body);
				this.entities.delete(id);
				return;
			}

			entity.baseUpdate(this, tickData);
			entity.update(this, tickData);
			this.physics.updateBody(entity.body);

			this.physics.checkOne(entity.body, ({...response}: ResponseBodyRefEntity) => {
				const uniq = concatenate(entity.id, response.b.entityRef.id);
				this.newCollisionHashMap.set(uniq, response);
				if (this.collisionHashMap.has(uniq)) {
					entity.onCollisionStay(response.b.entityRef, response);
				} else {
					this.collisionHashMap.set(uniq, response);
					entity.onCollisionEnter(response.b.entityRef, response);
				}
			});
		});
		this.collisionHashMap.forEach((response: ResponseBodyRefEntity, uniq: number) => {
			if (!this.newCollisionHashMap.has(uniq)) {
				response.a.entityRef.onCollisionExit(response.b.entityRef, response);
				this.collisionHashMap.delete(uniq);
			}
		});
	}

	add(entity: Entity) {
		this.physics.insert(entity.body);
		this.entities.set(entity.id.toString(), entity);
		entity.onInit(this);
		(entity as (Entity & {body: BodyRefEntity})).body.entityRef = entity;
		// Need to reference the entity in the body because the body is passed to the System.checkOne callback not the entity
	}

	remove(entity: Entity) {
		this.physics.remove(entity.body);
		this.entities.delete(entity.id.toString());
		entity.onDestroy(this);
	}
}
