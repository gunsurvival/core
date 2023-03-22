/// <reference types="sat" resolution-mode="require"/>
import { type Body, SATVector } from 'detect-collisions';
import { type ITickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export default class Bullet extends Entity {
    stats: {
        radius: number;
    };
    _stats: {
        radius: number;
    };
    body: Body;
    speed: number;
    constructor(pos?: SATVector, angle?: number, speed?: number);
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: SAT.Response): void;
    init(data: {
        speed: number;
    }): void;
}
//# sourceMappingURL=Bullet.d.ts.map