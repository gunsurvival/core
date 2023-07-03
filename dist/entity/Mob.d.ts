/// <reference types="sat" resolution-mode="require"/>
import { type Response, type Body } from 'detect-collisions';
import { type MobStats } from '../stats.js';
import Entity from './Entity.js';
import type World from '../world/World.js';
import { type ITickData } from '../types.js';
export default abstract class Mob extends Entity {
    lastMoveTimeStamp: number;
    abstract body: Body;
    abstract stats: typeof MobStats;
    abstract _stats: typeof MobStats;
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Mob.d.ts.map