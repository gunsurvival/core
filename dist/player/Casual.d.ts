import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Player from './Player.js';
export default class Casual extends Player {
    constructor(isOnline?: boolean);
    update(world: World, tickData: ITickData): void;
}
//# sourceMappingURL=Casual.d.ts.map