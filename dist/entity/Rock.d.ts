/// <reference types="sat" resolution-mode="require"/>
import { type Response, SATVector, type Body } from 'detect-collisions';
import Entity from './Entity.js';
import { type ITickData } from '../types.js';
import type World from '../world/World.js';
export default class Rock extends Entity {
    stats: {
        health: number;
        radius: number;
        speed: number;
    };
    _stats: {
        health: number;
        radius: number;
        speed: number;
    };
    body: Body;
    constructor(pos?: SATVector);
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Rock.d.ts.map