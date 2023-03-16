/// <reference types="sat" resolution-mode="require"/>
import { type Body, SATVector } from 'detect-collisions';
import { type ITickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export type StatsBullet = {
    radius: number;
};
export default class Bullet extends Entity {
    body: Body;
    stats: StatsBullet;
    vel: SATVector;
    constructor(pos: SATVector, vel?: SATVector);
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: SAT.Response): void;
    init(data: {
        vel: SATVector;
    }): void;
}
//# sourceMappingURL=Bullet.d.ts.map