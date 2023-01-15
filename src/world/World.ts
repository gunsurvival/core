// // Import ServerConfig from '../configs/Server.js';
// // import QuadtreeManager from '../manager/QuadtreeManager.js';
// // import Manager from '../manager/Manager.js';
// // import TagOdering from '../configs/TagOrdering.js';
import type {Response} from 'detect-collisions';
import {System} from 'detect-collisions';
import type Entity from '../entity/Entity.js';

export default class World {
	entities = new Map<number, Entity>();
	physics = new System();

	// 	Constructor() {}

	nextTick(tick: number, deltaTime: number) {
		this.entities.forEach((entity: Entity, id) => {
			if (entity.markAsRemove) {
				this.physics.remove(entity.body);
				this.entities.delete(id);
				return;
			}

			entity.update(this.add.bind(this), this.remove.bind(this));
			this.physics.updateBody(entity.body);
			this.physics.checkOne(entity.body, (response: Response) => {

			});
		});
	}

	add(entity: Entity) {
		this.physics.insert(entity.body);
		this.entities.set(entity.id, entity);
	}

	remove(entity: Entity) {
		this.physics.remove(entity.body);
		this.entities.delete(entity.id);
	}
}
