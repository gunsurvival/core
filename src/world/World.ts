import {System, type Response} from 'detect-collisions';
import type Entity from '../entity/Entity.js';
import {type ITickData} from '../types.js';
import {MutateMap} from '../util/index.js';

type BodyRefEntity = Body & {entityRef: Entity};
type ResponseBodyRefEntity = Omit<Response, 'a' | 'b'> & {
	a: BodyRefEntity;
	b: BodyRefEntity;
};

export default abstract class World {
	// @filterChildren((client, key: string, entity: Entity, root: World) => {
	// 	const currentPlayer = root.entities.get(client.userData.entityId as string);
	// 	if (currentPlayer) {
	// 		const a = entity.body.pos.x - currentPlayer.body.pos.x;
	// 		const b = entity.body.pos.y - currentPlayer.body.pos.y;

	// 		return (Math.sqrt((a * a) + (b * b))) <= 1366;
	// 	}

	// 	return false;
	// })
	entities = new MutateMap<string, Entity>();
	collisionHashMap = new Map<string, Response>();
	newCollisionHashMap = new Map<string, Response>();
	physics = new System();

	nextTick(tickData: ITickData) {
		this.newCollisionHashMap.clear();

		this.entities.forEach((entity: Entity, id) => {
			if (entity.markAsRemove) {
				this.physics.remove(entity.body);
				this.entities.delete(id);
				return;
			}

			entity.beforeUpdate(this, tickData);
			entity.update(this, tickData); // User defined update
			this.physics.updateBody(entity.body);

			this.physics.checkOne(entity.body, ({...response}: ResponseBodyRefEntity) => {
				const uniq = String(id) + response.b.entityRef.id;
				this.newCollisionHashMap.set(uniq, response);
				if (this.collisionHashMap.has(uniq)) {
					entity.onCollisionStay(response.b.entityRef, response);
				} else {
					this.collisionHashMap.set(uniq, response);
					entity.onCollisionEnter(response.b.entityRef, response);
				}
			});

			entity.afterUpdate(this, tickData);
		});
		this.collisionHashMap.forEach((response: ResponseBodyRefEntity, uniq: string) => {
			if (!this.newCollisionHashMap.has(uniq)) {
				response.a.entityRef.onCollisionExit(response.b.entityRef, response);
				this.collisionHashMap.delete(uniq);
			}
		});
	}

	add(entity: Entity) {
		this.physics.insert(entity.body);
		this.entities.set(entity.id, entity);
		entity.onAdd(this);
		(entity as (Entity & {body: BodyRefEntity})).body.entityRef = entity;
		// Need to reference the entity in the body because the body is passed to the System.checkOne callback not the entity
	}

	remove(entity: Entity) {
		this.physics.remove(entity.body);
		this.entities.delete(entity.id);
		entity.onDestroy(this);
	}
}
