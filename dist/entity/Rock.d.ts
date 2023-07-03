/// <reference types="sat" resolution-mode="require"/>
import { type Response, Circle } from 'detect-collisions';
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
    body: Circle;
    isStatic: boolean;
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
}
//# sourceMappingURL=Rock.d.ts.map