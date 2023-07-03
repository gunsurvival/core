import CoolDownSystem from '../util/CoolDownSystem.js';
import type World from '../world/World.js';
import type { ITickData } from '../types.js';
import Item from './Item.js';
import { type GunStats } from '../stats.js';
import type Gunner from '../entity/Gunner.js';
import type PlayerCasual from '../player/Casual.js';
export default abstract class Gun extends Item {
    coolDownSystem: CoolDownSystem;
    abstract stats: typeof GunStats;
    abstract _stats: typeof GunStats;
    update(tickData: ITickData): void;
    primaryAction(player: PlayerCasual<Gunner>, world: World, tickData: ITickData): Promise<void>;
    fire(player: PlayerCasual, world: World, tickData: ITickData): Promise<void>;
}
//# sourceMappingURL=Gun.d.ts.map