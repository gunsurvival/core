import SAT from 'sat';
import type Entity from '../entity/Entity.js';
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Player from './Player.js';
export default class Casual<T extends Entity> extends Player<T> {
    update(world: World, tickData: ITickData): void;
    getSpeedV(): SAT.Vector;
    shoot(world: World): void;
}
//# sourceMappingURL=Casual.d.ts.map