var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { type, filterChildren, Schema, MapSchema } from '@colyseus/schema';
import { System } from 'detect-collisions';
import Entity from '../entity/Entity.js';
export default class World extends Schema {
    entities = new MapSchema();
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
            entity.baseUpdate(this, tickData);
            entity.update(this, tickData);
            this.physics.updateBody(entity.body);
            this.physics.checkOne(entity.body, ({ ...response }) => {
                const uniq = id + response.b.entityRef.id;
                this.newCollisionHashMap.set(uniq, response);
                if (this.collisionHashMap.has(uniq)) {
                    entity.onCollisionStay(response.b.entityRef, response);
                }
                else {
                    this.collisionHashMap.set(uniq, response);
                    entity.onCollisionEnter(response.b.entityRef, response);
                }
            });
            entity.finalUpdate(this, tickData);
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
__decorate([
    filterChildren((client, key, value, root) => {
        const currentPlayer = root.entities.get(client.userData.entityId);
        if (currentPlayer) {
            const a = value.pos.x - currentPlayer.pos.x;
            const b = value.pos.y - currentPlayer.pos.y;
            return (Math.sqrt((a * a) + (b * b))) <= 1366;
        }
        return false;
    }),
    type({ map: Entity })
], World.prototype, "entities", void 0);
//# sourceMappingURL=World.js.map