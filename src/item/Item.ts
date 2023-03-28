import type Player from '../player/Player.js';
import type World from '../world/World.js';
import type {ITickData} from '../types.js';

export default class Item {
	amount = 1; // For stackable items (Use in Inventory.ts)

	primaryAction(player: Player, world: World, tickData: ITickData) {

	}

	update(tickData: ITickData) {
	}

	canStackWith(item: Item) {
		return item.constructor.name === this.constructor.name;
	}
}
