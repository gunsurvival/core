import { System } from 'detect-collisions';
import * as Entity from '../entity/index.js';
import { AsyncEE, genId } from '../util/index.js';
export default class World {
    entities = new Map();
    collisionHashMap = new Map();
    newCollisionHashMap = new Map();
    physics = new System();
    event = new AsyncEE();
    events = new Array();
    lockApi = false;
    isOnline = false;
    constructor() {
        this.setupEvents();
    }
    nextTick(tickData) {
        this.newCollisionHashMap.clear();
        this.entities.forEach((entity, id) => {
            if (entity.markAsRemove) {
                this.api('api:-entities', id).catch(console.error);
                return;
            }
            entity.beforeUpdate(this, tickData);
            entity.update(this, tickData);
            this.physics.updateBody(entity.body);
            this.physics.checkOne(entity.body, ({ ...response }) => {
                const entityA = response.a.entitiyRef;
                const entityB = response.b.entitiyRef;
                if (entityA && entityB) {
                    if (entityA.isStatic && entityB.isStatic) {
                        // If current both entities are static, skip collision check
                        return;
                    }
                    const uniq = genId(entityA, entityB);
                    this.newCollisionHashMap.set(uniq, response);
                    if (this.collisionHashMap.has(uniq)) {
                        entity.onCollisionStay(entityB, response);
                    }
                    else {
                        this.collisionHashMap.set(uniq, response);
                        entityA.onCollisionEnter(entityB, response);
                        entityA.event
                            .emit('collision-enter', entityB)
                            .catch(console.error);
                    }
                }
            });
            entity.afterUpdate(this, tickData);
        });
        this.collisionHashMap.forEach((response, uniq) => {
            if (!this.newCollisionHashMap.has(uniq)) {
                const entityA = response.a.entitiyRef;
                const entityB = response.b.entitiyRef;
                if (entityA && entityB) {
                    const uniq = genId(entityA, entityB);
                    this.collisionHashMap.delete(uniq);
                    entityA.onCollisionExit(entityB, response);
                    entityA.event.emit('collision-exit', entityB).catch(console.error);
                }
            }
        });
    }
    setupEvents() {
        // Event start with api: are emitted from outside (server, client, etc.)
        this.event.on('api:+entities', (className, initial) => {
            if (!(className in Entity)) {
                throw new Error(`Entity ${className} does not exist`);
            }
            const EntityClass = Entity[className];
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
    add(entity) {
        this.physics.insert(entity.body);
        this.entities.set(entity.id, entity);
        entity.body.entitiyRef
            = entity;
        // Need to reference the entity's id in the body because the body is passed to the System.checkOne callback, not the entity
        entity.onAdd(this);
        this.event.emit('+entities', entity).catch(console.error);
    }
    remove(entity) {
        this.physics.remove(entity.body);
        this.entities.delete(entity.id);
        entity.onRemove(this);
        this.event.emit('-entities', entity).catch(console.error);
    }
    async api(type, ...args) {
        if (this.lockApi) {
            return;
        }
        const event = { type, args };
        this.events.push(event);
        this.event.emit('+events', event).catch(console.error);
        const values = await this.event.emit(type, ...args);
        return values[0];
    }
}
//# sourceMappingURL=World.js.map