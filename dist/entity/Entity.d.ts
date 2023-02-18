/// <reference types="sat" resolution-mode="require"/>
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
    abstract body: Body;
    abstract stats: unknown;
    beforeUpdate(world: World, tickData: ITickData): void;
    afterUpdate(world: World, tickData: ITickData): void;
    destroy(): void;
    abstract update(world: World, tickData: ITickData): void;
    abstract onInit(world: World): void;
    abstract onDestroy(world: World): void;
    abstract onCollisionEnter(other: Entity, response: Response): void;
    abstract onCollisionStay(other: Entity, response: Response): void;
    abstract onCollisionExit(other: Entity, response: Response): void;
}
//# sourceMappingURL=Entity.d.ts.map