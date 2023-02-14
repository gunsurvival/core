/// <reference types="sat" />
import { Schema } from '@colyseus/schema';
import { type BodyOptions, type Response, type Body } from 'detect-collisions';
import type { TickData } from '../types.js';
import type World from '../world/World.js';
import Entity from './Entity.js';
export declare class StatsBush extends Schema {
    radius: number;
}
export default class Bush extends Entity {
    stats: StatsBush;
    body: Body;
    constructor(pos: SAT.Vector, bodyOptions?: BodyOptions);
    update(world: World, tickData: TickData): void;
    onInit(): void;
    onDestroy(): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
    onCollisionExit(other: Entity, response: Response): void;
}
//# sourceMappingURL=Bush.d.ts.map