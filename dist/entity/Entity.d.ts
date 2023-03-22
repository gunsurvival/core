/// <reference types="sat" resolution-mode="require"/>
import { type Body, type Response, SATVector } from 'detect-collisions';
import type { ITickData } from '../types.js';
import { AsyncEE } from '../util/AsyncEE.js';
import type Effect from '../effect/Effect.js';
import type World from '../world/World.js';
export default abstract class Entity {
    id: string;
    name: string;
    markAsRemove: boolean;
    elapsedTick: number;
    effects: Effect[];
    event: AsyncEE;
    vel: SATVector;
    abstract body: Body;
    abstract stats: Record<string, unknown>;
    abstract _stats: Record<string, unknown>;
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
    assign(initData: Record<string, unknown>): void;
    addEffect(effect: Effect): void;
    removeEffect(effect: Effect): void;
}
//# sourceMappingURL=Entity.d.ts.map