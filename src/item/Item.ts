import type World from '../world/World.js';
import type {ITickData} from '../types.js';
import type Entity from '../entity/Entity.js';
import type Player from '../player/Player.js';

export default abstract class Item {
	id = this.constructor.name;
	amount = 1; // For stackable items (Use in Inventory.ts)

	primaryAction(player: Player, world: World, tickData: ITickData) {}

	update(tickData: ITickData) {}

	canStackWith(item: Item) {
		return item.constructor.name === this.constructor.name;
	}
}
