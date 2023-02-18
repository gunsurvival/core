import { System } from 'detect-collisions';
import { MutateMap } from '../util/index.js';
export default class World {
    entities = new MutateMap();
    collisionHashMap = new Map();
    newCollisionHashMap = new Map();
    physics = new System();
    nextTick(tickData) {
        this.newCollisionHashMap.clear();
        this.entities.forEach((entity, id) => {
            if (entity.markAsRemove) {
                this.physics.remove(entity.body);
                this.entities.delete(id);
                return;
            }
            entity.beforeUpdate(this, tickData);
            entity.update(this, tickData);
            this.physics.updateBody(entity.body);
            this.physics.checkOne(entity.body, ({ ...response }) => {
                const uniq = String(id) + response.b.entityRef.id;
                this.newCollisionHashMap.set(uniq, response);
                if (this.collisionHashMap.has(uniq)) {
                    entity.onCollisionStay(response.b.entityRef, response);
                }
                else {
                    this.collisionHashMap.set(uniq, response);
                    entity.onCollisionEnter(response.b.entityRef, response);
                }
            });
            entity.afterUpdate(this, tickData);
        });
        this.collisionHashMap.forEach((response, uniq) => {
            if (!this.newCollisionHashMap.has(uniq)) {
                response.a.entityRef.onCollisionExit(response.b.entityRef, response);
                this.collisionHashMap.delete(uniq);
            }
        });
    }
    add(entity) {
        this.physics.insert(entity.body);
        this.entities.set(entity.id, entity);
        entity.onInit(this);
        entity.body.entityRef = entity;
    }
    remove(entity) {
        this.physics.remove(entity.body);
        this.entities.delete(entity.id);
        entity.onDestroy(this);
    }
}
//# sourceMappingURL=World.js.map