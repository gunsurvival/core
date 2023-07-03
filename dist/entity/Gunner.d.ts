/// <reference types="sat" resolution-mode="require"/>
import { type Response, Circle } from 'detect-collisions';
import Entity from './Entity.js';
import { type ITickData } from '../types.js';
import type World from '../world/World.js';
import { type EntityEventMap } from './Entity.js';
import { type AsyncEE } from '../index.js';
export default class Gunner extends Entity {
    event: AsyncEE<GunnerEventMap>;
    stats: {
        speed: number;
        health: number;
        radius: number;
    };
    _stats: {
        speed: number;
        health: number;
        radius: number;
    };
    body: Circle;
    constructor();
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
    onCollisionExit(other: Entity, response: Response): void;
}
export type GunnerEventMap = EntityEventMap;
//# sourceMappingURL=Gunner.d.ts.map