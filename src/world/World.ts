import {System, type Response} from 'detect-collisions';
import type Entity from '../entity/Entity.js';
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
	entities = new Map<number, Entity>();
	physics = new System();
	collisionHashMap = new Map<number, Response>();
	newCollisionHashMap = new Map<number, Response>();

	// 	Constructor() {}

	nextTick(tickData: TickData) {
		this.newCollisionHashMap.clear();
		this.entities.forEach((entity: Entity, id) => {
			if (entity.markAsRemove) {
				this.physics.remove(entity.body);
				this.entities.delete(id);
				return;
			}

			entity.update(this, tickData);
			this.physics.updateBody(entity.body);

			this.physics.checkOne(entity.body, ({...response}: ResponseBodyRefEntity) => {
				const uniq = concatenate(entity.id, response.b.entityRef.id);
				this.newCollisionHashMap.set(uniq, response);
				if (this.collisionHashMap.has(uniq)) {
					console.log('stay');
					entity.onCollisionStay(response.b.entityRef, response);
				} else {
					this.collisionHashMap.set(uniq, response);
					entity.onCollisionEnter(response.b.entityRef, response);
					console.log('enter');
				}
			});
		});
		this.collisionHashMap.forEach((response: ResponseBodyRefEntity, uniq: number) => {
			if (!this.newCollisionHashMap.has(uniq)) {
				console.log('exit');
				response.a.entityRef.onCollisionExit(response.b.entityRef, response);
				this.collisionHashMap.delete(uniq);
			}
		});
	}

	add(entity: Entity) {
		this.physics.insert(entity.body);
		this.entities.set(entity.id, entity);
		(entity as (Entity & {body: BodyRefEntity})).body.entityRef = entity;
	}

	remove(entity: Entity) {
		this.physics.remove(entity.body);
		this.entities.delete(entity.id);
	}
}
