import { System } from 'detect-collisions';
import { AsyncEE } from '../util/AsyncEE.js';
import { genId } from '../util/index.js';
export default class World {
    entities = new Map();
    collisionHashMap = new Map();
    newCollisionHashMap = new Map();
    physics = new System();
    event = new AsyncEE();
    nextTick(tickData) {
        this.newCollisionHashMap.clear();
        this.entities.forEach((entity, id) => {
            if (entity.markAsRemove) {
                this.remove(entity);
                return;
            }
            entity.beforeUpdate(this, tickData);
            entity.update(this, tickData);
            this.physics.updateBody(entity.body);
            this.physics.checkOne(entity.body, ({ ...response }) => {
                const uniq = genId(entity, response.b.entityRef);
                this.newCollisionHashMap.set(uniq, response);
                if (this.collisionHashMap.has(uniq)) {
                    entity.onCollisionStay(response.b.entityRef, response);
                }
                else {
                    this.collisionHashMap.set(uniq, response);
                    entity.onCollisionEnter(response.b.entityRef, response);
                    this.event.emit('collision-enter', entity, response.b.entityRef).catch(console.error);
                    entity.event.emit('collision-enter', response.b.entityRef).catch(console.error);
                }
            });
            entity.afterUpdate(this, tickData);
        });
        this.collisionHashMap.forEach((response, uniq) => {
            if (!this.newCollisionHashMap.has(uniq)) {
                response.a.entityRef.onCollisionExit(response.b.entityRef, response);
                this.collisionHashMap.delete(uniq);
                this.event.emit('collision-exit', response.a.entityRef, response.b.entityRef).catch(console.error);
                response.a.entityRef.event.emit('collision-exit', response.b.entityRef).catch(console.error);
            }
        });
    }
    add(entity) {
        this.physics.insert(entity.body);
        this.entities.set(entity.id, entity);
        entity.body.entityRef = entity;
        // Need to reference the entity in the body because the body is passed to the System.checkOne callback not the entity
        this.event.emit('+entities', entity).catch(console.error);
        entity.onAdd(this);
    }
    remove(entity) {
        this.physics.remove(entity.body);
        this.entities.delete(entity.id);
        this.event.emit('-entities', entity).catch(console.error);
        entity.onRemove(this);
    }
}
//# sourceMappingURL=World.js.map