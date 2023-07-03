import type World from '../world/World.js';
import type { ITickData } from '../types.js';
import type Player from '../player/Player.js';
export default abstract class Item {
    id: string;
    amount: number;
    primaryAction(player: Player, world: World, tickData: ITickData): void;
    update(tickData: ITickData): void;
    canStackWith(item: Item): boolean;
}
//# sourceMappingURL=Item.d.ts.map