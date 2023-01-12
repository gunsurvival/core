import sat from 'sat';
// Import ServerConfig from '../configs/Server.js';
// import QuadtreeManager from '../manager/QuadtreeManager.js';
// import Manager from '../manager/Manager.js';
// import TagOdering from '../configs/TagOrdering.js';

export default class World {
	// QtSet = new QuadTreeSet<Sprite>();
	entities = new Map<number, Human>();

	constructor() {}

	nextTick(): void {
		let entity;
		for (let i = 0; i < this.entities.length; ++i) {
			entity = this.entities[i];
			if (entity.markAsRemove) {
				this.entities.findIndex;
				continue;
			}

			sprite.update();
			sprite.tick++;
			this.QTManager.insert(sprite);
			this.entities[i].update();
		}
	}

	add(sprite) {
		const index = TagOdering.get(sprite.tag);
		if (index != -1) {
			this.sprites[index].push(sprite);
		} else {
			this.sprites.push(new Manager([sprite]));
			TagOdering.push(sprite.tag);
		}
	}

	remove(sprite) {
		const sm = this.getSpritesByTag(sprite.tag); // Sm = sprite manager
		if (sm) {
			sm.remove(sprite.id);
		}
	}

	find(id) {
		for (let i = 0; i < this.sprites.length; i++) {
			const sprite = this.sprites[i].get(id);
			if (sprite) {
				return sprite;
			}
		}
	}

	filter(query, once = false) {
		const out = [];
		for (let i = 0; i < this.sprites.length; i++) {
			for (let j = 0; j < this.sprites[i].length; j++) {
				let found = true;
				for (const property in query) {
					if (this.sprites[i][j][property] != query[property]) {
						found = false;
						break;
					}
				}

				if (found) {
					if (once) {
						return this.sprites[i][j];
					}

					out.push(this.sprites[i][j]);
				}
			}
		}

		return out;
	}

	static isTags(item1, item2, comparisonType) {
		// Btw is not "By the way" but "Between"
		return (
			comparisonType.includes(item1.tag) || comparisonType.includes(item2.tag)
		);
	}
}
