/// <reference types="sat" />
import { Schema } from '@colyseus/schema';
import { Circle, type Response } from 'detect-collisions';
import type { TickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export declare class StatsGunner extends Schema {
    health: number;
    speed: number;
    radius: number;
}
export default class Gunner extends Entity {
    stats: StatsGunner;
    body: Circle;
    update(world: World, tickData: TickData): void;
    onInit(): void;
    onDestroy(): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
    onCollisionExit(other: Entity, response: Response): void;
}
//# sourceMappingURL=Gunner.d.ts.map