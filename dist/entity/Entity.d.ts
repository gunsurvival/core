/// <reference types="sat" resolution-mode="require"/>
import { EventEmitter } from 'eventemitter3';
import type { Body, Response } from 'detect-collisions';
import type { ITickData } from '../types.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
import { MutateArray } from '../util/index.js';
export default abstract class Entity {
    id: string;
    name: string;
    markAsRemove: boolean;
    elapsedTick: number;
    effects: MutateArray<Effect>;
    event: EventEmitter<string | symbol, any>;
    abstract body: Body;
    abstract stats: unknown;
    constructor();
    beforeUpdate(world: World, tickData: ITickData): void;
    afterUpdate(world: World, tickData: ITickData): void;
    destroy(): void;
    update(world: World, tickData: ITickData): void;
    onAdd(world: World): void;
    onRemove(world: World): void;
    onCollisionEnter(other: Entity, response: Response): void;
    onCollisionStay(other: Entity, response: Response): void;
    onCollisionExit(other: Entity, response: Response): void;
    init(data: Record<string, unknown>): void;
}
//# sourceMappingURL=Entity.d.ts.map