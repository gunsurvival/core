import type Player from '../player/Player.js';
import type World from '../world/World.js';
import type { ITickData } from '../types.js';
export default class Item {
    amount: number;
    primaryAction(player: Player, world: World, tickData: ITickData): void;
    update(tickData: ITickData): void;
    canStackWith(item: Item): boolean;
}
//# sourceMappingURL=Item.d.ts.map