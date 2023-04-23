import type Player from '../player/Player.js';
import { type ITickData } from '../types.js';
import type World from '../world/World.js';
import Gun from './Gun.js';
export default class Ak47 extends Gun {
    constructor();
    fire(player: Player, world: World, tickData: ITickData): Promise<void>;
}
//# sourceMappingURL=Ak47.d.ts.map