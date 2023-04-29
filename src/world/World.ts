import {System, type Body, type Response} from 'detect-collisions';
import {AsyncEE} from '../util/AsyncEE.js';
import type Entity from '../entity/Entity.js';
import {type ITickData} from '../types.js';
import {genId} from '../util/index.js';

type BodyRefEntity = Body & {entityRef: Entity};
type ResponseBodyRefEntity = Omit<Response, 'a' | 'b'> & {
	a: BodyRefEntity;
	b: BodyRefEntity;
};

export default abstract class World {
	entities = new Map<string, Entity>();
	collisionHashMap = new Map<string, Response>();
	newCollisionHashMap = new Map<string, Response>();
	physics = new System();
	event = new AsyncEE<WorldEventMap>();

	nextTick(tickData: ITickData) {
		this.newCollisionHashMap.clear();

		this.entities.forEach((entity: Entity, id) => {
			if (entity.markAsRemove) {
				this.remove(entity);
				return;
			}

			entity.beforeUpdate(this, tickData);
			entity.update(this, tickData);
			this.physics.updateBody(entity.body);

			this.physics.checkOne(entity.body, ({...response}: ResponseBodyRefEntity) => {
				const uniq = genId(entity, response.b.entityRef);
				this.newCollisionHashMap.set(uniq, response);
				if (this.collisionHashMap.has(uniq)) {
					entity.onCollisionStay(response.b.entityRef, response);
				} else {
					this.collisionHashMap.set(uniq, response);
					entity.onCollisionEnter(response.b.entityRef, response);
					this.event.emit('collision-enter', entity, response.b.entityRef).catch(console.error);
					entity.event.emit('collision-enter', response.b.entityRef).catch(console.error);
				}
			});

			entity.afterUpdate(this, tickData);
		});
		this.collisionHashMap.forEach((response: ResponseBodyRefEntity, uniq: string) => {
			if (!this.newCollisionHashMap.has(uniq)) {
				response.a.entityRef.onCollisionExit(response.b.entityRef, response);
				this.collisionHashMap.delete(uniq);
				this.event.emit('collision-exit', response.a.entityRef, response.b.entityRef).catch(console.error);
				response.a.entityRef.event.emit('collision-exit', response.b.entityRef).catch(console.error);
			}
		});
	}

	add(entity: Entity) {
		this.physics.insert(entity.body);
		this.entities.set(entity.id, entity);
		(entity as (Entity & {body: BodyRefEntity})).body.entityRef = entity;
		// Need to reference the entity in the body because the body is passed to the System.checkOne callback not the entity
		this.event.emit('+entities', entity).catch(console.error);
		entity.onAdd(this);
	}

	remove(entity: Entity) {
		this.physics.remove(entity.body);
		this.entities.delete(entity.id);
		this.event.emit('-entities', entity).catch(console.error);
		entity.onRemove(this);
	}
}

type WorldEventMap = {
	'+entities': (entity: Entity) => void;
	'-entities': (entity: Entity) => void;
	'collision-enter': (a: Entity, b: Entity) => void;
	'collision-exit': (a: Entity, b: Entity) => void;
};
