/// <reference types="sat" resolution-mode="require"/>
import type { ITickData } from '../types.js';
import type World from '../world/World.js';
import Player from './Player.js';
import { SATVector } from 'detect-collisions';
export default class Casual extends Player {
    constructor(isOnline?: boolean);
    update(world: World, tickData: ITickData): void;
    getSpeedV(): SATVector;
}
//# sourceMappingURL=Casual.d.ts.map