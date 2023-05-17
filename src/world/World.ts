import {System, type Body, type Response} from 'detect-collisions';
import * as Entity from '../entity/index.js';
import {type ITickData} from '../types.js';
import {AsyncEE, genId} from '../util/index.js';

type BodyRefEntity = Body & {entitiyRef: Entity.default};
type ResponseBodyRefEntity = Omit<Response, 'a' | 'b'> & {
	a: BodyRefEntity;
	b: BodyRefEntity;
};

export type IEvent = {
	type: string;
	args: any[];
};

export default abstract class World {
	entities = new Map<string, Entity.default>();
	collisionHashMap = new Map<string, Response>();
	newCollisionHashMap = new Map<string, Response>();
	physics = new System();
	event = new AsyncEE<WorldEventMap>();
	events = new Array<IEvent>();
	lockApi = false;

	constructor() {
		this.setupEvents();
	}

	nextTick(tickData: ITickData) {
		this.newCollisionHashMap.clear();

		this.entities.forEach((entity: Entity.default, id) => {
			if (entity.markAsRemove) {
				this.remove(entity);
				return;
			}

			entity.beforeUpdate(this, tickData);
			entity.update(this, tickData);
			this.physics.updateBody(entity.body);

			this.physics.checkOne(entity.body, ({...response}: ResponseBodyRefEntity) => {
				const entityA = response.a.entitiyRef;
				const entityB = response.b.entitiyRef;

				if (entityA && entityB) {
					const uniq = genId(entityA, entityB);
					this.newCollisionHashMap.set(uniq, response);
					if (this.collisionHashMap.has(uniq)) {
						entity.onCollisionStay(entityB, response);
					} else {
						console.log('collision-enter', entityA.name, entityB.name);
						this.collisionHashMap.set(uniq, response);
						entityA.onCollisionEnter(entityB, response);
						entityA.event.emit('collision-enter', entityB).catch(console.error);
					}
				}
			});

			entity.afterUpdate(this, tickData);
		});
		this.collisionHashMap.forEach((response: ResponseBodyRefEntity, uniq: string) => {
			if (!this.newCollisionHashMap.has(uniq)) {
				const entityA = response.a.entitiyRef;
				const entityB = response.b.entitiyRef;
				if (entityA && entityB) {
					const uniq = genId(entityA, entityB);
					console.log('collision-exit', entityA.name, entityB.name);

					this.collisionHashMap.delete(uniq);
					entityA.onCollisionExit(entityB, response);
					entityA.event.emit('collision-exit', entityB).catch(console.error);
				}
			}
		});
	}

	setupEvents() {
		this.event.on('api:+entities', (className, initial) => {
			// Redefine this if constructor Entity.js is changed
			if (!(className in Entity)) {
				throw new Error(`Entity ${className} does not exist`);
			}

			const EntityClass = Entity[className as keyof typeof Entity] as (new (...args: any[]) => Entity.default);
			const entity = new EntityClass();
			entity.init(initial);
			this.add(entity);
			return entity;
		});
		this.event.on('api:-entities', id => {
			const entity = this.entities.get(id);
			if (entity) {
				this.remove(entity);
			}
		});
	}

	add(entity: Entity.default) {
		this.physics.insert(entity.body);
		this.entities.set(entity.id, entity);
		(entity as (Entity.default & {body: BodyRefEntity})).body.entitiyRef = entity;
		// Need to reference the entity's id in the body because the body is passed to the System.checkOne callback, not the entity
		entity.onAdd(this);
		this.event.emit('+entities', entity).catch(console.error);
	}

	remove(entity: Entity.default) {
		this.physics.remove(entity.body);
		this.entities.delete(entity.id);
		entity.onRemove(this);
		this.event.emit('-entities', entity).catch(console.error);
	}

	async api<Ev extends keyof WorldEventMap>(type: Ev, ...args: Parameters<WorldEventMap[Ev]>) {
		if (this.lockApi) {
			return;
		}

		const event: IEvent = {type, args};
		this.events.push(event);
		this.event.emit('+events', event).catch(console.error);
		const values = await this.event.emit(type, ...args);
		return values[0];
	}
}

export type WorldEventMap = {
	'api:+entities': (className: string, initial: Record<string, unknown>) => Entity.default;
	'api:-entities': (id: string) => void;
	'+entities': (entity: Entity.default) => void;
	'-entities': (entity: Entity.default) => void;
	'+events': (event: IEvent) => void;
};
