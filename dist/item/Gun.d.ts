import type Player from '../player/Player.js';
import CoolDownSystem from '../util/CoolDownSystem.js';
import type World from '../world/World.js';
import type { ITickData } from '../types.js';
import Item from './Item.js';
export default class Gun extends Item {
    coolDownPrimary: number;
    coolDownSystem: CoolDownSystem;
    constructor(coolDownPrimary: number);
    update(tickData: ITickData): void;
    primaryAction(player: Player, world: World, tickData: ITickData): void;
    fire(player: Player, world: World, tickData: ITickData): void;
}
//# sourceMappingURL=Gun.d.ts.map