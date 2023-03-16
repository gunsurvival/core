/// <reference types="sat" resolution-mode="require"/>
import type Entity from '../entity/Entity.js';
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Player from './Player.js';
import { SATVector } from 'detect-collisions';
export default class Casual<T extends Entity> extends Player<T> {
    update(world: World, tickData: ITickData): void;
    getSpeedV(): SATVector;
    shoot(world: World): void;
}
//# sourceMappingURL=Casual.d.ts.map