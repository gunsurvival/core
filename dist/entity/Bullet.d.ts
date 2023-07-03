/// <reference types="sat" resolution-mode="require"/>
import { Circle } from 'detect-collisions';
import { type ITickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export default class Bullet extends Entity {
    stats: {
        radius: number;
        speed: number;
        health: number;
    };
    _stats: {
        radius: number;
        speed: number;
        health: number;
    };
    body: Circle;
    speed: number;
    ownerId: string;
    update(world: World, tickData: ITickData): void;
    onCollisionEnter(other: Entity, response: SAT.Response): void;
    init(data: {
        speed: number;
        ownerId: string;
    }): void;
}
//# sourceMappingURL=Bullet.d.ts.map