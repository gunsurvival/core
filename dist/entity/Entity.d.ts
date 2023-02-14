/// <reference types="sat" />
import { Schema } from '@colyseus/schema';
import { type Body } from 'detect-collisions';
import type { Response } from 'detect-collisions';
import Effect from '../effect/Effect.js';
import type { TickData } from '../types.js';
import type World from '../world/World.js';
export declare class VectorSchema extends Schema {
    x: number;
    y: number;
}
export default abstract class Entity extends Schema {
    scale: number;
    angle: number;
    effects: Effect[];
    pos: VectorSchema;
    offset: VectorSchema;
    id: string;
    name: string;
    markAsRemove: boolean;
    elapsedTick: number;
    abstract body: Body;
    abstract stats: unknown;
    baseUpdate(world: World, tickData: TickData): void;
    finalUpdate(world: World, tickData: TickData): void;
    destroy(): void;
    abstract update(world: World, tickData: TickData): void;
    abstract onInit(world: World): void;
    abstract onDestroy(world: World): void;
    abstract onCollisionEnter(other: Entity, response: Response): void;
    abstract onCollisionStay(other: Entity, response: Response): void;
    abstract onCollisionExit(other: Entity, response: Response): void;
}
//# sourceMappingURL=Entity.d.ts.map