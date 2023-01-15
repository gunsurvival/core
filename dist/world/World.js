import { System } from 'detect-collisions';
export default class World {
    entities = new Map();
    physics = new System();
    // 	Constructor() {}
    nextTick(tick, deltaTime) {
        this.entities.forEach((entity, id) => {
            if (entity.markAsRemove) {
                this.physics.remove(entity.body);
                this.entities.delete(id);
                return;
            }
            entity.update(this.add.bind(this), this.remove.bind(this));
            this.physics.updateBody(entity.body);
            this.physics.checkOne(entity.body, (response) => {
            });
        });
    }
    add(entity) {
        this.physics.insert(entity.body);
        this.entities.set(entity.id, entity);
    }
    remove(entity) {
        this.physics.remove(entity.body);
        this.entities.delete(entity.id);
    }
}
//# sourceMappingURL=World.js.map